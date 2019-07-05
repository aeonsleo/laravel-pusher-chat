/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import VueChatScroll from 'vue-chat-scroll'

window.Vue = require('vue');
Vue.use(VueChatScroll);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('message', require('./components/Message.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data() {
        return {
            message: null,
            chat: {
                messages: [],
                users: [],
                color: []
            }
        }
    },
    methods: {
        send() {
            if(this.message) {
                this.chat.messages.push(this.message)
                this.chat.users.push('You')
                this.chat.color.push('success')

                axios.post('/send', {
                    message: this.message
                  })
                  .then((response) => {
                    // console.log(response)
                    this.message = null
                  })
                  .catch((error) => {
                    console.log(error)
                  });
                
            }
        }
    },
    mounted() {
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.messages.push(e.message)
                this.chat.users.push(e.user.name)
                this.chat.color.push('warning')
                // console.log(e);
            });        
    }
});
