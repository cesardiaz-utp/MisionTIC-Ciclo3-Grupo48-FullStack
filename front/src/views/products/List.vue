<template>
  <div class="products">
    <v-container>
      <h1>Product list</h1>
      <v-btn class="mb-3" color="primary" link to="/products/new"
        >Add new product</v-btn
      >
      <v-row>
        <v-col v-for="product in products" :key="product.code" md="4" sm="6">
          <v-card elevation="2" class="mx-auto">
            <v-img
              :src="
                product.imageUrl == undefined
                  ? 'https://isocarp.org/app/uploads/2014/05/noimage.jpg'
                  : product.imageUrl
              "
            ></v-img>

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
              <v-btn color="success" @click="editarProducto(product.code)"
                >Editar</v-btn
              >
              <v-btn color="error" @click="eliminarProducto(product.code)"
                >Eliminar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { getAllProducts, deleteProduct } from "../../services/Products.service";

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
  methods: {
    editarProducto(code) {
      this.$router.push(`/products/${code}`);
    },
    eliminarProducto(code) {
      deleteProduct(code)
        .then(() => {
          console.log("Exito");
          this.products = this.products.filter((item) => item.code != code);
        })
        .catch(() => {
          console.log("Error");
        });
    },
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

v-image__image {
  background-size: auto 150px;
}
</style>