const router = require('express').Router();
const { Blog, Comments, User } = require('../models/');

// get all Blogs for homepage
router.get('/', async (req, res) => {
  try {
    const BlogData = await Blog.findAll({
      include: [User],
    });

    const Blogs = BlogData.map((Blog) => Blog.get({ plain: true }));

    res.render('all-Blogs', { Blogs });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single Blog
router.get('/Blog/:id', async (req, res) => {
  try {
    const BlogData = await Blog.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comments,
          include: [User],
        },
      ],
    });

    if (BlogData) {
      const Blog = BlogData.get({ plain: true });

      res.render('single-Blog', { Blog });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;