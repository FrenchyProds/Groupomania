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
                    <v-btn class="orange--text" @click="reportContent()" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon>Signaler l'utilisateur</v-btn>
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

        <v-tabs mb-2 show-arrows grow class="elevation-2" background-color="white">
                <v-tab v-if="this.isAdmin == true && toggleModeration == false" @click="toggleMod()">Modérer l'utilisateur</v-tab>
                <v-tab v-if="toggleGag == false" @click="toggleGags()">Gags</v-tab>
                <v-tab v-if="toggleReddit == false" @click='toggleReddits()'>Discutes</v-tab>
                <v-tab v-if="toggleComment == false" @click='toggleComments()'>Commentaires</v-tab>
        </v-tabs>

        <div mt-2 class="moderate" v-show="toggleModeration">
            <v-form @submit="moderateUser(user.id)">
                <v-card-text>Pour la modération de l'avatar merci de bien vouloir remplacer l'avatar existant par un url picsum</v-card-text>
                <v-card-text>Si vous modifiez le username, il vous faudra taper le nouveau username dans l'url afin d'accéder au profil (petit souci de routing)</v-card-text>
                <v-text-field  v-model="username" label="Modérer le nom d'utilisateur"></v-text-field>
                <v-text-field  v-model="firstName" label="Modérer le prénom"></v-text-field>
                <v-text-field  v-model="lastName" label="Modérer le nom"></v-text-field>
                <v-text-field  v-model="avatar" label="Modérer l'avatar"></v-text-field>
                <v-text-field  v-model="department" label="Modérer le département"></v-text-field>
                <v-card
                    flat
                    tile
                    width="100%"
                    class="white text-center">
                    <v-card-text class="d-flex justify-space-around">
                        <v-tooltip top> 
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                icon v-bind="attrs" v-on="on" type="submit" value="Submit">
                                <div class="btn-flex">
                                    <v-icon size="24px" color="green">mdi-checkbox-marked-circle</v-icon>
                                    Confirmer
                                </div>
                                </v-btn>
                            </template>
                            <span>Confirmer</span>
                        </v-tooltip>
                    </v-card-text>
                </v-card>
            </v-form>
            <v-row class="justify-center">
            <v-btn icon class="red--text" @click="deleteUser(user.id)">Supprimer l'utilisateur<v-icon>mdi-delete-circle</v-icon></v-btn>
            </v-row>
        </div>

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
import modifiedfoot from '../footers/modifiedfoot'
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
        toggleModeration: false,
        userIsMe: userId,
        isFlagged: '',
        isAdmin: '',
    }
    },
    watch: {
    $route(to, from) {
       if (to !== from) {
           this.fetchUser(this.username)
       }
    }
    },
    beforeRouteUpdate (to, from, next) {
            this.fetchUser(to.params.username)
            next()
        },
    created () {
            this.fetchUser(this.$route.params.username)
        },
    beforeMount() {
        this.axios.get('http://localhost:3000/user/' + userId, {
            headers: {
                Authorization: `Bearer ${tokenFetch}`
            }
        }).then(res => {
            this.isAdmin = res.data.user.isAdmin
        })
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
            moderateUser(userId) {
                this.axios.put('http://localhost:3000/user/' + userId + '/admin',
                        {
                            username: this.username,
                            firstName: this.firstName,
                            lastName: this.lastName,
                            department: this.department,
                            avatar: this.avatar,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${tokenFetch}`
                            }
                        })
                        .then(response => {
                        // display success notification
                        this.notification = Object.assign({}, this.notification, {
                          message: response.data.message,
                          type: 'success'
                        })     
                        swal("Utilisateur modéré !","","success")
                        this.$router.push('/mainPage')                  
                    })
                    .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
                },
                deleteUser(userId) {
                swal({
                    title: "Voulez-vous vraiment supprimer cet utilisateur ?",
                    text: "",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    }) 
                    .then((willDelete) => {
                    if (willDelete) {
                        swal("L'utilisateur a été supprimé avec succes", {
                        icon: "success",
                        })
                    this.axios.delete('http://localhost:3000/user/' + userId + '/admin',
                        {
                            headers: {
                            Authorization: `Bearer ${tokenFetch}`
                                }    
                        })
                        .then(response => {
                            // Handle success.
                            console.log(response)     
                        })
                        window.location.reload();
                    } else {
                        swal("Suppresion d'utilisateur annulée");
                    }
                    }).catch(error => {
                        // Handle error.
                        console.log('An error occurred:', error.response);
                        swal("Quelque chose n'a pas fonctionné", "", "error")
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
                        })
            },
            fetchReddits() {
                        this.axios.get(`http://localhost:3000/reddit/byUser/${this.id}`, {
                        headers: {
                                    Authorization: `Bearer ${tokenFetch}`
                                }
                        }).then(response => {
                        this.reddits = response.data.data
                        })
            },
            fetchGagComments() {
                        this.axios.get(`http://localhost:3000/comments/gag/byUser/${this.id}`, {
                            headers: {
                                            Authorization: `Bearer ${tokenFetch}`
                                        }
                                }).then(response => {
                                this.gagComments = response.data.data
                                })
            },
            fetchRedditComments() {
                        this.axios.get(`http://localhost:3000/comments/reddit/byUser/${this.id}`, {
                            headers: {
                                            Authorization: `Bearer ${tokenFetch}`
                                        }
                                }).then(response => {
                                this.redditComments = response.data.data
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
                this.toggleModeration = false;
                this.toggleReddit = false;
                this.toggleComment = false;
            },
            toggleMod() {
                this.toggleGag = false;
                this.toggleModeration = true;
                this.toggleReddit = false;
                this.toggleComment = false;
            },
            toggleReddits() {
                this.toggleGag = false;
                this.toggleModeration = false;
                this.toggleReddit = true;
                this.toggleComment = false;
            },
            toggleComments() {
                this.toggleGag = false;
                this.toggleModeration = false;
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