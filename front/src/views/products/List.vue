<template>
  <div class="products">
    <v-container>
      <h1>Product list</h1>
      <v-btn class="mb-3" color="primary" link to="/products/new"
        >Add new product</v-btn
      >
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.code"
          md="4"
          sm="6"
        >
          <v-card elevation="2" class="mx-auto">
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle
              ><b>Price:</b> $ {{ product.price }}
            </v-card-subtitle>
            <v-card-subtitle><b>Categories:</b></v-card-subtitle>
            <v-chip-group column>
              <v-chip v-for="category in product.categories" :key="category">
                {{ category }}
              </v-chip>
            </v-chip-group>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="success">Editar</v-btn>
              <v-btn color="error">Eliminar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAllProducts } from "../../services/Products.service";

export default {
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    getAllProducts()
      .then((response) => {
        this.products = response.data;
      })
      .catch((err) => console.error(err));
  },
};
</script>

<style scope>
.v-card {
  min-width: 250px;
}

.v-slide-group__content {
  justify-content: center;
}
</style>