<template>
    <v-container>
        <mainhead/>
        <v-select :items="items" label="Trier par :" filled>
        </v-select>
        <v-card class="text-center">
           <div>
                <div class="content" v-for="post in posts" :key="post.id">
                    <v-card-title background-color="lightgrey">{{ post[0].title }}</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>{{ post[0].content }}</v-card-text>
                    <v-card-text>Created by {{ post[0].User.username }} - {{ post[0].createdAt | moment("from") }}</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="text-truncate" background-color="grey">

                <div class="likes">
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"><v-icon color="green">mdi-arrow-up-bold</v-icon>14</v-btn>
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
                    <v-btn to="./groupodiscute/post/comment" v-bind="attrs" v-on="on"><v-icon>mdi-message</v-icon>
                    8</v-btn>
                    </template>
                    <span>Laisser un commentaire</span>
                    </v-tooltip>
                </div>

                <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                <v-btn to="./groupodiscute/post/report" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                </template>
                <span>Signaler du contenu</span>
                </v-tooltip>
                </v-card-text>
                <v-divider></v-divider>
                    
                </div>
            </div>
            </v-card>
        <foot/>
    </v-container>
</template>

<script>
import foot from './foot'
import mainhead from './mainhead'
import jwt_decode from 'jwt-decode'



const redditURL = 'http://localhost:3000/reddit';
const gagURL = 'http://localhost:3000/gag'


let tokenFetch = JSON.parse(localStorage.getItem('jwt'))
console.log(localStorage)

var decoded = jwt_decode(tokenFetch);
console.log(decoded);

sessionStorage.setItem('id', JSON.stringify(decoded.userId))
console.log(sessionStorage)


export default {
    data: () => ({
        items: ['Dernières publications', 'Le plus de likes'],
        // test: [],
        posts: [],
    }),
    mounted() {
            this.axios.all([
                this.axios.get(redditURL),
                this.axios.get(gagURL),
               ]).then(res => {
                   for (let i= 0; i < res.length; i++) {
                    this.posts.push(res[i].data.data)
                    // for (let j = 0; j < res[j].data.data.length; j++) {
                    //     this.posts.push(this.posts[j]);
                    // }
                   }
                   console.log(res)
                   console.log(this.posts)
          })
        },
    name: 'mainPage',
    headers: {
        Authorization: `Bearer ${tokenFetch}`
  },
    components: {
        foot,
        mainhead
    }
}
</script>

<style scoped>


</style>