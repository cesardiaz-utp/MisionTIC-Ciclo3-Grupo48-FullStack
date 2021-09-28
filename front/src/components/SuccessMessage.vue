<template>
  <v-snackbar v-model="snackbar" :multi-line="multiLine">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="close()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: ["message", "snackbar", "close"],
  data: () => ({
    multiLine: true,
  }),
};
</script>
