<template>
  <v-container>
   <indexhead/>
    <v-tabs grow right class="elevation-2" background-color="white">
      <v-tab to="/">Se connecter</v-tab>
      <v-tab to="/register">Créer un compte</v-tab>
     </v-tabs>
      <v-form ref="form"
      lazy-validation @submit="formSubmit">
        <v-container>
          <v-col>
            <v-row>
              <v-text-field
              v-model="username"
              prepend-icon="account_circle"
                label="Nom d'utilisateur"
                class="ma-2"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="email"
                label="Adresse Email"
                class="ma-2"
                required
                prepend-icon="email"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="password"
                label="Mot de Passe"
                class="ma-2"
                required
                type="password"
                prepend-icon="lock"
              ></v-text-field>
            </v-row>
            <v-row justify="center">
              <v-btn type="submit" value="Submit" class="mt-4" outlined color="green">Valider</v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>

  </v-container>
  

        
</template>

<script>

import indexhead from './indexhead'
import swal from 'sweetalert'

const registerUrl = 'http://localhost:3000/register'

  export default {
    name: 'register',
    data: () => ({
      username: '',
      email: '',
      password: "",
    }),
    methods: {
          formSubmit(e) {
          e.preventDefault();
          this.axios.post(registerUrl
          ,{
           username: this.username,
           email: this.email,
           password: this.password })
          .then(response => {
            // Handle success.
            localStorage.setItem('jwt', JSON.stringify(response.data.jwt))
            swal('Compte crée !', 'Bienvenue sur le réseau social Groupomania', 'success')
            this.$router.push('/')
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
            swal('Oops !', "Quelque chose n'a pas fonctionné", "alert")
          })
          },
          validate () {
        this.$refs.form.validate()
      },
        },
    components: {
      indexhead
    },
  }
</script>