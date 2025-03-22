const router = require('express').Router();
const jobController = require('../controllers/jobController');

router.post('/create', jobController.createJob);
router.get('/all', jobController.getJobs);

module.exports = router;
