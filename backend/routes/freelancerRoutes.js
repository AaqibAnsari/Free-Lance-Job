const router = require('express').Router();
const freelancerController = require('../controllers/freelancerController');

router.post('/create', freelancerController.createProfile);
router.get('/:userId', freelancerController.getProfile);

module.exports = router;
