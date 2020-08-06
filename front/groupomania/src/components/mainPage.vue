<template>
    <v-container>
        <mainhead/>
        <div class="text-center">
        <v-card class="introText font-weight-bold margin-auto pb-5">
            Bienvenue sur le reséau social by Groupomania !
        </v-card>
        <v-divider />
        <v-card-title class="welcomeText">
            <router-link to="./règlement"><v-card class="mainText One">
            <v-icon color="red"></v-icon>Merci de bien vouloir vous référer à notre règlement interieur avant de commencer à poster en cliquant sur cet encadré.
            </v-card></router-link>
            <v-card-title class="mainText Two">
            Vous pouvez mettre votre profil à jour via l'onglet "PROFIL" en bas de page et en renseignant vos informations personnelles.
            </v-card-title>
            <v-card-title class="mainText Three">
            Nous vous rappelons que tout comportement en non-adéquation avec les valeurs de l'entreprise entraînera des sanctions tant sur le réseau qu'au travail
            </v-card-title>
            <v-card class="mainText Four">
            Les dernières publications de nos internautes :
            </v-card>
        </v-card-title> 
        </div>
        <v-card class="text-center">
           <div>
                <div class="content" v-for="post in posts" :key="post.id">
                            <div v-if="post[0].postType === 'reddit'"> <!-- TEMPLATE REDDIT --> 
                                <div @click="goToReddit(post[0].id)">
                                <v-card-title background-color="lightgrey" class="postTitle">{{ post[0].title }}</v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>{{ post[0].content }}</v-card-text>
                                </div>
                                <div v-if="post[0].User !== null"> 
                                    <v-card-text @click="goToUser(post[0].User.username)">Created by {{ post[0].User.username }} - {{ post[0].createdAt | moment("from") }}</v-card-text>
                                </div>
                                <div v-else>
                                    <v-card-text>Utilisateur Supprimé- {{ post[0].createdAt | moment("from") }}</v-card-text>
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
                            </div>     <!-- FIN DU TEMPLATE REDDIT --> 

                            <div v-else> 
                            <div @click="goToGag(post[0].id)"> <!-- TEMPLATE GAG --> 
                                <v-card-title background-color="lightgrey" class="postTitle">{{ post[0].title }}</v-card-title>
                                <v-divider></v-divider>
                                <v-img
                                :src="(post[0].content)"
                                aspect-ratio="1.5"
                                max-height="500"
                                contain/>
                            </div>
                                <div v-if="post[0].User !== null"> 
                                    <v-card-text @click="goToUser(post[0].User.username)">Created by {{ post[0].User.username }} - {{ post[0].createdAt | moment("from") }}</v-card-text>
                                </div>
                                <div v-else>
                                    <v-card-text>Utilisateur Supprimé - {{ post[0].createdAt | moment("from") }}</v-card-text>
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
                        </div> <!--FIN DU TEMPLATE GAG --> 
                </div>
           </div>
        </v-card>
        <foot/>
    </v-container>
</template>

<script>
import foot from './foot'
import mainhead from './mainhead'

const redditURL = 'http://localhost:3000/reddit';
const gagURL = 'http://localhost:3000/gag'


let tokenFetch = JSON.parse(localStorage.getItem('jwt'))
console.log(localStorage)


export default {
    data: () => ({
        items: ['Dernières publications', 'Le plus de likes'],
        // test: [],
        posts: [],
        reddit: '',
        gag: '',
    }),
    mounted() {
            this.axios.all([
                this.axios.get(redditURL,
                { headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }}),
                this.axios.get(gagURL,
                { headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }}),
               ]).then(res => {
                   for (let i= 0; i < res.length; i++) {
                    this.posts.push(res[i].data.data)
                    this.reddit = this.posts.postType
                    this.gag = this.posts.postType
                   }
                   console.log(res)
                   console.log(this.posts)
          })
          if (localStorage.getItem('reloaded')) {
                // The page was just reloaded. Clear the value from local storage
                // so that it will reload the next time this page is visited.
                localStorage.removeItem('reloaded');
            } else {
                // Set a flag so that we know not to reload the page twice.
                localStorage.setItem('reloaded', '1');
                location.reload();
            }
        },
    methods: {
        goToGag(postId) {
            this.$router.push({name:'voirgag',params:{id:postId}})
        },
        goToReddit(postId) {
            this.$router.push({name:'voirdiscute',params:{id:postId}})
        },
        goToUser(username) {
            this.$router.push({name:'user', params:{username:username}})
        }
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
.v-responsive {
    border: 2px groove;
}

.introText {
    text-align: center !important;
    margin: auto;
    font-size: 1.8rem;
    box-shadow: none;
}

.mainText {
    padding: 1rem;
    margin: 0.5rem;
}

.Four {
    margin-top: 2rem !important;
    text-decoration: underline;
    margin: auto;
    box-shadow: none;
}

.content {
    padding-bottom: 2rem;
}

.v-card__title {
    word-break: normal;
}

.content:last-child {
    padding-bottom: 6rem;
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

.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined){
   bottom: 100px;
   right: 47%
}

</style>