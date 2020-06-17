<template>
  <v-container>
    <indexhead/>

        <v-tabs grow class="elevation-2" background-color="white">
          <v-tab to="/">Connexion</v-tab>
          <v-tab to="./register">Inscription</v-tab>
        </v-tabs>
        <v-form>
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
                <v-btn class="mt-4" outlined color="green" to="/mainPage">Se connecter</v-btn>
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
      validate () {
        this.$refs.form.validate()
      },
    },
    components: {
      indexhead
    },
    props: {
      source: String
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
