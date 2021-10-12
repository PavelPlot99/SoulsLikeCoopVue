<template>
  <v-container>
    <v-row class="list__cafes-title">
      <v-col>
        <h2 class="text-center text-h3 py-3">Создать комнату</h2>
      </v-col>
    </v-row>
    <v-row class="list__cafes-title">
      <v-col md="12">
        <v-row>
          <v-col md="12">
            <v-text-field
                label="Тип поста"
                hide-details="auto"
                filled
                rounded
                v-model="createRoom.postType"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12">
            <v-select
                filled
                rounded
                :items="games"
                item-text="name"
                item-value="id"
                label="Выберите игру"
                v-model="createRoom.game"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12">
            <v-select
                filled
                rounded
                :items="filteredPlatforms"
                item-text="name"
                item-value="id"
                label="Выберите платформу"
                v-model="createRoom.platform"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12">
            <v-select
                filled
                rounded
                :items="filteredLocationTypes"
                item-text="name"
                item-value="id"
                label="Выберите тип локации"
                v-model="createRoom.locationType"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12">
            <v-select
                filled
                rounded
                :items="filteredLocationTypes"
                item-text="name"
                item-value="id"
                label="Выберите тип локации"
                v-model="createRoom.locationType"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="12">
            <v-select
                filled
                rounded
                :items="filteredLocations"
                item-text="name"
                item-value="id"
                label="Выберите локация"
                v-model="createRoom.location"
            ></v-select>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col md="1" >
            <v-btn @click="createPost">
              Создать
            </v-btn>
          </v-col>
        </v-row>

      </v-col>
    </v-row>




  </v-container>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
    locationsTypes() {
      return this.$store.state.locationTypes
    },
    locations() {
      return this.$store.state.locations
    },
    platforms() {
      return this.$store.state.platforms
    },
    games() {
      return this.$store.state.games
    },
    filteredPlatforms() {
      return this.$store.state.platforms.filter(plat => plat.games.find(game => game === this.createRoom.game))
    },
    filteredLocationTypes() {
      return this.$store.state.locationTypes.filter(type => type.games.find(game => game === this.createRoom.game))
    },
    createRoom() {
      return this.$store.state.createRoom
    },
    filteredLocations(){
      return this.$store.state.locations.filter(locate => locate.game === this.createRoom.game && locate.locationType === this.createRoom.locationType)
    }
  },
  methods: {
    send() {
      console.log(this.createRoom.game)
    },
    createPost(){
      this.$store.dispatch('CREATE_POST')
    }
  }
}
</script>

<style scoped>

</style>