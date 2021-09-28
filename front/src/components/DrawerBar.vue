<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> {{ title }} </v-list-item-title>
        <v-list-item-subtitle> {{ username }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.nombre"
        link
        :to="item.ruta"
      >
        <v-list-item-icon>
          <v-icon>{{ item.imagen }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.nombre }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["title", "username", "drawer"],
  data() {
    return {
      items: [
        { nombre: "Inicio", imagen: "mdi-home", ruta: "/" },
        { nombre: "Productos", imagen: "mdi-apps-box", ruta: "/products" },
        { nombre: "Acerca de", imagen: "mdi-help-box", ruta: "/about" },
      ],
      right: null,
    };
  },
};
</script>

<style>
</style>