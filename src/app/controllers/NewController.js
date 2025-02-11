const NewController = (req, res) => {
  res.render('new');
};

const SlugController = (req, res) => {
  res.send('Slug');
};

export { NewController, SlugController };
