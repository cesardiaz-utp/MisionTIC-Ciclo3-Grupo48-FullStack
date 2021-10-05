<template>
  <v-container>
    <h1>Welcome to my store</h1>
    <v-text-field
      color="success"
      :loading="loadingState"
      label="Search for a product"
      v-model="searchText"
      append-icon="mdi-magnify"
      @keyup.enter="search()"
    ></v-text-field>

    <v-list three-line>
      <template v-for="code in productCodes">
        <product-info :code="code" :key="code" v-on:product-selected="showProduct"></product-info>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import ProductInfo from "../components/ProductInfo.vue";
import { getAllProducts } from "../services/Products.service";

export default {
  components: { ProductInfo },
  data() {
    return {
      loadingState: false,
      searchText: "",
      productCodes: [],
    };
  },
  methods: {
    search() {
      this.loadingState = true;

      getAllProducts()
        .then((response) => {
          const products = response.data;
          this.productCodes = products.map((product) => product.code);
          this.loadingState = false;
        })
        .catch(() => {
          this.loadingState = false;
          console.error("Error al consultar los productos");
        });
    },
    showProduct(code){
      this.$router.push("/products/"+code)
    }
  },
};
</script>
