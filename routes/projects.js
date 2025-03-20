import express from 'express';
import passport from "passport";
import Project from '../models/Project.js';
const router = express.Router();

/**
 * GET /projects
 * Retourner la liste des projets
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Projects']
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
});

/**
 * POST /projects
 * Créer un nouveau projet
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // #swagger.tags = ['Projects']
  const project = new Project({ ...req.body, user: req.user._id });

  await project.save();
  res.status(201).json(project);
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
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
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
    if (project.user === undefined || !project.user.equals(req.user._id)) {
      res.status(403).json({ message: 'Vous n\'avez pas le droit de modifier ce projet' });
    } else if (project.user === undefined || !project.user.equals(req.user._id)) {
      res.status(403).json({ message: 'Vous n\'avez pas le droit de modifier ce projet' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ message: 'invalid id' });
  }
});

export default router;
