const {getDatabase} = require('./mongo-common');
// https://docs.mongodb.com/manual/reference/method/ObjectId/
const {ObjectID} = require('mongodb');

var getUserName = require('git-user-name');
console.log(getUserName());

// a "collection" in mongo is a lot like a list which is a lot like an Array
const collectionName = 'product-types';

async function createProduct-type(product-type) {
  const database = await getDatabase();
  product-type.addedBy = getUserName()
  // for `insertOne` info, see https://docs.mongodb.com/manual/reference/method/js-collection/
  const {insertedId} = await database.collection(collectionName).insertOne(product-type);
  return insertedId;
}

async function getProduct-types() {
  const database = await getDatabase();
  // `find` https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteProduct-type(id) {
  const database = await getDatabase();
  // https://docs.mongodb.com/manual/reference/method/ObjectId/
  // for `deleteOne` info see  https://docs.mongodb.com/manual/reference/method/js-collection/
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

async function updateProduct-type(id, product-type) {
  const database = await getDatabase();

  // `delete` is new to you. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  delete product-type._id;
  product-type.updatedBy = getUserName()
  // https://docs.mongodb.com/manual/reference/method/db.collection.update/
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...product-type,
      },
    },
  );
}

// export the functions that can be used by the main app code
module.exports = {
  createProduct-type,
  getProduct-types,
  deleteProduct-type,
  updateProduct-type,
};
