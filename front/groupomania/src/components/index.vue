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
              <v-row>
                <v-text-field
                v-model="email"
                :rules="emailRules"
                  label="Adresse Email"
                  name="Email"
                  prepend-icon="email"
                  type="text"
                  class="ma-2"
                  required
                ></v-text-field>
              </v-row>
              <v-row>
                <v-text-field
                v-model="password"
                :rules="passwordRules"
                  label="Mot de Passe"
                  name="password"
                  class="ma-2"
                  prepend-icon="lock"
                  required
                  type="password"
                ></v-text-field>
              </v-row>
              <v-row justify="center">
                <v-btn class="mt-4" outlined color="green" type="submit" value="Submit">Se connecter</v-btn>
              </v-row>
            </v-col>
          </v-container>
        </v-form>

        <v-row justify="center">
      <div class="mt-8">
      <v-btn text color="error" to="./recover">Impossible de se connecter ?</v-btn>
      </div>
      </v-row>
  </v-container>
  
</template>

<script>
import indexhead from './indexhead'
import swal from 'sweetalert'

  export default {
    data: () => ({
      email: '',
      emailRules: [
        v => !!v || 'Adresse email requise !',
        v => /.+@.+\..+/.test(v) || 'Merci de bien vouloir renseigner une adresse email valide',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Mot de passe requis !',
      ],
    }),
    methods: {
    formSubmit(e) {
    e.preventDefault();
    this.axios.post('http://localhost:3000/login', {
    email: this.email,
    password: this.password,
  })
  .then(response => {
    // Handle success.
    localStorage.setItem('jwt', JSON.stringify(response.data.data))
    console.log(localStorage)
    console.log(response)
    this.$router.push('/mainPage')
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
    swal('Adresse email ou mot de passe incorrect !', "", "error")
  })
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
