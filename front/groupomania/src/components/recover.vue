<template>
    <v-container>
        <indexhead/>
            
        <v-form>
        <v-container>
          <v-col>
            <v-row>
              <h3 class="my-5" align="center">Merci de bien vouloir renseigner l'adresse email avec laquelle vous avez crée votre compte</h3>
              <v-text-field
              v-model="email"
              :rules="emailRules"
                label="email"
                class="ma-2"
                prepend-icon="email"
                required
              ></v-text-field>
            </v-row>
            <v-row justify="center">
              <v-btn class="my-4" outlined color="green" to="/recover/resetConfirmation">M'envoyer un nouveau mot de passe</v-btn>
            </v-row>
            <v-row justify="center">
              <v-btn class="my-8" outlined color="error" to="/">Annuler</v-btn>
            </v-row>
            </v-col>
        </v-container>
      </v-form>

    </v-container>
</template>

})

<script>

import indexhead from './indexhead'

  export default {
    data: () => ({
      firstName: '',
      valid: true,
      firstnameRules: [
        v => !!v || 'Prénom requis !',
        v => (v && v.length <= 10) || 'Merci de vous limiter à 20 caractères',
      ],
      lastName: '',
      lastnameRules: [
        v => !!v || 'Nom de famille requis !',
        v => (v && v.length <= 10) || 'Merci de vous limiter à 20 caractères',
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

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
    components: {
      indexhead
    },
    name: 'recover',
  }
</script>