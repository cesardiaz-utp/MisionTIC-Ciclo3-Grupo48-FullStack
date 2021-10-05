const express = require("express");
const ProductsController = require("../controllers/productsController");
const UsersController = require("../controllers/usersController");

// Carga de archivos
const multer = require("multer");
const storageConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storageConfig });

const router = express.Router();

// rutas de produtos
router.get("/products", ProductsController.getAll);
router.get("/products/:code", ProductsController.getByCode);
router.post("/products", upload.single("image"), ProductsController.insert);
router.put("/products/:code", ProductsController.update);
router.delete("/products/:code", ProductsController.delete);
router.patch("/products/:code/image", upload.single("image"), ProductsController.changeProductImage);

// rutas de usuario
router.post("/users", UsersController.insert);
router.post("/authenticate", UsersController.validateUser);

module.exports = router;