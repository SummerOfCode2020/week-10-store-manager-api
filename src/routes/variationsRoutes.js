
const router = require('express').Router();
const {deleteVariations, updateVariations, createVariations, getVariationss} = require('../database/variations');
//const { createProduct } = require('../database/products');

router.get('/', async (req, res) => {
  res.send(await getVariationss());
});

router.post('/', async (apiRequest, apiResponse) => {
    const newVariations = apiRequest.body;
    await createVariations(newVariations);
    apiResponse.send({
      message: 'New product created.',
      allVariations: await getVariationss(),
      thanks: true
    });
  });

//add put for variationss
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedVariations = apiRequest.body;
  console.log({ updatedVariations})
  await updateVariations(apiRequest.params.id, updatedVariations);
  apiResponse.send({ message: 'Variations updated.' });
});

router.delete('/:variationsId', async (apiRequest, apiResponse) => {
  await deleteVariations(apiRequest.params.variationsId);
  apiResponse.send({ message: 'Variations deleted.' });
});

module.exports = router;


