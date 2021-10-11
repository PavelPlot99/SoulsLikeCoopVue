import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        links: [
            {
                id: 1,
                name: 'Список комнат',
                href: '/',
            },
            {
                id: 2,
                name: 'Создать комнату',
                href: '/createRoom',
            }
        ],

        authorize: false,
        token: null,
        username: null,
        password: null,
        drawer: false,
        url: "http://soulslikecoop.com:8081/api/v1",
        games:{},
        platforms:{},
        locationTypes:{},
        locations:{}
    },
    mutations: {
        setDrawer: (state, drawer) => {
            state.drawer = drawer;
        },
        setUserName: (state, username) => {
            state.username = username;
        },
        setPassword: (state, password) => {
            state.password = password;
        },
        setToken: (state, token) => {
            state.token = token;
        },
        setAuthorize: (state, flag) => {
            state.authorize = flag;
        },
        setPlatforms: (state, platforms) => {
            state.platforms = platforms;
        },
        setTypesLocation: (state, types) => {
            state.locationTypes = types;
        },
        setLocations: (state, locations) => {
            state.locations = locations;
        },
        setGames: (state, games) => {
            state.games = games;
        }
    },
    actions: {
        REGISTER: async (context) => {
            let dataRegister = {
                username: context.state.username,
                password: context.state.password,
            }

            let {data} = await axios
                .post(context.state.url + '/auth/register',
                    {
                        username:dataRegister.username,
                        password:dataRegister.password
                    },
                    {
                        'Content-Type': 'application/json'
                    })
            console.log(data);
            // context.commit('setAuthorize',true)
            // context.commit('setToken', data.token)
            context.dispatch('RESET_FORM');
        },
        LOGIN: async (context) => {
            let dataLogin = {
                username: context.state.username,
                password: context.state.password,
            }

            let {data} = await axios
                .post(context.state.url + '/auth/login',
                    {
                        username:dataLogin.username,
                        password:dataLogin.password
                    },
                    {
                        'Content-Type': 'application/json'
                    })
            console.log(data);
            context.commit('setAuthorize',true)
            context.commit('setToken', data.token)
            context.dispatch('RESET_FORM');
        },

        RESET_FORM: async (context) => {
            context.commit('setUserName', null);
            context.commit('setPassword', null);
        },
        GET_CATALOG: async  (context) => {
            let {data} = await axios
                .get(context.state.url + '/catalog/',{headers:{'language-code':'ru'}});

            context.commit('setGames',data.games);
            context.commit('setLocations',data.locations);
            context.commit('setPlatforms', data.platforms);
            context.commit('setTypesLocation', data.locationTypes);

        }
    },
    modules: {}
})
