
const router = require('express').Router();
const {deleteProduct-type, updateProduct-type, createProduct-type, getProduct-types} = require('../database/products');

router.get('/', async (apiRequest, apiResponse) => {
  apiResponse.send(await getProduct-types());
});

// we name our parameters apiRequest and apiResponse here but
// there is no strong reason these variables could not be named `req` and `res` or `request` and `response`
// the reason for this naming is so we are thinking about "api" tonight
router.post('/', async (apiRequest, apiResponse) => {
  const newProduct-type = apiRequest.body;
  await createProduct-type(newProduct-type);
  apiResponse.send({
    message: 'New product created.',
    allProduct-types: await getProduct-types(),
    thanks: true
  });
});

// endpoint to delete a product
router.delete('/:productId', async (apiRequest, apiResponse) => {
  await deleteProduct-type(apiRequest.params.productId);
  apiResponse.send({ message: 'Product deleted.' });
});

// endpoint to update a product
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedProduct-type = apiRequest.body;
  console.log({ updatedProduct-type})
  await updateProduct-type(apiRequest.params.id, updatedProduct-type);
  apiResponse.send({ message: 'Product-type updated.' });
});

module.exports = router;



