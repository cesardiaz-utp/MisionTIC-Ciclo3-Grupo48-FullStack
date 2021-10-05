<template>
  <v-container>
    <h1>{{ title }}</h1>
    <v-file-input
      v-if="!isEdit"
      v-model="image"
      accept="image/*"
      label="File input"
    ></v-file-input>
    <v-text-field label="Code *" v-model="code" :rules="rules"></v-text-field>
    <v-text-field label="Name *" v-model="name" :rules="rules"></v-text-field>
    <v-text-field label="Price* " v-model="price" :rules="rules"></v-text-field>
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
    <v-btn color="primary" v-if="!isEdit" @click="guardar()">Guardar</v-btn>
    <v-btn color="success" v-if="isEdit" @click="actualizar()"
      >Actualizar</v-btn
    >

    <SuccessMessage
      :message="successMessage"
      :snackbar="successShow"
      :close="closeSuccessDialog"
    ></SuccessMessage>
    <ErrorMessage
      :message="errorMessage"
      :snackbar="errorShow"
      :close="closeErrorDialog"
    ></ErrorMessage>
  </v-container>
</template>

<script>
import {
  insertProduct,
  getProduct,
  updateProduct,
  insertProductWithImage,
} from "../../services/Products.service";
import SuccessMessage from "../../components/SuccessMessage.vue";
import ErrorMessage from "../../components/ErrorMessage.vue";

export default {
  components: {
    SuccessMessage,
    ErrorMessage,
  },
  data() {
    return {
      title: "New product",
      code: 0,
      name: "",
      price: 0,
      categories: [],
      image: null,
      isEdit: false,
      successMessage: "",
      successShow: false,
      errorMessage: "",
      errorShow: false,
      rules: [(value) => !!value || "Requerido."],
    };
  },
  created() {
    console.log("tiene code: " + this.$route.params.code);
    const code = this.$route.params.code;
    if (code != undefined) {
      getProduct(code)
        .then((response) => {
          const product = response.data;
          this.code = product.code;
          this.name = product.name;
          this.price = product.price;
          this.categories = product.categories;

          this.title = "Edit product";
          this.isEdit = true;
        })
        .catch(() => this.openErrorDialog("Datos no encontrados"));
    }
  },
  methods: {
    guardar() {
      if (
        this.code == undefined ||
        this.code == "" ||
        this.name == undefined ||
        this.name == "" ||
        this.price == undefined ||
        this.price == ""
      ) {
        this.openErrorDialog("Ingrese los campos obligatorios");
        return;
      }

      let request = null;
      if (this.image != null && this.image != undefined) {
        const product = new FormData();
        product.append("code", this.code);
        product.append("name", this.name);
        product.append("price", this.price);
        product.append("categories", this.categories);
        product.append("image", this.image);

        console.log("Entro con imagen", product);
        request = insertProductWithImage(product);
      } else {
        const product = {
          code: this.code,
          name: this.name,
          price: this.price,
          categories: this.categories,
        };

        console.log("Entro sin imagen:", product);
        request = insertProduct(product);
      }

      console.log(request);
      request
        .then((response) =>
          this.openSuccessDialog(
            "Se ha creado el producto: " + response.data._id
          )
        )
        .catch((err) => {
          console.error(err.response.data.message);
          this.openErrorDialog("Error al guardar el producto");
        });
    },
    actualizar() {
      if (
        this.code == undefined ||
        this.code == "" ||
        this.name == undefined ||
        this.name == "" ||
        this.price == undefined ||
        this.price == ""
      ) {
        this.openErrorDialog("Ingrese los campos obligatorios");
        return;
      }

      const product = {
        code: this.code,
        name: this.name,
        price: this.price,
        categories: this.categories,
      };
      updateProduct(this.code, product)
        .then(() =>
          this.openSuccessDialog("Se ha actualizado el producto: " + this.code)
        )
        .catch(() => this.openErrorDialog("Error al actualizar el producto"));
    },
    openSuccessDialog(mensaje) {
      this.successMessage = mensaje;
      this.successShow = true;
    },
    closeSuccessDialog() {
      this.successShow = false;
      this.$router.push("/products");
    },
    openErrorDialog(mensaje) {
      this.errorMessage = mensaje;
      this.errorShow = true;
    },
    closeErrorDialog() {
      this.errorShow = false;
    },
  },
};
</script>

<style>
</style>