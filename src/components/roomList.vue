<template>
  <v-container>
    <v-row class="list__cafes-title">
      <v-col>
        <h2 class="text-center text-h3 py-3">Список комнат</h2>
      </v-col>
    </v-row>

    <v-row class="list__cafes-content">

      <v-col md="6" v-for="post in posts" :key="post.id">
        <v-card>
          <v-card-title>
            <h3 class="text-h4">{{post.postType}}</h3>
          </v-card-title>
          <v-card-text>

            <span><p>Тип локации: {{locationsTypes.find(loc => loc.id === post.locationType).name}}</p></span>
            <span><p>Локация: {{locations.find(loc => loc.id === post.location).name}}</p></span>
            <span><p>Описание: {{post.description}} </p></span>
            <span><p>Игра: {{games.find(game => game.id === post.game).name}}</p></span>
            <span><p>Платформа: {{platforms.find(platform => platform.id === post.platform).name}}</p></span>
          </v-card-text>
          <v-card-actions><v-btn><router-link class="link" :to="'room/' + post.id">Присоединиться</router-link></v-btn></v-card-actions>
        </v-card>
      </v-col>

    </v-row>

  </v-container>
</template>

<script>
export default {
computed:{
  posts(){
    return this.$store.state.posts;
  },
  locationsTypes(){
    return this.$store.state.locationTypes
  },
  locations(){
    return this.$store.state.locations
  },
  platforms(){
    return this.$store.state.platforms
  },
  games(){
    return this.$store.state.games
  }
},
mounted() {
  this.$store.dispatch('GET_POSTS');
}
}
</script>

<style scoped>

</style>