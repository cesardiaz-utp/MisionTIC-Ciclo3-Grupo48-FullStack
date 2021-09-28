const express = require("express");
const ProductsController = require("../controllers/productsController");

const router = express.Router();

// rutas de produtos
router.get("/products", ProductsController.getAll);
router.get("/products/:code", ProductsController.getByCode);
router.post("/products", ProductsController.insert);
router.put("/products/:code", ProductsController.update);
router.delete("/products/:code", ProductsController.delete);

module.exports = router;