const router = require('express').Router();
const { ProjectController } = require('../controllers');

router.get('', ProjectController.index);
router.post('', ProjectController.create);
router.get('/preview', ProjectController.show);
router.delete('/:id', ProjectController.delete);

module.exports = router;
