
const router = require('express').Router();
const {deleteLogo, updateLogo, createLogo, getLogos} = require('../database/logos');
//const { createProduct } = require('../database/products');

router.get('/', async (req, res) => {
  res.send(await getLogos());
});

router.post('/', async (apiRequest, apiResponse) => {
    const newLogo = apiRequest.body;
    await createLogo(newLogo);
    apiResponse.send({
      message: 'New product created.',
      allLogo: await getLogos(),
      thanks: true
    });
  });

//add put for logos
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedLogo = apiRequest.body;
  console.log({ updatedLogo})
  await updateLogo(apiRequest.params.id, updatedLogo);
  apiResponse.send({ message: 'Logo updated.' });
});

router.delete('/:logoId', async (apiRequest, apiResponse) => {
  await deleteLogo(apiRequest.params.logoId);
  apiResponse.send({ message: 'Logo deleted.' });
});

module.exports = router;


