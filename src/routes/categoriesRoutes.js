
const router = require('express').Router();
const {deleteCategories, updateCategories, createCategories, getCategoriess} = require('../database/categories');
//const { createProduct } = require('../database/products');

router.get('/', async (req, res) => {
  res.send(await getCategoriess());
});

router.post('/', async (apiRequest, apiResponse) => {
    const newCategories = apiRequest.body;
    await createCategories(newCategories);
    apiResponse.send({
      message: 'New product created.',
      allCategories: await getCategoriess(),
      thanks: true
    });
  });

//add put for categoriess
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedCategories = apiRequest.body;
  console.log({ updatedCategories})
  await updateCategories(apiRequest.params.id, updatedCategories);
  apiResponse.send({ message: 'Categories updated.' });
});

router.delete('/:categoriesId', async (apiRequest, apiResponse) => {
  await deleteCategories(apiRequest.params.categoriesId);
  apiResponse.send({ message: 'Categories deleted.' });
});

module.exports = router;


