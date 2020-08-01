<template>
    <v-container max-height="400px">
    <v-card>
        <v-footer fixed>
            <v-tabs grow class="elevation-2" background-color="white">
                <v-tab to="./groupogag">GroupoGag</v-tab>
                <v-tab to="./groupodiscute">GroupoDiscute</v-tab>
            </v-tabs>
            <v-card
            flat
            tile
            width="100%"
            class="red text-center">
            <v-card-text class="d-flex justify-space-around">

                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn  v-if="!mainPage()"
                icon to="/mainPage" v-bind="attrs"
                    v-on="on">
                    <div class="btn-flex">
                    <v-icon size="24px" color="white">mdi-home</v-icon>
                    Acceuil
                    </div>
                </v-btn>
                </template>
                <span>Retourner à l'acceuil</span>
                </v-tooltip>

                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="!profil()"
                icon @click="goToProfile()" v-bind="attrs"
                    v-on="on">
                    <div class="btn-flex">
                    <v-icon size="24px" color="white">mdi-account</v-icon>
                    Profil
                    </div>
                </v-btn>
                </template>
                <span>Accéder à votre profil</span>
                </v-tooltip>

                

                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                icon to="/_id/inbox" v-bind="attrs" v-on="on">
                <div class="btn-flex">
                    <v-icon size="24px" color="white">mdi-comment</v-icon>
                    Inbox
                </div>
                </v-btn>
                </template>
                <span>Accéder à votre messagerie</span>
                </v-tooltip>
                
                <v-menu bottom :offset-y="true" :close-on-content-click="closeOnContentClick">
                    <template v-slot:activator="{ on, attrs }">
                <v-btn
                icon
                v-on="on"
                v-bind="attrs">
                <div class="btn-flex">
                    <v-icon size="24px" color="white">mdi-close-circle</v-icon>
                    Logout  
                </div>
                </v-btn>
                    </template>
                <v-btn @click="logoff"><v-icon left>mdi-close-circle</v-icon>Se déconnecter</v-btn>
            </v-menu>
            </v-card-text>    
            </v-card>
        </v-footer>
    </v-card>
    </v-container>
</template>

<script>

let userId = JSON.parse(localStorage.getItem('id'))


export default {
    data: () => ({
      icons: [
        'mdi-account',
        'mdi-home',
        'mdi-comment',
      ],
      id: userId,
      closeOnContentClick: true,
    }),
    components: {
    },
    methods: {
      mainPage() {
      if(this.$route.path == "/mainPage") {
          return true
        }
      },
      profil() {
      if(this.$route.path == "/myprofile/") {
          return true
        }
      },
      logoff() {
          localStorage.clear();
          sessionStorage.clear();
          delete this.axios.defaults.headers.common["Authorization"];
          this.$router.push('/');
      },
      goToProfile() {
          this.$router.push({name: 'profil', params: {id:userId}})
      }
    },
    name: 'foot'
}
</script>

<style scoped>
.btn-flex {
    display: flex;
    flex-direction: column;
    color: white;
    align-items: center;
    font-size: 0.7rem;
}
</style>