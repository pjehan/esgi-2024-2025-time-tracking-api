import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // #swagger.tags = ['Users']
  res.json({ title: 'Users' });
});

export default router;
