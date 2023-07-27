const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const blogRoutes = require('./blogRoutes');
const commentsRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comments', commentsRoutes);

module.exports = router;