const models = require('../models');
const db = require('../config/connection');
// Drops a MongoDB collection if it exists
module.exports = async (modelName, collectionName) => {
  try {
    // Check if the specified collection exists by listing collections and filtering by name
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()
    // If the collection exists, drop the collection
    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}
