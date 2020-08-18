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
            <div v-if="submitted && $v.username.$error" class="invalid-feedback">
                <span v-if="!$v.username.required">Nom d'utilisateur requis</span>
                <span v-if="!$v.username.minLength">Votre nom d'utilisateur doit faire au moins 4 caractères de long</span>
            </div>
            <v-row>
              <v-text-field
              v-model="username"
              prepend-icon="account_circle"
                label="Nom d'utilisateur"
                class="ma-2"
                :class="{ 'is-invalid': submitted && $v.username.$error }"
                required
              ></v-text-field>
            </v-row>
            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">Adresse email requise</span>
                <span v-if="!$v.email.email">Adresse email invalide</span>
            </div>
            <v-row>
              <v-text-field
                v-model="email"
                label="Adresse Email"
                class="ma-2"
                :class="{ 'is-invalid': submitted && $v.username.$error }"
                required
                prepend-icon="email"
              ></v-text-field>
            </v-row>
            <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                <span v-if="!$v.password.required">Mot de passe requis</span>
                <span v-if="!$v.password.minLength">Votre mot de passe doit faire au moins 8 caractères</span>
            </div>
            <v-row>
              <v-text-field
              v-model="password"
                label="Mot de Passe"
                class="ma-2"
                :class="{ 'is-invalid': submitted && $v.password.$error }"
                required
                :type="passwordFieldType"
                prepend-icon="lock"
              ></v-text-field>
              <v-btn icon v-if="passwordFieldType === 'password'" @click="toggleShow" class="green--text"><v-icon>mdi-eye</v-icon></v-btn>
              <v-btn icon v-if="passwordFieldType != 'password'" @click="toggleShow" class="red--text"><v-icon>mdi-eye-off</v-icon></v-btn>
            </v-row>
            <div v-if="submitted && $v.passwordConf.$error" class="invalid-feedback">
                  <span v-if="!$v.passwordConf.required">Confirmation de mot de passe requise</span>
                  <span v-else-if="!$v.passwordConf.sameAsPassword">Les mots de passe doivent être identiques</span>
              </div>
             <v-row>
              <v-text-field
              v-model="passwordConf"
                label="Confirmation du Mot de Passe"
                class="ma-2"
                :class="{ 'is-invalid': submitted && $v.passwordConf.$error }"
                required
                :type="passwordFieldTypeConf"
                prepend-icon="lock"
              ></v-text-field>
              <v-btn icon v-if="passwordFieldTypeConf === 'password'" @click="toggleShowConf" class="green--text"><v-icon>mdi-eye</v-icon></v-btn>
              <v-btn icon v-if="passwordFieldTypeConf != 'password'" @click="toggleShowConf" class="red--text"><v-icon red>mdi-eye-off</v-icon></v-btn>
            </v-row>
            <v-row justify="center">
              <v-btn type="submit" value="Submit" class="mt-4" outlined color="green" :disabled='isComplete'>Valider</v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>

  </v-container>
  

        
</template>

<script>

import indexhead from '../headers/indexhead'
import swal from 'sweetalert'
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

const registerUrl = 'http://localhost:3000/register'

  export default {
    name: 'register',
    data: () => ({
      username: '',
      email: '',
      password: "",
      passwordConf:'',
      passwordFieldType: 'password',
      passwordFieldTypeConf: 'password',
      submitted: false,
    }),
    validations: {
                username: { required, minLength: minLength(4) },
                email: { required, email },
                password: { required, minLength: minLength(8) },
                passwordConf: { required, sameAsPassword: sameAs('password') }
        },
    methods: {
          formSubmit(e) {
          e.preventDefault();
          this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
          this.axios.post(registerUrl
          ,{
           username: this.username,
           email: this.email,
           password: this.password })
          .then(response => {
            // Handle success.
            console.log(response)
            swal('Compte crée !', 'Bienvenue sur le réseau social Groupomania', 'success')
            this.$router.push('/')
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
            swal("Quelque chose n'a pas fonctionné", "", "error")
          })
          },
           toggleShow() {
          this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
          },
           toggleShowConf() {
          this.passwordFieldTypeConf = this.passwordFieldTypeConf === 'password' ? 'text' : 'password';
          },
          validate () {
        this.$refs.form.validate()
      },
        },
        computed: {
          isComplete () {
            return !this.username || !this.email || !this.password || !this.passwordConf;
            }
        },
    components: {
      indexhead
    },
  }
</script>

<style>
span {
  color: red;
}
</style>