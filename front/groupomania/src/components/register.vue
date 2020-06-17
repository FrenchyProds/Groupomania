<template>
  <v-container>
   <indexhead/>
    <v-tabs grow right class="elevation-2" background-color="white">
      <v-tab to="/">Se connecter</v-tab>
      <v-tab to="/register">Créer un compte</v-tab>
     </v-tabs>
      <v-form ref="form"
      lazy-validation>
        <v-container>
          <v-col>
            <v-row>
              <v-text-field
              v-model="firstName"
              :rules="firstnameRules"
              :counter="20"
                label="Prénom"
                class="ma-2"
                required
                prepend-icon="account_circle"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="lastName"
              :rules="lastnameRules"
              :counter="20"
              prepend-icon="account_circle"
                label="Nom"
                class="ma-2"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="email"
              :rules="emailRules"
                label="Adresse Email"
                class="ma-2"
                required
                prepend-icon="email"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="emailConfirmation"
              :rules="emailConfRules"
                label="Confirmez votre Adresse Email"
                class="ma-2"
                required
                prepend-icon="email"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="password"
              :rules="passwordRules"
                label="Mot de Passe"
                class="ma-2"
                required
                type="password"
                prepend-icon="lock"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
              v-model="passwordConfirmation"
              :rules="passwordConfRules"
                label="Confirmez votre Mot de Passe"
                class="ma-2"
                required
                type="password"
                prepend-icon="lock"
              ></v-text-field>
            </v-row>
            <v-row justify="center">
              <v-btn class="mt-4" outlined color="green" to="/">Valider</v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>

  </v-container>
  

        
</template>

<script>

import indexhead from './indexhead'

  export default {
    name: 'register',
    data: () => ({
      firstName: '',
      valid: true,
      firstnameRules: [
        v => !!v || 'Prénom requis !',
        v => (v && v.length <= 20) || 'Merci de vous limiter à 20 caractères',
      ],
      lastName: '',
      lastnameRules: [
        v => !!v || 'Nom de famille requis !',
        v => (v && v.length <= 20) || 'Merci de vous limiter à 20 caractères',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Adresse email requise !',
        v => /.+@.+\..+/.test(v) || 'Merci de bien vouloir renseigner une adresse email valide',
      ],
      emailConfirmation: '',
      emailConfRules: [
        v => !!v || "Merci de bien vouloir confirmer votre adresse email",
        v => v ==! v-1 || 'Les adresses email sont différentes !'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Mot de passe requis !',
      ],
      passwordConfirmation: '',
      passwordConfRules: [
        v => !!v || 'Merci de bien vouloir confirmer votre mot de passe',
        v => v ==! v-1|| 'Les mots de passe sont differents !'
      ]
    }),
    components: {
      indexhead
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>