<template>
    <v-container>
        <mainhead/>
        <v-select :items="items" label="Trier par :" filled>
        </v-select>
       <v-card class="text-center">
           <div>
                <div class="content" v-for="post in posts" :key="post.id">
                    <div @click="goToPost(post.id)">
                        <v-card-title background-color="lightgrey">{{ post.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>{{ post.content }}</v-card-text>
                    </div>
                    <div v-if="post.User !== null">
                        <v-card-text @click="goToUser(post.User.username)">Crée par {{ post.User.username }} - {{ post.createdAt | moment("from") }}</v-card-text>
                    </div>
                    <div v-else>
                        <v-card-text>Utilisateur Supprimé - {{ post.createdAt | moment("from") }}</v-card-text>
                    </div>
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
                    @click="discute = true"
                    >
                        <v-icon color="white">mdi-pencil</v-icon>
                    </v-btn>
                    <discute v-model="discute" />
                </template>
                <span>Créer ma publication GroupoDiscute!</span>    
            </v-tooltip>
        </v-card>
        <div class="clear"></div>
        <foot/>
    </v-container>
</template>

<script>
import foot from './foot'
import mainhead from './mainhead'
import discute from './discutepost'

const apiUrl = 'http://localhost:3000/reddit';
let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

export default {
    data () {
    return {
      items: ['Dernières publications', 'Le plus de likes'],
      posts: [],
      discute: false,
      id: '',
    }
  },
  mounted() {
          this.axios.get(apiUrl,
          {
            headers: {
             Authorization: `Bearer ${tokenFetch}`
            }
            }).then(res => {
                this.posts = res.data.data
                console.log(res.data)
          })
        },
    methods: {
        goToPost(postId) {
            this.$router.push({name:'voirdiscute',params:{id:postId}})
        },
        goToUser(username) {
            this.$router.push({name:'user', params:{username:username}})
        }
    },
    name: 'groupodiscute',
    components: {
        foot,
        mainhead,
        discute
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
   right: 47%
}
.clear { clear: both; height: 150px; }
</style>