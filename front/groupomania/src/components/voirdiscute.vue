<template>
    <v-container>
        <mainhead/>
            <div>
                <div class="content">
                    <div v-if="post.User !== null">
                        <v-card-title background-color="lightgrey">{{ post.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>{{ post.content }}</v-card-text>
                        <v-card-text>Crée par {{ user.username }} - {{ post.createdAt | moment("from") }}</v-card-text>
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

                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn to="./groupodiscute/post/report" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                    </template>
                    <span>Signaler du contenu</span>
                    </v-tooltip>
                    </v-card-text>
                    <v-divider></v-divider>

                    </div>
                    <div v-else>
                        <v-card-title background-color="lightgrey">{{ post.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>{{ post.content }}</v-card-text>
                        <v-card-text>Utilisateur Supprimé - {{ post.createdAt | moment("from") }}</v-card-text>
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
            </div>

        <div class="clear"></div>
            
        <modifiedfoot/>
    </v-container>
</template>

<script>
import modifiedfoot from './modifiedfoot'
import mainhead from './mainhead'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

export default {
    data () {
        return {
        items: ['Dernières publications', 'Le plus de likes'],
        post: [],
        user: [],
        url: [],
        gagpost: false,
        title: '',
    }},      
     mounted() {
         this.asyncData();
        },
        methods: {
            async asyncData() {
                 await this.axios.get('http://localhost:3000/reddit/' + this.$route.params.id,
                {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    }).then(res => {
                this.post = res.data.data
                this.user = this.post.User
                console.log(res.data.data)
          })
            }

        },
    name: 'voirdiscute',
    components: {
        mainhead,
        modifiedfoot,
    },
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