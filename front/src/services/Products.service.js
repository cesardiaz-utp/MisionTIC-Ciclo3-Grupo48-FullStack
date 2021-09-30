import httpClient from "./httpClient";

const END_POINT = "/api/products";

const getAllProducts = () => httpClient.get(END_POINT);

const getProduct = (code) => httpClient.get(END_POINT + "/" + code); // /api/products/1001

const insertProduct = (product) => httpClient.post(END_POINT, product);

const updateProduct = (code, product) => httpClient.put(END_POINT + "/" + code, product);

const deleteProduct = (code) => httpClient.delete(END_POINT + "/" + code);



export {
    getAllProducts,
    getProduct,
    insertProduct,
    updateProduct,
    deleteProduct
}