<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="10" sm="12">
          <b-alert :show="dismissErrorCountDown"
                       dismissible
                       variant="danger"
                       @dismissed="dismissErrorCountDown=0"
                       @dismiss-count-down="errorCountDownChanged">
              <p v-for="m in message" v-html="">
                <span v-html="m"></span>
              </p>
                 <strong>{{dismissErrorCountDown}}</strong> segundos...
          </b-alert>

          <b-alert :show="dismissSuccessCountDown"
                       dismissible
                       variant="success"
                       @dismissed="dismissSuccessCountDown=0"
                       @dismiss-count-down="successCountDownChanged">
              <p v-for="m in message">
                {{m}}
              </p>
                 <strong>{{dismissSuccessCountDown}}</strong> segundos...
          </b-alert>
              
        </b-col>
        <b-col md="10" sm="12">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Acesse sua conta</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend><b-input-group-text>@</b-input-group-text></b-input-group-prepend>
                  <input type="text" class="form-control" placeholder="Email" v-model="credentials.username">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="Senha" v-model="credentials.password">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" @click="login">Acessar</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Esqueceu sua senha?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="p-4">
            <b-card-body>
              <h4>Registre-se</h4>
              <p class="text-muted">Crie sua conta</p>
              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" placeholder="Nome" v-model="user.name">
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <input type="text" class="form-control" placeholder="Email" v-model="user.username">
              </b-input-group>

              <b-input-group class="mb-3">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" class="form-control" placeholder="Senha" v-model="user.password">
              </b-input-group>

              <b-input-group class="mb-4">
                <b-input-group-prepend>
                  <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                </b-input-group-prepend>
                <input type="password" class="form-control" placeholder="Confirmar Senha" v-model="user.confirmation">
              </b-input-group>

              <b-button variant="success" block @click="register">Registrar</b-button>
            </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const qs = require('qs')

const userApi = "http://localhost:8181/api-v1/user/"

export default {
  name: 'Login',
  data () {
    return{
      user: {},
      credentials: [],
      dismissSecs: 10,
      dismissErrorCountDown: 0,
      dismissSuccessCountDown: 0,
      message: []
     
    }
  },
  methods:{
    login: function (){

      let self = this

      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : this.authorizationHeader
          },
        data: qs.stringify(this.credentials),
        url: this.backendUrl
      }

      axios(options).then(function(response){
        
        let token = response.data.access_token

        if (token){
          self.$store.commit('STORE_TOKEN', token)
          self.$router.push('/dashboard');
        }
      })
      .catch( (error) =>{
        console.log(error)
        if (error.data){
          let m = error.response.data.error_description
          self.message[0] = m
          self.showAlert(true)
        }
        
      })
    },
    register: function(){
      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        data: JSON.stringify(this.user),
        url: userApi
      }

      let self = this

      axios(options).then(response => {
        
        let res = response.data

        if (!res.success){
          self.showAlert(true)
        } else {
          self.showAlert(false)
          self.user = {}
        }
        self.message = res.message
      })
    },
    errorCountDownChanged (dismissCountDown) {
      this.dismissErrorCountDown = dismissCountDown
    },
    successCountDownChanged (dismissCountDown) {
      this.dismissSuccessCountDown = dismissCountDown
    },
    showAlert (withError) {
      if (withError){
        this.dismissErrorCountDown = this.dismissSecs
      } else {
        this.dismissSuccessCountDown = this.dismissSecs
      }
    }
  }
}
</script>
