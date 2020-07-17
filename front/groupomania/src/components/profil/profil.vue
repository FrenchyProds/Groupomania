<template height="80vh">
    <v-container>
        <v-list-item two-line>
            <v-list-item-avatar size="100px">
                <v-img :src="(url) || 'https://picsum.photos/300/200?random'"
                contain/>
            </v-list-item-avatar>
            <v-list-item-content class="text-center">
                <v-list-item-subtitle class="headline mb-1 text-capitalize">{{user.username}}</v-list-item-subtitle>
                <v-list-item-subtitle class="headline">{{profil.firstName || 'Prénom'}} {{profil.lastName || 'Nom'}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-tabs grow class="elevation-2" background-color="white">
                <v-tab>Préferences</v-tab>
                <v-tab>Historique</v-tab>
        </v-tabs>

    <v-divider></v-divider>

    <v-card>
        <v-row class="text-center">
            <v-col cols="4">
                Email :
            </v-col>
            <v-col>
                {{user.email}}
            </v-col>
        </v-row>
    </v-card>

<v-form ref="form" @submit="depSubmit">
    <v-card class="my-2">
        <v-row class="text-center ml-1">
            <v-col cols="4">
                Département :
            </v-col>
            <v-col>
                {{profil.departement}}
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="11">
                <v-text-field placeholder="Modifier" input="text" v-model="departement">
                </v-text-field>
            </v-col>
        </v-row>
        <v-card
            flat
            tile
            width="100%"
            class="white text-center">
            <v-card-text class="d-flex justify-space-around">
            

                <v-tooltip top> 
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on">
                        <div class="btn-flex">
                            <v-icon size="24px" v-if="!null" type="submit" value="Submit" color="green">mdi-checkbox-marked-circle</v-icon>
                            Confirmer
                        </div>
                        </v-btn>
                    </template>
                    <span>Confirmer</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on">
                        <div class="btn-flex">
                            <v-icon size="24px" color="red">mdi-close-circle</v-icon>
                            Annuler
                        </div>
                        </v-btn>
                    </template>
                    <span>Annuler</span>
                </v-tooltip>
            </v-card-text>
         </v-card>
    </v-card>
    </v-form> 

    <v-card class="d-flex my-2">
        <v-row class="align-center mx-3">
            <v-col cols="8">
                Mode Sombre
            </v-col>
            <v-col cols="4">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on" v-if="!null" type="submit" value="Submit">
                        <div class="btn-flex">
                            <v-icon size="24px" color="black">mdi-lightbulb</v-icon>
                            Activer
                        </div>
                        </v-btn>
                    </template>
                    <span>Passer en mode sombre</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="d-flex my-2">
        <v-row class="align-center mx-3">
            <v-col cols="8">
                Modifier mon avatar
            </v-col>
            <v-col cols="4">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on">
                        <div class="btn-flex">
                            <v-icon size="24px" color="red">mdi-folder</v-icon>
                            Modifier
                        </div>
                        </v-btn>
                    </template>
                    <span>Modifier mon avatar</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-card>

    <v-card class="my-2">
        <v-row class="text-center ml-1">
            <v-col cols="12">
                Modifier mon mot de passe
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="11">
                <v-text-field placeholder="Nouveau mot de passe">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="11">
                <v-text-field placeholder="Confirmer le nouveau mot de passe">
                </v-text-field>
            </v-col>
        </v-row>
        <v-card
            flat
            tile
            width="100%"
            class="white text-center">
            <v-card-text class="d-flex justify-space-around">
        <v-tooltip top> 
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on">
                        <div class="btn-flex">
                            <v-icon size="24px" v-if="!null" type="submit" value="Submit" color="green">mdi-checkbox-marked-circle</v-icon>
                            Confirmer
                        </div>
                        </v-btn>
                    </template>
                    <span>Confirmer</span>
                </v-tooltip>
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on">
                        <div class="btn-flex">
                            <v-icon size="24px" color="red">mdi-close-circle</v-icon>
                            Annuler
                        </div>
                        </v-btn>
                    </template>
                    <span>Annuler</span>
                </v-tooltip>
            </v-card-text>
        </v-card>
    </v-card>

    

    <v-card class="d-flex my-2">
        <v-row class="align-center mx-3">
            <v-col cols="8">
                Supprimer mon compte
            </v-col>
            <v-col cols="4">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        icon v-bind="attrs" v-on="on">
                        <div class="btn-flex">
                            <v-icon size="24px" color="red">mdi-delete-circle</v-icon>
                            Supprimer
                        </div>
                        </v-btn>
                    </template>
                    <span>Supprimer mon compte</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-card>

<div class="clear"></div>
    
        <foot/>
    </v-container>
</template>

<script>

import foot from '../foot'
const userMe = 'http://localhost:1337/users/me';
// let tokenFetch = JSON.parse(localStorage.getItem('jwt'));
// console.log(tokenFetch)

export default {
    data() {
        return {
        user: [],
        url: '',
        profil: [],
        departement: '',
        // darkMode: '',
        // password: '',
        // passwordConf: '',
        }
    },
    mounted() {
          this.axios.get(userMe,  {
            // headers: {
            // Authorization: `Bearer ${tokenFetch}`,
            // },
        }).then(res => {
                this.user = res.data
                this.url = res.data.avatar.content.url
                this.profil = res.data.profil
                console.log(this.profil)
                console.log(res.data)
          });
        },
        methods: {
            depSubmit(e) {
            e.preventDefault();
            this.axios.put(userMe, {
            departement: this.departement,
            // headers: {
            // Authorization: `Bearer ${tokenFetch}`,
            // },
        })
        .then(response => {
            // Handle success.
            console.log('username successfully updates !', response)
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
        })
        }
        },
    headers: {
    // Authorization:
    //   'Bearer' + tokenFetch,
  },
    name: 'profil',
    components: {
        foot,
    }
}
</script>

<style scoped>

.v-divider {
    margin: 1rem 0rem;
}

.theme--light.v-input{
    margin-left: 1rem;
}

.clear { clear: both; height: 150px; }

</style>