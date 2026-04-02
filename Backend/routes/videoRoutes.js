const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { protect } = require('../middleware/auth');
const { requireSubscription } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// CRUD operations
router.post('/', videoController.createVideo);
router.get('/', videoController.getUserVideos);
router.get('/:id', videoController.getVideoById);
router.put('/:id', videoController.updateVideo);
router.delete('/:id', videoController.deleteVideo);

// Export and publish (require subscription)
router.post('/:id/export', requireSubscription('STARTER', 'CREATOR', 'PRO'), videoController.exportVideo);
router.post('/:id/publish', requireSubscription('CREATOR', 'PRO'), videoController.publishToYouTube);

module.exports = router;
