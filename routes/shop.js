var express = require("express");
var mongoose = require('mongoose');

var router = express.Router();
const productController = require("../controllers/product");

// Get homepage và product page

router.get("/", productController.getIndexProducts);

router.get("/product/:productId", productController.getProduct);

router.post("/product/:productId", productController.postComment);

router.get("/products/:productType?/:productChild?",productController.getProducts);

router.post("/products/:productType*?", productController.postNumItems);

router.get("/search", productController.getSearch);

// Xử lý Cart

router.get("/shopping_cart", productController.getCart);

router.get("/add-to-cart/:productId", productController.addToCart);

router.get("/modify-cart", productController.modifyCart);

router.get("/add-order", productController.addOrder);

router.post("/add-order", productController.postAddOrder);

router.get("/delete-cart", productController.getDeleteCart);

router.get("/delete-item/:productId", productController.getDeleteItem);

router.get("/merge-cart", productController.mergeCart);

// Quản lý sản phẩm
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' + file.originalname)
    }
  });
var upload = multer({ storage: storage });
router.post('/upimage', upload.any(), productController.getImage);

router.get("/admin", productController.viewAdmin);

router.post("/admin/product/add", productController.postAddProduct);

router.get("/admin/product/add", productController.getAddProduct);

router.get("/delete:", productController.getDeleteProduct);

router.get("/admin/product", productController.viewProductList);



  
module.exports = router;
