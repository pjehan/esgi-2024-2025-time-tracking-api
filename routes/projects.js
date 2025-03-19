import express from 'express';
import Project from '../models/Project.js';
const router = express.Router();

/**
 * GET /projects
 * Retourner la liste des projets
 */
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

/**
 * POST /projects
 * Créer un nouveau projet
 */
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

/**
 * GET /projects/{id}
 * Retourner les données d'un projet
 */

/**
 * PUT /projects/{id}
 * Mettre à jour les données d'un projet
 */

/**
 * DELETE /projects/{id}
 * Supprimer un projet
 */


export default router;
