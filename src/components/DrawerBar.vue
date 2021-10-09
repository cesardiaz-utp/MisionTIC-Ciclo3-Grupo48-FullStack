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
      <div v-for="item in items" :key="item.nombre">
        <v-list-item link :to="item.ruta" v-if="item.ver">
          <v-list-item-icon>
            <v-icon>{{ item.imagen }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.nombre }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["title", "drawer"],
  data() {
    return {
      username: "",
      items: [
        { nombre: "Inicio", imagen: "mdi-home", ruta: "/", ver: true },
        {
          nombre: "Productos",
          imagen: "mdi-apps-box",
          ruta: "/products",
          ver: this.hasRole("admin"),
        },
        {
          nombre: "Acerca de",
          imagen: "mdi-help-box",
          ruta: "/about",
          ver: true,
        },
      ],
    };
  },
  mounted(){
    this.username = sessionStorage.getItem("username");
  },
  methods: {
    hasRole(role) {
      return sessionStorage.getItem("role") == role;
    },
  },
};
</script>

<style>
</style>