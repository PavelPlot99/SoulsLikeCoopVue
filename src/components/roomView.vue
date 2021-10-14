<template>
  <v-main>
    <v-row>
      <v-col>
        <h2 class="text-center text-h3 py-3" v-if="currentLocations !== null">Комната: {{currentLocations[0].name}} </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-container>
        <h5 class="text-center text-h3 py-3">Игровой чат</h5>
        <v-container class="fill-height">
          <v-row class="fill-height pb-14" align="end">
            <v-col v-if="roomChat !== null">
              <div  v-for="(chat, index) in roomChat" :key="index"
                   :class="['d-flex flex-row align-center my-2', chat.user.username === currentUser.username ? 'justify-end': null]">
                <span v-if="chat.user.username === currentUser.username" class="blue--text mr-3">{{ chat.message }}</span>
                <v-avatar :color="chat.user.username === currentUser.username ? 'indigo': 'red'" size="50">
                  <span class="white--text">{{ chat.user.username }}</span>
                </v-avatar>
                <span v-if="chat.user.username !== currentUser.username" class="blue--text ml-3">{{ chat.message }}</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-footer fixed>
          <v-container class="ma-0 pa-0">
            <v-row no-gutters>
              <v-col>
                <div class="d-flex flex-row align-center">
                  <v-text-field v-model="message" placeholder="Введите сообщение" @keypress.enter="send"></v-text-field>
                  <v-btn icon class="ml-4" @click="send"><v-icon>mdi-send</v-icon></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </v-container>
    </v-row>
  </v-main>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('GET_ROOM', this.$route.params.id)
    this.getChat()
    this.$store.dispatch('GET_PROFILE');
  },
  methods:{
    async send(){
      await this.$store.dispatch('SEND_MESSAGE');
      await this.getChat()
    },
    getChat(){
      this.$store.dispatch('GET_CHAT', this.$route.params.id);
    }
  },
  computed: {
    locationsTypes() {
      return this.$store.state.locationTypes
    },
    currentLocations() {
      if(this.currentRoom !== null){
        return this.$store.state.locations.filter(location => location.id === this.currentRoom.location)
      }
      return null
    },
    platforms() {
      return this.$store.state.platforms
    },
    games() {
      return this.$store.state.games
    },
    currentRoom(){
      return this.$store.state.currentPost
    },
    roomChat(){
      return this.$store.state.roomChat
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    message:{
      get(){
        return this.$store.state.message
      },
      set(value){
        this.$store.commit('setMessage', value);
      }
    }

  }
}
</script>

<style scoped>
.chat{
  background-color: #212121;
  border-radius: 3px;
  height: 500px;
}
</style>