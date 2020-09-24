<template>
  <v-container>
    <indexhead/>

        <v-tabs grow class="elevation-2" background-color="white">
          <v-tab to="/">Connexion</v-tab>
          <v-tab to="./register">Inscription</v-tab>
        </v-tabs>
        <v-form ref="form" @submit="formSubmit">
          <v-container>
            <v-col>
              <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                  <span class="red--text" v-if="!$v.email.required">Adresse email requise</span>
                  <span class="red--text" v-if="!$v.email.email">Adresse email invalide</span>
              </div>
              <v-row>
                <v-text-field
                   v-model="email"
                  label="Adresse Email"
                  name="Email"
                  prepend-icon="email"
                  type="email"
                  class="ma-2"
                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                  required
                ></v-text-field>
              </v-row>
              <div v-if="submitted && $v.password.$error" class="invalid-feedback">
              <span class="red--text" v-if="!$v.password.required">Mot de passe requis</span>
              </div>
              <v-row>
                <v-text-field
                v-model="password"
                  label="Mot de Passe"
                  name="password"
                  class="ma-2"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                  prepend-icon="lock"
                  required  
                  :type="passwordFieldType"
                ></v-text-field>
                <v-btn icon v-if="passwordFieldType === 'password'" @click="toggleShow" class="green--text"><v-icon>mdi-eye</v-icon></v-btn>
                <v-btn icon v-if="passwordFieldType != 'password'" @click="toggleShow" class="red--text"><v-icon>mdi-eye-off</v-icon></v-btn>
              </v-row>
              <v-row justify="center">
                <v-btn class="mt-4" outlined color="#067A47" type="submit" value="Submit">Se connecter</v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-form>

        <v-row justify="center">
      <div class="mt-8">
      <v-btn text color="#C43F17" to="./recover">Impossible de se connecter ?</v-btn>
      </div>
      </v-row>
  </v-container>
  
</template>

<script>
import indexhead from '../headers/indexhead'
import swal from 'sweetalert'
import { required, email } from "vuelidate/lib/validators";


  export default {
    data() {
      return {
        email: '',
        password: '',
        submitted: false,
        passwordFieldType: 'password',
      }
    },
    validations: {
                email: { required, email },
                password: { required },
        },
    methods: {
    formSubmit(e) {
    e.preventDefault();
    this.submitted = true;
    this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
    this.axios.post('http://localhost:3000/login', {
    email: this.email,
    password: this.password,
  })
  .then(response => {
    // Handle success.
    localStorage.setItem('jwt', JSON.stringify(response.data.token))
    this.$router.push('/mainPage')
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
    swal('Adresse email ou mot de passe incorrect !', "", "error")
  })
},
      toggleShow() {
          this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
      },
      validate () {
        this.$refs.form.validate()
      },
    },
    components: {
      indexhead
    },
    name: 'index',
  }
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 3rem;
}
</style>

<style>
.invalid-feedback {
  text-align: center
}
</style>
