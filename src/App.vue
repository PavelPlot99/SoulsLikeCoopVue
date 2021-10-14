<template>
  <v-app>
    <div v-if="!authorize" >
      <v-row justify="center">
        <v-col md="3">
          <v-img
              src="../public/soulsLike.png"
              lazy-src="../public/soulsLike.png"
              max-height="800"
              max-width="600"
          >
          </v-img>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col md="1">
          <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="ma-2"
                  outlined
                  color="white"
                  v-bind="attrs"
                  v-on="on"
              >Вход
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                    color="grey darken-3"
                    dark
                >Вход
                </v-toolbar>
                <v-card-text>
                  <!--форма-->
                  <div>
                    <v-text-field
                        label="Логин"
                        v-model="username"
                    ></v-text-field>
                    <v-text-field :type="'password'" label="Пароль" v-model="password"></v-text-field>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                      text
                      @click="login"
                  >Войти

                  </v-btn>

                  <v-btn
                      text
                      @click="dialog.value = false"
                  >Закрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>

        <v-col md="1">
          <v-dialog
              transition="dialog-bottom-transition"
              max-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="ma-2"
                  outlined
                  color="white"
                  v-bind="attrs"
                  v-on="on"
              >Регистрация
              </v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                    color="grey darken-3"
                    dark
                >Регистрация
                </v-toolbar>
                <v-card-text>
                  <!--форма-->
                  <div>
                    <v-text-field
                        label="Логин"
                        v-model="username"
                    ></v-text-field>
                    <v-text-field :type="'password'" label="Пароль" v-model="password"></v-text-field>
                  </div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                      text
                      @click="register"
                  >Регистрация

                  </v-btn>

                  <v-btn
                      text
                      @click="dialog.value = false"
                  >Закрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>

      </v-row>

    </div>

    <div v-if="authorize" fluid="true">
      <v-navigation-drawer
          app
          left
          temporary
          v-model="drawer"
          color="grey darken-4"
      >

        <v-list-item-group color="white">

          <v-list-item v-for="link in links" :key="link.id">
            <v-list-item-title>
              <router-link class="link" :to="link.href">{{ link.name }}</router-link>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="logout">
               Выход
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>

      </v-navigation-drawer>

      <v-app-bar app color="grey darken-4">
        <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
        <v-app-bar-title>
          <h3 class="text-h4 white--text">SoulLikeCoop</h3>
        </v-app-bar-title>

      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </div>
  </v-app>

</template>

<script>
export default {
  mounted() {
    document.title = 'Dark Souls';
    this.$store.dispatch('GET_CATALOG');
  },
  methods:{
    register(){
      this.$store.dispatch('REGISTER');
    },
    async login(){
      this.$router.push('/')
      await this.$store.dispatch('LOGIN');
      await this.$store.dispatch('GET_PROFILE')
    },
    logout(){
      this.$store.commit('setAuthorize',false)
      this.$store.commit('setToken', "")

    }
  },
  computed: {
    authorize() {
      return this.$store.state.authorize
    },
    username: {
      get() {
        return this.$store.state.username;
      },
      set(value) {
        this.$store.commit('setUserName', value);
      }
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        this.$store.commit('setPassword', value);
      }
    },
    drawer:{
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('setDrawer', value);
      }
    },
    links(){
      return this.$store.state.links
    }
  }
}
</script>
<style>
.link {
  text-decoration: none;
  color: white !important;
}
</style>