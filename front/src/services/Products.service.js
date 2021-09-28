import httpClient from "./httpClient";

const END_POINT = "/api/products";

const getAllProducts = () => httpClient.get(END_POINT);

const insertProduct = (product) => httpClient.post(END_POINT, product);

export {
    getAllProducts,
    insertProduct
}