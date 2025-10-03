import express from 'express';
import { JobController } from './jobs.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// All routes are protected with JWT auth middleware
router.post('/', auth(), JobController.createJob);
router.get('/', auth(), JobController.getJobs);
router.get('/all', JobController.getAllJobs);
router.put('/:id', auth(), JobController.updateJob);
router.delete('/:id', auth(), JobController.deleteJob);

export const JobsRoute = router;
