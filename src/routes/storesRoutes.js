
const router = require('express').Router();
const {deleteStore, updateStore, createStore, getStores} = require('../database/stores');

router.get('/', async (apiRequest, apiResponse) => {
  apiResponse.send(await getStores());
});

// we name our parameters apiRequest and apiResponse here but
// there is no strong reason these variables could not be named `req` and `res` or `request` and `response`
// the reason for this naming is so we are thinking about "api" tonight
router.post('/', async (apiRequest, apiResponse) => {
  const newStore = apiRequest.body;
  await createStore(newStore);
  apiResponse.send({
    message: 'New store created.',
    allStores: await getStores(),
    thanks: true
  });
});

// endpoint to delete a store
router.delete('/:storeId', async (apiRequest, apiResponse) => {
  await deleteStore(apiRequest.params.storeId);
  apiResponse.send({ message: 'Store deleted.' });
});

// endpoint to update a store
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedStore = apiRequest.body;
  console.log({ updatedStore})
  await updateStore(apiRequest.params.id, updatedStore);
  apiResponse.send({ message: 'Store updated.' });
});

module.exports = router;



