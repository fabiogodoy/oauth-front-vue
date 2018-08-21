// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'

// todo
// cssVars()

Vue.use(BootstrapVue)

Vue.mixin({
  data(){
    return{
      get backendUrl(){
        //dev
        return "http://localhost:8181/oauth/token?grant_type=password"
      },
      get authorizationHeader(){
        //dev
        return 'Basic d2ViOnNlY3JldA=='
      }
    }
  }
})

  router.beforeEach((to, from, next) => {

    if (to.name == 'Login' || to.path == '/'){
      next()
    } else {
        if (!store.getters.isAuthenticated){
          next('/')
        } else {
          next()
        }
    }

  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
