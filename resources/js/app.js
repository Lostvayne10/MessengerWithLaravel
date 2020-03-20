/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('./bootstrap');

window.Vue = require('vue');

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.component('contact-component', 
require('./components/ContactComponent.vue').default);

Vue.component('contact-list-component', 
require('./components/ContactListComponent.vue').default);

Vue.component('active-conversation-component', 
require('./components/ActiveConversationComponent.vue').default);

Vue.component('message-conversation-component', 
require('./components/MessageConversationComponent.vue').default);



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    methods: {
        logout(){
            document.getElementById('logout-form').submit();
        }
    }
});
