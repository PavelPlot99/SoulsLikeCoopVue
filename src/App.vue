<template>
  <v-app>

    <v-navigation-drawer
        app
        left
        temporary
        v-model="drawer"
        color="grey darken-4"
    >

      <v-list-item-group color="white">

        <v-list-item v-for="link in links" :key="link.id">
          <v-list-item-title><router-link class="link" :to="link.href">{{link.name}}</router-link></v-list-item-title>
        </v-list-item>

      </v-list-item-group>

    </v-navigation-drawer>

    <v-app-bar app color="grey darken-4">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-app-bar-title>
        <h3 class="text-h4 white--text">Dark Souls party</h3>
      </v-app-bar-title>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    links: [
      {
        id:1,
        name:'Список комнат',
        href:'/',
      },
      {
        id:2,
        name:'Создать комнату',
        href:'/createRoom',
      }
    ]
  }),
  mounted() {
    document.title = 'Dark Souls';
  }
}
</script>
<style>
.link{
  text-decoration:none;
  color:white;
}
</style>