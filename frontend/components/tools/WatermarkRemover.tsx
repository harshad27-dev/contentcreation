"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { watermarkService } from "@/services/watermarkService";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";

interface Algorithm {
    name: string;
    description: string;
    speed: string;
    quality: string;
}

interface ProcessingState {
    isProcessing: boolean;
    progress: number;
    error: string | null;
    success: boolean;
}

export default function WatermarkRemover() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [originalPreview, setOriginalPreview] = useState<string | null>(null);
    const [cleanedImage, setCleanedImage] = useState<Blob | null>(null);
    const [previewImage, setPreviewImage] = useState<Blob | null>(null);
    const [sensitivity, setSensitivity] = useState(0.7);
    const [algorithm, setAlgorithm] = useState<"simple" | "morphological" | "advanced">(
        "advanced"
    );
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
    const [processing, setProcessing] = useState<ProcessingState>({
        isProcessing: false,
        progress: 0,
        error: null,
        success: false,
    });
    const [showPreview, setShowPreview] = useState(false);
    const [serviceAvailable, setServiceAvailable] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load algorithms on mount
    useEffect(() => {
        const loadAlgorithms = async () => {
            try {
                const algs = await watermarkService.getAlgorithms();
                setAlgorithms(algs);
            } catch (error) {
                console.error("Failed to load algorithms:", error);
            }
        };

        const checkService = async () => {
            const available = await watermarkService.checkHealth();
            setServiceAvailable(available);
        };

        loadAlgorithms();
        checkService();
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setProcessing((prev) => ({
                    ...prev,
                    error: "Please select a valid image file",
                }));
                return;
            }

            setSelectedFile(file);
            setCleanedImage(null);
            setPreviewImage(null);
            setProcessing((prev) => ({ ...prev, error: null, success: false }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setOriginalPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (evt) => {
                setOriginalPreview(evt.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveWatermark = async () => {
        if (!selectedFile) {
            setProcessing((prev) => ({ ...prev, error: "Please select an image" }));
            return;
        }

        setProcessing({
            isProcessing: true,
            progress: 0,
            error: null,
            success: false,
        });

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProcessing((prev) => ({
                    ...prev,
                    progress: Math.min(prev.progress + 10, 90),
                }));
            }, 200);

            const result = await watermarkService.removeWatermark(
                selectedFile,
                sensitivity,
                algorithm
            );

            clearInterval(progressInterval);

            setCleanedImage(result);
            setProcessing({
                isProcessing: false,
                progress: 100,
                error: null,
                success: true,
            });

            // Reset success message after 3 seconds
            setTimeout(() => {
                setProcessing((prev) => ({ ...prev, success: false }));
            }, 3000);
        } catch (error) {
            setProcessing({
                isProcessing: false,
                progress: 0,
                error:
                    error instanceof Error ? error.message : "Failed to remove watermark",
                success: false,
            });
        }
    };

    const handlePreview = async () => {
        if (!selectedFile) {
            setProcessing((prev) => ({ ...prev, error: "Please select an image" }));
            return;
        }

        try {
            setShowPreview(true);
            const preview = await watermarkService.previewWatermarkDetection(
                selectedFile
            );
            setPreviewImage(preview);
        } catch (error) {
            setProcessing((prev) => ({
                ...prev,
                error:
                    error instanceof Error
                        ? error.message
                        : "Failed to generate preview",
            }));
        }
    };

    const handleDownload = () => {
        if (!cleanedImage) return;

        const url = URL.createObjectURL(cleanedImage);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cleaned_${selectedFile?.name || "image.png"}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setSelectedFile(null);
        setOriginalPreview(null);
        setCleanedImage(null);
        setPreviewImage(null);
        setProcessing({
            isProcessing: false,
            progress: 0,
            error: null,
            success: false,
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Watermark Remover</h1>
                    <p className="text-gray-400">
                        Remove watermarks from your images using advanced AI algorithms
                    </p>
                </div>

                {/* Service Status */}
                {!serviceAvailable && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 text-red-300">
                        ⚠️ Watermark remover service is currently unavailable. Please try again
                        later.
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <Card>
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">
                                Upload Image
                            </h2>

                            {/* File Upload Area */}
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    disabled={!serviceAvailable}
                                />

                                <div className="mb-4">
                                    <svg
                                        className="w-12 h-12 mx-auto text-purple-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>

                                <p className="text-white font-semibold mb-2">
                                    {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    PNG, JPG, WebP, or BMP (max 50MB)
                                </p>
                            </div>

                            {/* Original Image Preview */}
                            {originalPreview && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                        Original Image
                                    </h3>
                                    <div className="relative w-full h-64 bg-slate-800 rounded-lg overflow-hidden">
                                        <Image
                                            src={originalPreview}
                                            alt="Original"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Algorithm Selection */}
                            <div className="mt-6">
                                <label className="block text-white font-semibold mb-3">
                                    Removal Algorithm
                                </label>
                                <select
                                    value={algorithm}
                                    onChange={(e) =>
                                        setAlgorithm(
                                            e.target.value as
                                            | "simple"
                                            | "morphological"
                                            | "advanced"
                                        )
                                    }
                                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-purple-500/30 focus:border-purple-500 focus:outline-none"
                                    disabled={!serviceAvailable}
                                >
                                    {algorithms.map((alg) => (
                                        <option key={alg.name} value={alg.name}>
                                            {alg.name.charAt(0).toUpperCase() + alg.name.slice(1)} - {alg.quality}
                                            quality ({alg.speed})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sensitivity Slider */}
                            <div className="mt-6">
                                <label className="block text-white font-semibold mb-3">
                                    Removal Sensitivity: {(sensitivity * 100).toFixed(0)}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={sensitivity}
                                    onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                                    className="w-full"
                                    disabled={!serviceAvailable}
                                />
                                <p className="text-gray-400 text-sm mt-2">
                                    Higher values = more aggressive removal
                                </p>
                            </div>

                            {/* Error Message */}
                            {processing.error && (
                                <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-300 text-sm">
                                    {processing.error}
                                </div>
                            )}

                            {/* Success Message */}
                            {processing.success && (
                                <div className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded text-green-300 text-sm">
                                    ✓ Watermark removed successfully!
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-6 flex gap-3">
                                <Button
                                    onClick={handlePreview}
                                    disabled={!selectedFile || processing.isProcessing || !serviceAvailable}
                                    className="flex-1"
                                    variant="secondary"
                                >
                                    Preview
                                </Button>
                                <Button
                                    onClick={handleRemoveWatermark}
                                    disabled={!selectedFile || processing.isProcessing || !serviceAvailable}
                                    className="flex-1"
                                    loading={processing.isProcessing}
                                >
                                    Remove Watermark
                                </Button>
                            </div>

                            {/* Progress Bar */}
                            {processing.isProcessing && (
                                <div className="mt-4 bg-slate-800 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">Processing...</span>
                                        <span className="text-sm text-purple-400">
                                            {processing.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${processing.progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Reset Button */}
                            {(cleanedImage || originalPreview) && (
                                <Button
                                    onClick={handleReset}
                                    className="w-full mt-4"
                                    variant="secondary"
                                >
                                    Reset
                                </Button>
                            )}
                        </div>
                    </Card>

                    {/* Results Section */}
                    <div>
                        {cleanedImage ? (
                            <Card>
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold text-white mb-4">
                                        Cleaned Image
                                    </h2>

                                    <div className="relative w-full h-96 bg-slate-800 rounded-lg overflow-hidden mb-6">
                                        <Image
                                            src={URL.createObjectURL(cleanedImage)}
                                            alt="Cleaned"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleDownload}
                                        className="w-full"
                                    >
                                        Download Cleaned Image
                                    </Button>

                                    <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                        <p className="text-green-400 text-sm font-semibold mb-2">
                                            ✓ Watermark Removal Complete
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            Algorithm: {algorithm} | Sensitivity: {(sensitivity * 100).toFixed(0)}%
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ) : (
                            <Card>
                                <div className="p-6 h-full flex flex-col items-center justify-center">
                                    <svg
                                        className="w-16 h-16 text-gray-600 mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M7 21a4 4 0 105.27 0M11 20h.01M6 20h.01M22 11.08V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2h9.08"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        No Image Processed Yet
                                    </h3>
                                    <p className="text-gray-400 text-center">
                                        Upload an image and click "Remove Watermark" to see the results here
                                    </p>
                                </div>
                            </Card>
                        )}

                        {/* Algorithm Info */}
                        {algorithms.length > 0 && (
                            <Card className="mt-8">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">
                                        Available Algorithms
                                    </h3>
                                    <div className="space-y-3">
                                        {algorithms.map((alg) => (
                                            <div
                                                key={alg.name}
                                                className="p-3 bg-slate-800 rounded-lg border border-purple-500/20"
                                            >
                                                <p className="font-semibold text-purple-300 capitalize mb-1">
                                                    {alg.name}
                                                </p>
                                                <p className="text-sm text-gray-400 mb-2">
                                                    {alg.description}
                                                </p>
                                                <div className="flex gap-4 text-xs">
                                                    <span className="text-blue-400">
                                                        Speed: <span className="text-white">{alg.speed}</span>
                                                    </span>
                                                    <span className="text-green-400">
                                                        Quality:{" "}
                                                        <span className="text-white">{alg.quality}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            <Modal
                isOpen={showPreview}
                onClose={() => {
                    setShowPreview(false);
                    setPreviewImage(null);
                }}
                title="Watermark Detection Preview"
            >
                <div className="p-6">
                    {previewImage ? (
                        <div className="relative w-full h-96 bg-slate-800 rounded-lg overflow-hidden">
                            <Image
                                src={URL.createObjectURL(previewImage)}
                                alt="Preview"
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">Loading preview...</p>
                        </div>
                    )}
                    <p className="text-gray-400 text-sm mt-4">
                        Green highlighted areas show detected watermark regions that will be
                        removed.
                    </p>
                </div>
            </Modal>
        </div>
    );
}
