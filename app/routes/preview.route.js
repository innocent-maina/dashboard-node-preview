const router = require('express').Router();
const { PreviewController } = require('../controllers');

router.get('', PreviewController.getAllPreviews);
router.post('', PreviewController.createNewPreview);
router.get('/:id', PreviewController.showSinglePreview);
router.delete('/:id', PreviewController.deleteSinglePreview);

module.exports = router;
