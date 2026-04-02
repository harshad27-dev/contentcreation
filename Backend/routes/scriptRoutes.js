const express = require('express');
const router = express.Router();
const scriptController = require('../controllers/scriptController');
const { protect } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');

// All routes are protected
router.use(protect);

// Generate AI script (rate limited)
router.post('/generate', aiLimiter, scriptController.generateAIScript);

// CRUD operations
router.get('/', scriptController.getUserScripts);
router.get('/:id', scriptController.getScriptById);
router.put('/:id', scriptController.updateScript);
router.delete('/:id', scriptController.deleteScript);

module.exports = router;
