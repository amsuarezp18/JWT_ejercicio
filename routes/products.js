var express = require('express');
var router = express.Router();
var [getProducts, insertProduct, grantAccess ] = require('../controllers/product');

const auth = require('../lib/utils/auth');

/* GET product listing. */
router.get('/', auth.checkToken, async function (req, res, next) {
  const products = await getProducts();
  console.warn('products->', products);
  res.send(products);
});

/**
 * POST product
 */
router.post('/', auth.checkToken, async function (req, res, next) {
  let token = req.headers['authorization'] 
  token = token.split(' ')[1];

  if(grantAccess('createAny', token ,'productos') === false){
    return res.status(401).json({
     error: "No tienes permisos para realizar esta operación"
    });
  }
  const newProduct = await insertProduct(req.body);
  console.warn('insert products->', newProduct);
  res.send(newProduct);
});

module.exports = router;
