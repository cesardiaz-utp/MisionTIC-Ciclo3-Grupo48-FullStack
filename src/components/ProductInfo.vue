<template>
  <v-list-item v-if="product != undefined" link @click="onClick()">
    <v-list-item-avatar>
      <v-img
        :src="
          product.imageUrl == undefined
            ? 'https://isocarp.org/app/uploads/2014/05/noimage.jpg'
            : product.imageUrl
        "
      ></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-html="product.name"></v-list-item-title>
      <v-list-item-subtitle
        ><b>Price:</b> $ {{ product.price }}</v-list-item-subtitle
      >
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { getProduct } from "../services/Products.service";
export default {
  props: ["code"],
  data() {
    return {
      height: 200,
      width: 200,
      product: undefined,
    };
  },
  created() {
    getProduct(this.code)
      .then((response) => {
        this.product = response.data;
      })
      .catch(() => {
        console.error(
          `Error al consultar los datos del producto '${this.code}'`
        );
      });
  },
  methods: {
      onClick(){
          this.$emit("product-selected", this.product.code);
      }
  }
};
</script>

<style scoped>
</style>