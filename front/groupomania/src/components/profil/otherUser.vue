<template>
    <v-container>
        <v-list-item two-line>
            <v-list-item-avatar size="100px">
                <v-img :src="(avatar) || 'https://picsum.photos/300/200?random'"
                contain/>
            </v-list-item-avatar>
             
            <v-list-item-content class="text-center">
                <v-list-item-subtitle class="headline mb-1 text-capitalize">{{user.username}}</v-list-item-subtitle>
                <v-list-item-subtitle class="headline">{{user.firstName || 'Prénom'}} {{user.lastName || 'Nom'}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        

        <div class="text-center pb-5" v-if="user.id != this.userIsMe">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="reportContent()" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon>Signaler l'utilisateur</v-btn>
                </template>
                <span>Signaler du contenu</span>
            </v-tooltip>
        </div>

        <v-divider></v-divider>

        <v-card>
            <v-row class="text-center">
                <v-col cols="4">
                    Email
                </v-col>
                <v-col>
                    {{user.email}}
                </v-col>
            </v-row>
        </v-card>

        <v-card>
            <v-row class="text-center">
                <v-col cols="4">
                    Département
                </v-col>
                <v-col>
                    {{user.department}}
                </v-col>
            </v-row>
        </v-card>
        

        <v-tabs grow class="elevation-2" background-color="white">
                <v-tab v-if="toggleGag == false" @click="toggleGags()">Gags</v-tab>
                <v-tab v-if="toggleReddit == false" @click='toggleReddits()'>Discutes</v-tab>
                <v-tab v-if="toggleComment == false" @click='toggleComments()'>Commentaires</v-tab>
        </v-tabs>

        <div class="gags" v-show="toggleGag" v-for="gag in gags" :key="gag.id">
            <div @click="goToGag(gag.id)">
                <v-card-title class="centered-text">{{gag.title}}</v-card-title>
                <v-img
                            :src="(gag.content)"
                            aspect-ratio="1.5"
                            max-height="500"
                            contain/>
            </div>
            <v-card-text>Posté {{ gag.createdAt | moment("from") }}</v-card-text>
            <v-divider></v-divider>
        </div>

        <div class="reddits" v-show="toggleReddit" v-for="reddit in reddits" :key="reddit.id">
            <div @click="goToReddit(reddit.id)">
                <v-card-title class="centered-text">{{reddit.title}}</v-card-title>
                <v-card-text>{{reddit.content}}</v-card-text>
            </div>
            <v-card-text>Posté {{ reddit.createdAt | moment("from") }}</v-card-text>
            <v-divider></v-divider>
        </div>

        <div class="comments" v-show="toggleComment">
             <div v-for="gagComment in gagComments" :key="gagComment.gagId + Math.random()">
                <div v-if="gagComment.gagId != null">
                    <v-card-text>{{gagComment.content}}</v-card-text>
                    <div @click="goToGag(gagComment.gagId)">
                        <v-card-text>Sur la publication : {{gagComment.Gag.title }} </v-card-text>
                    </div>                   
                <v-card-text> {{ gagComment.createdAt | moment("from") }}</v-card-text>
                <v-divider></v-divider>
                </div>
            </div>

            <div v-for="redditComment in redditComments" :key="redditComment.redditId + Math.random()">
                    <div v-if="redditComment.redditId != null">
                        <v-card-text>{{redditComment.content}}</v-card-text>
                        <div @click="goToReddit(redditComment.redditId)">
                            <v-card-text>Sur la publication : {{redditComment.Reddit.title }} </v-card-text>
                        </div>                   
                        <v-card-text> {{ redditComment.createdAt | moment("from") }}</v-card-text>
                        <v-divider></v-divider>
                    </div>
                </div>
            </div>

    <modifiedfoot />
    </v-container>
    
</template>

<script>
import modifiedfoot from '../modifiedfoot'
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'));

if(tokenFetch) {
    var decoded = jwt_decode(tokenFetch);
}

let userId

if(decoded != undefined) {
userId = decoded.userId
}

export default {
    data() {
    
    return {
        user: [],
        id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
        department: '',
        gags: [],
        reddits: [],
        gagComments: [],
        redditComments: [],
        toggleGag: true,
        toggleReddit: false,
        toggleComment: false,
        userIsMe: userId,
        isFlagged: '',
    }
    },
    beforeRouteUpdate (to, from, next) {
            this.fetchUser(to.params.username)
            next()
        },
    created () {
            this.fetchUser(this.$route.params.username)
            console.log(this.$route.params.username)
        },
    mounted () {
    },
    methods: {
        fetchUser() {
            this.axios
                    .get( `http://localhost:3000/finduser/${this.$route.params.username}`, {
                        headers: {
                            Authorization: `Bearer ${tokenFetch}`
                        }
                    })
                    .then(response => {
                        console.log(response)
                        this.user = response.data.user
                        this.id = this.user.id
                        this.username = this.user.username
                        this.email = this.user.email
                        this.firstName = this.user.firstName
                        this.lastName = this.user.lastName
                        this.department = this.user.department
                        this.avatar = this.user.avatar
                        this.isFlagged = this.user.isFlag
                        this.fetchGags();
                        this.fetchReddits();
                        this.fetchGagComments();
                        this.fetchRedditComments();
                    })  
            },
            fetchGags() {
                        this.axios
                        .get(`http://localhost:3000/gag/byUser/${this.id}`, {
                            headers: {
                                    Authorization: `Bearer ${tokenFetch}`
                                }
                        }).then(response => {
                        this.gags = response.data.data
                        console.log(this.gags)
                        })
            },
            fetchReddits() {
                        this.axios.get(`http://localhost:3000/reddit/byUser/${this.id}`, {
                        headers: {
                                    Authorization: `Bearer ${tokenFetch}`
                                }
                        }).then(response => {
                        this.reddits = response.data.data
                        console.log(this.reddits)
                        })
            },
            fetchGagComments() {
                        this.axios.get(`http://localhost:3000/comments/gag/byUser/${this.id}`, {
                            headers: {
                                            Authorization: `Bearer ${tokenFetch}`
                                        }
                                }).then(response => {
                                this.gagComments = response.data.data
                                console.log(this.comments)
                                })
            },
            fetchRedditComments() {
                        this.axios.get(`http://localhost:3000/comments/reddit/byUser/${this.id}`, {
                            headers: {
                                            Authorization: `Bearer ${tokenFetch}`
                                        }
                                }).then(response => {
                                this.redditComments = response.data.data
                                console.log(this.comments)
                                })
            },
            reportContent() {
                         if(this.isFlagged == false) {
                            swal({
                                title: "Voulez-vous vraiment signaler cet utilisateur ?",
                                text: "",
                                icon: "info",
                                buttons: true,
                                dangerMode: true,
                            }) 
                            .then((willReport) => {
                                if (willReport) {
                                    swal("Utilisateur signalé avec succes",{
                                        icon: "success",
                                    })
                                this.axios.put(`http://localhost:3000/user/report/${this.$route.params.username}`
                                ,
                        {
                            headers: {
                            Authorization: `Bearer ${tokenFetch}`
                                }    
                        })
                                .then(response => {
                                    // Handle success.
                                    console.log(response)     
                                })
                                window.location.reload()
                            } else {
                                swal("Signlament annulé");
                            }
                            })
                    
                    .catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                        swal("Quelque chose n'a pas fonctionné", "", "error")
                            })
                        } else {
                            swal("Ce contenu a déjà été signalé par un autre utilisateur", "Merci quand même :)", "error")
                        }
                    },
            toggleGags() {
                this.toggleGag = true;
                this.toggleReddit = false;
                this.toggleComment = false;
            },
            toggleReddits() {
                this.toggleGag = false;
                this.toggleReddit = true;
                this.toggleComment = false;
            },
            toggleComments() {
                this.toggleGag = false;
                this.toggleReddit = false;
                this.toggleComment = true;
            },
             goToReddit(postId) {
            this.$router.push({name:'voirdiscute',params:{id:postId}})
            },
             goToGag(postId) {
            this.$router.push({name:'voirgag',params:{id:postId}})
            }
        },
        components: {
            modifiedfoot,
        }
    }
</script>

<style scoped>

.v-card__title {
    justify-content: center;
}

</style>