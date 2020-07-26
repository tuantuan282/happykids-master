var express = require("express");
var router = express.Router();

const productController = require("../controllers/product");

// Get homepage và product page

router.get("/", productController.getIndexProducts);

router.get("/product/:productId", productController.getProduct);

router.get("/products/:productType?/:productChild?",productController.getProducts);

router.post("/products/:productType*?", productController.postNumItems);

router.post("/product/:productId", productController.postComment);

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

router.post("/add", productController.postAddProduct);

router.get("/add", productController.getAddProduct);

router.get("/view", productController.viewProductList);


/* Post cho ảnh. */
var multer  = require('multer');
var images = [];
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' + file.originalname)
    }
  })
var upload = multer({ storage: storage })
router.post('/uploadfile', upload.any(), function(req, res, next) {
    images.pop(req.files[0].path); // đưa path của img vào mảng images
    images.push(req.files[0].path); // đưa path của img vào mảng images
    res.status(200).send(req.files); // gửi mã 200 khi up thành công
  });
  
module.exports = router;
