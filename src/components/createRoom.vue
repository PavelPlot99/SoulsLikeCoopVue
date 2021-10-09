<template>
  <v-container>
    <v-row class="list__cafes-title">
      <v-col>
        <h2 class="text-center text-h3 py-3">Создать комнату</h2>
      </v-col>
    </v-row>
    <v-row class="list__cafes-title">
      <v-autocomplete
          filled
          rounded
          :items="items"
          label="Введите для поиска"
      ></v-autocomplete>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
  }),
}
</script>

<style scoped>

</style>