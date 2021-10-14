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
        currentUser:null,
        authorize: false,
        token: null,
        username: null,
        password: null,
        drawer: false,
        url: "http://soulslikecoop.com:8081/api/v1",
        games: {},
        platforms: {},
        locationTypes: {},
        locations: {},
        posts: {},
        createRoom: {
            postType: "HELP",
            game: null,
            platform: null,
            locationType: null,
            location: null,
            gamePassword: "",
            description: "",
        },
        currentPost:null,
        roomChat:null,
        message:null,
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
        },
        setPosts: (state, posts) => {
            state.posts = posts;
        },
        setRoom: (state,room) => {
            state.currentPost = room;
        },
        setRoomChat: (state, chat) => {
            state.roomChat = chat;
        },
        setCurrentUser: (state, user) => {
            state.currentUser = user
        },
        setMessage: (state, message) => {
            state.message = message
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
                        username: dataRegister.username,
                        password: dataRegister.password
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
                        username: dataLogin.username,
                        password: dataLogin.password
                    },
                    {
                        'Content-Type': 'application/json'
                    })
            context.commit('setAuthorize', true)
            context.commit('setToken', data.token)
            context.dispatch('RESET_FORM');
        },

        RESET_FORM: async (context) => {
            context.commit('setUserName', null);
            context.commit('setPassword', null);
        },
        GET_CATALOG: async (context) => {
            let {data} = await axios
                .get(context.state.url + '/catalog/', {headers: {'language-code': 'ru'}});

            context.commit('setGames', data.games);
            context.commit('setLocations', data.locations);
            context.commit('setPlatforms', data.platforms);
            context.commit('setTypesLocation', data.locationTypes);

        },
        GET_POSTS: async (context) => {
            let {data} = await axios
                .get(context.state.url + '/posts')

            context.commit('setPosts', data);
        },
        CREATE_POST: async (context) => {
            let {data} = await axios
                .post(context.state.url + '/post/', {
                    postType: context.state.createRoom.postType,
                    game: context.state.createRoom.game,
                    platform: context.state.createRoom.platform,
                    locationType: context.state.createRoom.locationType,
                    location: context.state.createRoom.location,
                    gamePassword: "123asd12",
                    description: context.state.createRoom.description,
                    id:"",
                }, {
                    'Content-Type': 'application/json',
                    headers: {
                        'Authorization': context.state.token
                    }
                })
            console.log(data)
        },
        GET_ROOM: async (context, id) => {
            let {data} = await  axios
                .get(context.state.url + '/post/' + id, {
                    headers:{
                        'Authorization': context.state.token
                    }
                })
            context.commit('setRoom', data)
        },
        GET_CHAT: async (context, id) => {
            let {data} = await  axios
                .get(context.state.url + '/chat/' + id + '/', {
                    headers:{
                        'Authorization': context.state.token
                    }
                })
            console.log(data)
          context.commit('setRoomChat', data)
        },
        GET_PROFILE: async (context) => {
            let {data} = await axios
                .get(context.state.url + '/profile/', {
                    headers:{
                        'Authorization': context.state.token
                    }
                })
            console.log(data);
            context.commit('setCurrentUser', data)
        },
        SEND_MESSAGE: async (context) => {

            var abc = "abcdefghijklmnopqrstuvwxyz";
            var rs = "";
            while (rs.length < 6) {
                rs += abc[Math.floor(Math.random() * abc.length)];
            }
            let {data} = await axios
                .post(context.state.url + '/chat/', {
                    id:rs,
                    post: context.state.currentPost.id,
                    message: context.state.message
                },{
                    headers:{
                        'Authorization': context.state.token
                    }
                })
            console.log(data);
            context.state.message = null
        }

    },
    modules: {}
})
