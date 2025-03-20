import express from 'express';
import passport from "passport";
import Task from '../models/Task.js';
import Project from "../models/Project.js";
const router = express.Router();

/**
 * GET /tasks?projectid=
 * Retourner la liste des tâches
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Tasks']
  //const tasks = await Task.find({ "project.user": req.user._id }).populate("project").exec();

  const tasks = await Project.aggregate([
    { $match: { user: req.user._id } },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'project',
        as: 'tasks'
      }
    },
    { $unwind: '$tasks' },
    { $replaceRoot: { newRoot: '$tasks' } }
  ]);
  /*
  const tasks = await Task.find().populate({
    path: 'project',
    match: { user: req.user._id }
  });
  */

  res.json(tasks);
});

/**
 * POST /tasks
 * Créer une nouvelle tâche
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Tasks']
  const task = new Task({ ...req.body });

  await task.save();
  res.status(201).json(task);
});

/**
 * GET /projects/{id}
 * Retourner les données d'un projet
 */
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Projects']
  try {
    const project = await Project.findById(req.params.id);
    if (project === null) {
      res.status(404).json({ message: 'Ce projet n\'existe pas' });
    } else if (project.user === undefined || !project.user.equals(req.user._id)) {
      res.status(403).json({ message: 'Vous n\'avez pas le droit d\'accéder à ce projet' });
    } else {
      res.json(project);
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'invalid id' });
  }
});

/**
 * PUT /projects/{id}
 * Mettre à jour les données d'un projet
 */
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Projects']
  try {
    // Vérifier si le projet existe et si l'utilisateur a le droit de modifier ce projet
    let project = await Project.findById(req.params.id);
    if (project === null) {
      res.status(404).json({ message: 'Ce projet n\'existe pas' });
    } else if (project.user === undefined || !project.user.equals(req.user._id)) {
      res.status(403).json({ message: 'Vous n\'avez pas le droit de modifier ce projet' });
    } else {
      project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(project);
    }
  } catch (error) {
    res.status(400).json({ message: 'invalid id' });
  }
});

/**
 * DELETE /projects/{id}
 * Supprimer un projet
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Projects']
  try {
    // Vérifier si le projet existe et si l'utilisateur a le droit de supprimer ce projet
    let project = await Project.findById(req.params.id);
    if (project === null) {
      res.status(404).json({ message: 'Ce projet n\'existe pas' });
    } else if (project.user === undefined || !project.user.equals(req.user._id)) {
      res.status(403).json({ message: 'Vous n\'avez pas le droit de modifier ce projet' });
    } else {
      await Project.findByIdAndDelete(req.params.id);
      res.json({ message: 'Projet supprimé avec succès' });
    }
  } catch (error) {
    res.status(400).json({ message: 'invalid id' });
  }
});

export default router;
