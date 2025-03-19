import express from 'express';
import Project from '../models/Project.js';
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const project = new Project({ name: 'test' });
  await project.save();
  const projects = await Project.find();
  res.json(projects);
});

export default router;
