<template>
    <v-container>
        <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src='../../assets/icon-left-font-monochrome-black.png'
          class="my-1"
          contain
          height="200"
        />
      </v-col>
    </v-row>
        <v-row class="text-center">
            <p class="ma-5">Nous avons envoyé un nouveau mot de passe à l'adresse email <span class="blue--text">{{this.email}}</span></p>
            <p class="ma-5">Merci de le modifier au plus vite et de vous assurer que votre nouveau mot de passe
                soit sécurisé.
            </p>
        </v-row>
        <v-row justify="center">
            <v-btn class="my-4" outlined color="green" to="/"><v-icon left>home</v-icon>Revenir à l'accueil</v-btn>
        </v-row>
    </v-container>
</template>

<script>

export default {
    data: () => ({
        email: ''
    }),
    mounted() {
    if(localStorage) {
        this.email = JSON.parse(localStorage.getItem('email'))
        }
    },
    name: 'resetConfirmation',
}
</script>

<style scoped>

p {
    font-size: 1.4rem;
    font-weight: 700;
}

</style>