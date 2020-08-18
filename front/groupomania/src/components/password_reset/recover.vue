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
                type="email"
                label="email"
                class="ma-2"
                :class="{ 'is-invalid': submitted && $v.email.$error }"
                prepend-icon="email"
                required
              ></v-text-field>
            </v-row>
            <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span class="red--text" v-if="!$v.email.required">Adresse email requise</span>
                <span class="red--text" v-if="!$v.email.email">Adresse email invalide</span>
            </div>
            <v-row justify="center">
              <v-btn class="my-4" outlined color="green" @click="resetPass()" :disabled="emailReq">M'envoyer un nouveau mot de passe</v-btn>
            </v-row>
            <v-row justify="center">
              <v-btn class="my-8" outlined color="error" to="/">Annuler</v-btn>
            </v-row>
            </v-col>
        </v-container>
      </v-form>

    </v-container>
</template>

<script>

import indexhead from '../headers/indexhead'
import { required, email } from "vuelidate/lib/validators";

  export default {
    data: () => ({
      email: '',
      submitted: false,
    }),
        validations: {
                email: { required, email },
        },
    methods: {
      resetPass() {
        this.submitted = true;
        this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
          localStorage.setItem('email', JSON.stringify(this.email));
          this.$router.push({ name: 'resetConfirmation'})
      },
    },
    computed: {
      emailReq () {
        return !this.email;
        }
      },
    components: {
      indexhead
    },
    name: 'recover',
  }
</script>