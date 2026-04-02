const express = require('express');
const router = express.Router();
const videoClipController = require('../controllers/videoClipController');
const { protect } = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
});

// Public routes (no auth required for browsing)
router.get('/search', videoClipController.searchVideoClips);
router.get('/games', videoClipController.getAvailableGames);
router.get('/moods', videoClipController.getAvailableMoods);
router.get('/:id', videoClipController.getVideoClipById);

// Protected routes (require authentication)
router.use(protect);

// Upload and delete (protected, typically admin-only in production)
router.post('/upload', upload.single('video'), videoClipController.uploadVideoClip);
router.delete('/:id', videoClipController.deleteVideoClip);

module.exports = router;
