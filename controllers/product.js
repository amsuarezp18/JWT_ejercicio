const { mongoUtils, dataBase } = require('../lib/utils/mongo.js');
const COLLECTION_NAME = 'productos';
const { ObjectId } = require("mongodb");
const { roles } = require('../roles');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

async function getProducts() {
  const client = await mongoUtils.conn();
  const products = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    .finally(() => client.close());
  return products;
}

function insertProduct(product) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(product)
      .finally(() => client.close());
  });
}

function updateProduct(body, productoId) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .updateOne(
        {
          _id: ObjectId(productoId),
        },
        {
          $set: { name: body.name , price: body.price , quantity: body.quantity  },
        },
      )
      .finally(() => client.close());
  });
}

function grantAccess(action, token, resource){
    
  let value;  
  jwt.verify( token, secret, (err, decoded ) => {
    let role = decoded.role;
    const permission = roles.can(role)[action](resource);

    if (!permission.granted) {
      value = false;
    }
    else {
      value = true;
    }

  });
  return value;
}

module.exports = [getProducts, insertProduct, grantAccess, updateProduct];
