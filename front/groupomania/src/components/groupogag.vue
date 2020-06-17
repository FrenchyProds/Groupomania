<template>
    <v-container>
        <mainhead/>
        <v-select :items="items" label="Trier par :" filled>
        </v-select>
        <v-card class="text-center">
            <router-link to="./groupogag/post"><v-card-title background-color="lightgrey">Title of the post</v-card-title>
            <v-img src="https://picsum.photos/300/200?random" aspect-ratio="1.7"></v-img>
            </router-link>
            <v-divider></v-divider>
            <v-card-text>
                Created by <router-link to="./profile/username"><span font-weight="500">insertNameHere</span></router-link> - 5 hours ago
            </v-card-text>
            <v-card d-flex>
                <v-card-text class="text-truncate" background-color="grey">

                <div class="likes">
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon color="green">mdi-arrow-up-bold</v-icon>25</v-btn>
                    </template>
                    <span>J'aime !</span>
                    </v-tooltip>
                </div>

                <div class="dislikes">
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon>mdi-arrow-down-bold</v-icon></v-btn>
                    </template>
                    <span>J'aime pas !</span>
                    </v-tooltip>
                </div>

                <div class="comments">
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn to="./groupogag/post/comment" v-bind="attrs" v-on="on"><v-icon>mdi-message</v-icon>
                    12</v-btn>
                    </template>
                    <span>Laisser un commentaire</span>
                    </v-tooltip>
                </div>

                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                <v-btn to="./groupogag/post/report" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                </template>
                <span>Signaler du contenu</span>
                </v-tooltip>

                </v-card-text>
            </v-card>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    fixed
                    dark
                    fab
                    justify-center
                    color="red"
                    class="hoverTime"
                    v-bind="attrs"
                    v-on="on"
                    to="./groupogag/create-post"
                    >
                        <v-icon color="white">mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <span>Créer ma publication GroupoGag !</span>    
            </v-tooltip>
        </v-card>

        <v-card height="50vh"></v-card>
            
        <foot/>
    </v-container>
</template>

<script>
import foot from './foot'
import mainhead from './mainhead'

export default {
    data: () => ({
        items: ['Dernières publications', 'Le plus de likes'],
         method: {
             async getUser() {
                 const res = await fetch('http://localhost:3000/user');
                 const data = await res.json();
                 this.data = data;
                 console.log('hello');
             }
         }
    }),
    name: 'groupogag',
    components: {
        foot,
        mainhead
    }
}
</script>

<style scoped>
.v-responsive {
    border: 2px groove;
}
.text-truncate {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
}
.hoverTime:hover:before {
    color: darkred;
}
.v-application a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
   bottom: 100px;
   right: 43%
}
</style>