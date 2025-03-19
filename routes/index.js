import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const { db } = req.app.locals;
  await db.collection('projects').insertOne({ name: 'test' });
  const projects = await db.collection('projects').find().toArray();
  res.json(projects);
});

export default router;
