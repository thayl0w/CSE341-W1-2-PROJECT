const router = require('express').Router();

// Swagger docs
router.use('/', require('./swagger'));

// Hello World endpoint
router.get('/', (req, res) => {
  //#swagger.tags = ['Hello World']
  res.status(200).json({ message: 'Hello World!' });
});

// User routes
router.use('/users', require('./users'));

module.exports = router;
