<template>
    <v-container>
        <mainhead/>
            <div>
                <div class="content">
                    <div v-if="user">
                        <v-row justify="space-around">
                            <div v-if="user.id === this.userIsMe">
                                <v-dialog v-model="modalDialog" max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        color="white"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                        Modifier ma publication
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="justify-center">
                                        <span class="headline" >Modifier ma publication</span>
                                        </v-card-title>
                                        <v-container class="text-center">
                                            <v-card-text class="align-center">
                                            <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field label="Titre de la publication" v-model="post.title"></v-text-field>
                                            </v-col>
                                            </v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-textarea  label="Contenu de la publication" v-model="post.content"></v-textarea>
                                            </v-col>
                                            
                                        </v-card-text>
                                        <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-row d-flex class="justify-content-space-between">
                                        <v-btn color="red darken-1" text @click="modalDialog = false">Annuler</v-btn>
                                        <v-btn color="green darken-1" text @click="updatePost">Confirmer</v-btn>
                                        </v-row>
                                        </v-card-actions>
                                        </v-container>
                                        
                                        <v-card class="d-flex text-center my-2">
                                            <v-row class="align-center mx-3">
                                                <v-col cols="12">
                                                    <v-tooltip top>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                            icon v-bind="attrs" v-on="on">
                                                            <div class="btn-flex" @click="deletePost()">
                                                                <v-icon size="24px" color="red">mdi-delete-circle</v-icon>
                                                                Supprimer
                                                            </div>
                                                            </v-btn>
                                                        </template>
                                                        <span>Supprimer ma publication</span>
                                                    </v-tooltip>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-card>
                                </v-dialog>
                            </div>
                                    

                            <div v-if="this.isAdmin == true">
                                <v-dialog v-model="modalAdmin" max-width="600px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                        color="white"
                                        dark
                                        v-bind="attrs"
                                        v-on="on"
                                        >
                                        Modérer la publication
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="justify-center">
                                            <span class="headline" >Modérer la publication</span>
                                        </v-card-title>
                                        <v-container class="text-center">
                                            <v-card-text class="align-center">
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field label="Titre de la publication" v-model="post.title"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-textarea  label="Contenu de la publication" v-model="post.content"></v-textarea>
                                                </v-col>   
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                    <v-row d-flex class="justify-content-space-between">
                                                        <v-btn color="red darken-1" text @click="modalAdmin = false">Annuler</v-btn>
                                                        <v-btn color="green" text @click="moderatePost()">Confirmer</v-btn>
                                                    </v-row>
                                            </v-card-actions>
                                        </v-container>
                                        
                                        <v-card class="d-flex text-center my-2">
                                            <v-row class="align-center mx-3">
                                                <v-col cols="12">
                                                    <v-tooltip top>
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                            icon v-bind="attrs" v-on="on">
                                                            <div class="btn-flex" @click="adminDeletePost()">
                                                                <v-icon size="24px" color="red">mdi-delete-circle</v-icon>
                                                                Supprimer
                                                            </div>
                                                            </v-btn>
                                                        </template>
                                                        <span>Supprimer la publication</span>
                                                    </v-tooltip>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-card>
                                </v-dialog> 
                            </div>     
                        </v-row>
                    </div>

                        <v-card-title class="justify-center" background-color="lightgrey">{{ post.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="content">{{ post.content }}</v-card-text>
                         <div v-if="post.User !== null">
                        <v-card-text class="flex-row" @click="goToUser(user.username)">Crée par {{ user.username }} - {{ post.createdAt | moment("from") }}
                            <div v-if="post.createdAt != post.updatedAt">
                                Modifié {{ post.updatedAt | moment("from") }}
                            </div>
                        </v-card-text>
                         </div>
                         </div>
                        <v-divider></v-divider>
                        
                        <v-card-text class="text-truncate" background-color="grey">
                            <div class="likes">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="likePost()" class="green--text" v-bind="attrs" v-on="on"><v-icon color="green">mdi-arrow-up-bold</v-icon>
                                <div v-if="(post.likesCount > post.dislikesCount)"> {{post.likesCount - post.dislikesCount}}</div></v-btn>
                                </template>
                                <span>J'aime !</span>
                                </v-tooltip>
                            </div>

                            <div class="dislikes">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="dislikePost()" v-bind="attrs" class="red--text" v-on="on"><v-icon color="red">mdi-arrow-down-bold</v-icon>
                                <div v-if="post.dislikesCount > post.likesCount">-{{post.dislikesCount}}</div></v-btn>
                                </template>
                                <span>J'aime pas !</span>
                                </v-tooltip>
                            </div>

                        <div v-if="user.id != this.userIsMe">
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn class="orange--text" @click="reportContent()" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                            </template>
                            <span>Signaler du contenu</span>
                            </v-tooltip>
                        </div>
                        </v-card-text>
                        <v-divider></v-divider>
                        
                </div>

            <v-card-title>
                Commentaires : {{ comments.length }}
            </v-card-title>

            <v-row class="align-center">
                <v-textarea label="Poster un commentaire !" v-model="commentContent" class="px-2"></v-textarea>
                <v-btn x-small fill-height tile class="mr-2" :disabled="commentHasContent" @click="postComment()"><v-icon color="green">mdi-arrow-right</v-icon></v-btn>
            </v-row>

            <div v-if="!comments.length">
                Aucun commentaire n'a été posté pour l'instant !
            </div>
            <div v-else>
                <paginate
                v-if="shown"
                name="eachComment"
                :list="eachComment"
                :per="10"
                >
                <li class="comments my-2" v-for="(comment,index) in paginated('eachComment')" :key="index">
                <v-card>
                    <v-card-text>
                        <v-row class="justify-space-between mx-1">
                            <p>{{comment.content}}</p>
                            <div class="btn-flex" v-if="comment.User.id == userIsMe">
                                <v-btn @click="deleteComment(comment.id)" justify-end icon color="red"><v-icon>mdi-delete-circle</v-icon></v-btn>
                            </div>
                        </v-row>
                        <div v-if="comment.User !== null">
                        <p class="justify-center" @click="goToUser(comment.User.username)">{{ comment.User.username }} - {{ comment.createdAt | moment("from") }}</p>
                        </div>
                    </v-card-text>
                    <v-card-text class="text-truncate" background-color="grey">
                        <div class="likes">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="likeComment(comment.id)" class="green--text" v-bind="attrs" v-on="on"><v-icon>mdi-arrow-up-bold</v-icon>
                                <div v-if="comment.likesCount > comment.dislikesCount">{{comment.likesCount}}</div></v-btn>
                                </template>
                                <span>J'aime !</span>
                                </v-tooltip>
                            </div>

                            <div v-if="isAdmin == true">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="adminComment(comment.id)" v-bind="attrs" v-on="on" class="red--text">Modérer<v-icon>mdi-delete-circle</v-icon>
                                </v-btn>
                                </template>
                                <span>Modérer le commentaire</span>
                                </v-tooltip>
                            </div>

                            <div class="dislikes">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="dislikeComment(comment.id)" class="red--text" v-bind="attrs" v-on="on"><v-icon>mdi-arrow-down-bold</v-icon>
                                <div v-if="comment.dislikesCount > comment.likesCount">{{comment.dislikesCount}}</div></v-btn>
                                </template>
                                <span>J'aime pas !</span>
                                </v-tooltip>
                            </div>

                        <div v-if="userIsMe != comment.User.id">
                            <div v-if="comment.isFlag != true">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn class="orange--text" @click="reportComment(comment.id)" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                                </template>
                                <span>Signaler du contenu</span>
                                </v-tooltip>
                            </div>
                        </div>

                    </v-card-text>
                </v-card> 
            </li>
            </paginate>
            <paginate-links :hide-single-page="true" :async="true" class="stylePagination mt-4" for="eachComment" :show-step-links="true"
                :step-links="{
                next: '>',
                prev: '<'
                }">
            </paginate-links>
            </div>
            
        <modifiedfoot/>
    </v-container>
</template>

<script>
import modifiedfoot from '../footers/modifiedfoot'
import mainhead from '../headers/mainhead'
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

if(tokenFetch) {
    var decoded = jwt_decode(tokenFetch);
}

let userId

if(decoded != undefined) {
userId = decoded.userId
}

let redditUrl = 'http://localhost:3000/reddit/'

export default {
    data () {
        return {
        post: [],
        user: [],
        url: [],
        title: '',
        comments: [],
        userIsMe: userId,
        modalDialog: false,
        modalAdmin: false,
        updateTitle: '',
        updateContent: '',
        isFlagged: '',
        commentContent:'',
        eachComment: [],
        isAdmin: '',
        paginate: ['eachComment'],
        shown: false,
    }},      
     mounted() {
         this.asyncData();
          setTimeout(() => {
                this.shown = true
                }, 1000)
        },
    computed: {
        commentHasContent () {
            return !this.commentContent
        }
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
        methods: {
            async asyncData() {
                 await this.axios.get(redditUrl + this.$route.params.id,
                {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    }).then(res => {
                this.post = res.data.data
                this.user = this.post.User
                this.isFlagged = this.post.isFlag
                this.fetchComments();
                })
            },
                async fetchComments() {
                   await this.axios.get(redditUrl + this.$route.params.id + '/comments',
                {
                    headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    })
                        .then(res => {
                            this.comments = res.data.Comment
                            this.fetchEachComment()
                })
            },
            async fetchEachComment() {
                for(let i = 0; i < this.comments.length; i++) {
               await this.axios.get(redditUrl + this.$route.params.id + '/comment/' + this.comments[i].id,
               {
                    headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                })
                    .then(res => {
                        this.eachComment.push(res.data.Comment)
                    }) 
               
                }
            },
            updatePost() {
                 this.axios.put(redditUrl + this.$route.params.id, {
                    title: this.post.title,
                    content: this.post.content,
                },
                {
                    headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                }
                )
                .then(response => {
                        // display success notification
                        this.notification = Object.assign({}, this.notification, {
                          message: response.data.message,
                          type: 'success'
                        })
                        this.modalDialog = false,
                        swal("Publication mise à jour !","","success")
                        window.location.reload();                   
                    })
                    .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
            },
            goToUser(username) {
            this.$router.push({name:'user', params:{username:username}})
        },
            deletePost() {
                        swal({
                        title: "Voulez-vous vraiment supprimer votre publication ?",
                        text: "Une fois supprimé, vous ne pourrez pas la récupérer",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                        }) 
                        .then((willDelete) => {
                        if (willDelete) {
                            swal("Votre publication a été supprimé avec succes", {
                            icon: "success",
                            })
                        this.axios.delete(redditUrl + `${this.$route.params.id}`
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
                            this.$router.push('/groupodiscute')
                            window.location.reload()
                        } else {
                            swal("Suppresion de publication annulée");
                        }
                        })
                
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
                    },
                     reportContent() {
                         if(this.isFlagged == false) {
                        swal({
                        title: "Voulez-vous vraiment signaler ce contenu ?",
                        text: "",
                        icon: "info",
                        buttons: true,
                        dangerMode: true,
                        }) 
                        .then((willReport) => {
                        if (willReport) {
                            swal("Contenu signalé avec succes",{
                            icon: "success",
                            })
                        this.axios.put(redditUrl + `report/${this.$route.params.id}`
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
                            swal("Signalement annulé");
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
                postComment() {
                    this.axios.post(redditUrl + this.$route.params.id + '/comment',
                    {
                        content: this.commentContent,
                    },
                {
                    headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }
                        })
                        .then(response => {
                        // Handle success.
                        console.log(response)
                        swal('Commentaire publié !', '', 'success')
                        window.location.reload();
                        })
                        .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
                },
                reportComment(commentId) {
                        swal({
                        title: "Voulez-vous vraiment signaler ce commentaire ?",
                        text: "",
                        icon: "info",
                        buttons: true,
                        dangerMode: true,
                        }) 
                        .then((willReport) => {
                        if (willReport) {
                            swal("Commentaire signalé avec succes",{
                            icon: "success",
                            })
                        this.axios.put(redditUrl + this.$route.params.id + '/comment/report/' + commentId
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
                        }
                    })
                },
                deleteComment(commentId) {
                        swal({
                        title: "Voulez-vous vraiment supprimer votre commentaire ?",
                        text: "",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                        }) 
                        .then((willDelete) => {
                        if (willDelete) {
                            swal("Votre commentaire a été supprimé avec succes", {
                            icon: "success",
                            })
                        this.axios.delete(redditUrl + `${this.$route.params.id}` + '/comment/' + commentId,
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
                            swal("Suppresion de commentaire annulée");
                        }
                        }).catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                                })
                            },
                likePost() {
                    this.axios.get(redditUrl + this.$route.params.id + '/like',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                            .then(response => {
                                // Handle success.
                                console.log(response)
                                if(this.post.isLiked) {
                                    swal("Like supprimé !","","success");
                                    window.location.reload();
                                } else if(!this.post.isLiked) {
                                    swal("Publication likée !","","success")
                                    window.location.reload();
                                }
                            })
                        },
                 dislikePost() {
                    this.axios.get(redditUrl + this.$route.params.id + '/dislike',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                            .then(response => {
                                // Handle success.
                                console.log(response)
                                if(this.post.isDisliked) {
                                    swal("Dislike supprimé !","","uccess");
                                    window.location.reload();
                                } else if(!this.post.isDisliked) {
                                    swal("Publication dislikée !","","success")
                                    window.location.reload();
                                }
                            })
                        },
                        likeComment(commentId) {
                            this.axios.get(redditUrl + this.$route.params.id + '/comment/' + commentId + '/like',
                            {
                                headers: {
                                Authorization: `Bearer ${tokenFetch}`
                                    }    
                            })
                            .then(response => {
                                // Handle success.
                                console.log(response)
                                if(this.eachComment.isLiked) {
                                    swal("Like supprimé !","","success");
                                    window.location.reload();
                                } else if(!this.eachComment.isLiked) {
                                    swal("Commentaire liké !","","success")
                                    window.location.reload();
                                }
                            })
                        },
                        dislikeComment(commentId) {
                            this.axios.get(redditUrl + this.$route.params.id + '/comment/' + commentId + '/dislike',
                            {
                                headers: {
                                Authorization: `Bearer ${tokenFetch}`
                                    }    
                            })
                                    .then(response => {
                                        // Handle success.
                                        console.log(response)
                                        if(this.eachComment.isDisliked) {
                                            swal("Dislike supprimé !","","success");
                                            window.location.reload();
                                        } else if(!this.eachComment.isDisliked) {
                                            swal("Commentaire disliké !","","success")
                                            window.location.reload();
                                        }
                                    })
                                },
                                moderatePost() {
                                    this.axios.put(redditUrl + this.$route.params.id + '/admin', {
                                        title: this.post.title,
                                        content: this.post.content,
                                    },
                                    {
                                        headers: {
                                        Authorization: `Bearer ${tokenFetch}`
                                            }
                                    }
                                    )
                                    .then(response => {
                                            // display success notification
                                            this.notification = Object.assign({}, this.notification, {
                                            message: response.data.message,
                                            type: 'success'
                                            })
                                            this.modalDialog = false,
                                            swal("Publication modérée !","","success")
                                            window.location.reload();                   
                                        })
                                        .catch(error => {
                                                // Handle error.
                                                console.log('An error occurred:', error.response);
                                                swal("Quelque chose n'a pas fonctionné", "", "error")
                                            })
                                },
                                adminDeletePost() {
                                    swal({
                                    title: "Voulez-vous vraiment supprimer la publication ?",
                                    text: "Une fois supprimé, vous ne pourrez pas la récupérer",
                                    icon: "warning",
                                    buttons: true,
                                    dangerMode: true,
                                    }) 
                                    .then((willDelete) => {
                                    if (willDelete) {
                                        swal("La publication a été supprimé avec succes", {
                                        icon: "success",
                                        })
                                    this.axios.delete(redditUrl + `${this.$route.params.id}/admin`
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
                                        this.$router.push('/groupodiscute')
                                        window.location.reload()
                                    } else {
                                        swal("Suppresion de publication annulée");
                                    }
                                    })
                            
                            .catch(error => {
                                // Handle error.
                                console.log('An error occurred:', error.response);
                                swal("Quelque chose n'a pas fonctionné", "", "error")
                                    })
                                },
                                adminComment(commentId) {
                                    swal({
                                        title: "Voulez-vous vraiment supprimer ce commentaire ?",
                                        text: "",
                                        icon: "warning",
                                        buttons: true,
                                        dangerMode: true,
                                        }) 
                                        .then((willDelete) => {
                                        if (willDelete) {
                                            swal("Le commentaire a été supprimé avec succes", {
                                            icon: "success",
                                            })
                                        this.axios.delete(redditUrl + `${this.$route.params.id}` + '/comment/' + commentId + '/admin',
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
                                            swal("Suppresion de commentaire annulée");
                                        }
                                        }).catch(error => {
                                            // Handle error.
                                            console.log('An error occurred:', error.response);
                                            swal("Quelque chose n'a pas fonctionné", "", "error")
                                                })
                                },
                                            
            } ,
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
   margin-top: 2rem;
   color: red;
}

.content {
    font-size: 1.1rem;
}

.col-sm-6 {
    flex: 0 0 100%;
    max-width: 100%;
}
</style>

<style>
li {
    list-style: none;
}
.stylePagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style: none;
}
.v-application ul, .v-application ol {
    padding-left: 0rem;
}
.stylePagination li a {
    color:rgba(0, 0, 0, 0.8);
    margin: 0rem 1rem;
    font-weight: 500;
    font-size: 1.1rem;
}
.stylePagination .active a {
    color: rgb(79, 212, 79);
    text-decoration: underline;
}
</style>