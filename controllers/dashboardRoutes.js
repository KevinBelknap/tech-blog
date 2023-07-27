const router = require('express').Router();
const { Blog } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const BlogData = await Blog.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const Blogs = BlogData.map((Blog) => Blog.get({ plain: true }));

    res.render('all-Blogs-admin', {
      layout: 'dashboard',
      Blogs,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-Blog', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const BlogData = await Blog.findByPk(req.params.id);

    if (BlogData) {
      const Blog = BlogData.get({ plain: true });

      res.render('edit-Blog', {
        layout: 'dashboard',
        Blog,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
