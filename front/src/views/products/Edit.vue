<template>
  <v-container>
    <h1>New product</h1>
    <v-text-field label="Code" v-model="code"></v-text-field>
    <v-text-field label="Name" v-model="name"></v-text-field>
    <v-text-field label="Price" v-model="price"></v-text-field>
    <v-combobox
      v-model="categories"
      chips
      clearable
      label="Categories"
      multiple
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ item }}</strong>
        </v-chip>
      </template>
    </v-combobox>
    <v-btn color="primary" @click="guardar()">Guardar</v-btn>

    <SuccessMessage
      :message="successMessage"
      :snackbar="successShow"
      :close="closeSuccessDialog"
    ></SuccessMessage>
  </v-container>
</template>

<script>
import { insertProduct } from "../../services/Products.service";
import SuccessMessage from "../../components/SuccessMessage.vue";

export default {
  components: {
    SuccessMessage,
  },
  data() {
    return {
      code: 0,
      name: "",
      price: 0,
      categories: [],
      successMessage: "",
      successShow: false,
    };
  },
  methods: {
    guardar() {
      const product = {
        code: this.code,
        name: this.name,
        price: this.price,
        categories: this.categories,
      };
      insertProduct(product)
        .then((response) => {
          this.successMessage =
            "Se ha creado el producto: " + response.data._id;
          this.successShow = true;
        })
        .catch((err) => console.error(err));
    },
    closeSuccessDialog() {
      this.successShow = false;
      this.$router.push("/products");
    },
  },
};
</script>

<style>
</style>