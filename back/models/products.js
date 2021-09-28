const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    "code": Number,
    "name": String,
    "price": Number,
    "categories": Array
});

module.exports = mongoose.model("Product", productSchema);
