<template>
    <v-container>
        <mainhead/>
            <div>
                <div class="content">
                    <div v-if="user">
                        <div v-if="user.id === this.userIsMe">
                            <v-row justify="center">
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
                                    <v-card-title>
                                    <span class="headline" >Modifier ma publication</span>
                                    </v-card-title>
                                    <v-container>
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
                                    <v-btn color="blue darken-1" text @click="updatePost">Confirmer</v-btn>
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
                            </v-row>
                        </div>
                    </div>
                        <v-card-title background-color="lightgrey">{{ post.title }}</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="content">{{ post.content }}</v-card-text>
                         <div v-if="post.User !== null">
                        <v-card-text class="flex-row" @click="goToUser(user.username)">Crée par {{ user.username }} - {{ post.createdAt | moment("from") }}
                            <div v-if="post.createdAt != post.updatedAt">
                                Modifié {{ post.updatedAt | moment("from") }}
                            </div>
                        </v-card-text>
                         </div>
                        <div v-else>
                        <v-card-text>Utilisateur Supprimé - {{ post.createdAt | moment("from") }}</v-card-text>
                        </div>
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

                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn to="./groupodiscute/post/report" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                            </template>
                            <span>Signaler du contenu</span>
                            </v-tooltip>
                        </v-card-text>
                        <v-divider></v-divider>
                        
                </div>

            <v-card-title>
                Commentaires
            </v-card-title>

            <div v-if="!post.Comments || post.Comments.length === 0">
                Aucun commentaire n'a été posté pour l'instant !
            </div>
            <div v-else>
            <div class="comments" v-for="comment in comments" :key="comment.id">
                <v-card-text>
                    <p>{{comment.content}}</p>
                </v-card-text>
            </div>
            </div>

        <div class="clear"></div>
            
        <modifiedfoot/>
    </v-container>
</template>

<script>
import modifiedfoot from './modifiedfoot'
import mainhead from './mainhead'
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


export default {
    data () {
        return {
        items: ['Dernières publications', 'Le plus de likes'],
        post: [],
        user: [],
        url: [],
        title: '',
        comments: [],
        userIsMe: userId,
        modalDialog: false,
        updateTitle: '',
        updateContent: ''
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
                this.comments = this.post.Comments
                console.log(this.userIsMe)
                console.log(this.comments)
                console.log(res.data.data)
          })
            },
            updatePost() {
                 this.axios.put('http://localhost:3000/reddit/' + this.$route.params.id, {
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
                        this.axios.delete(`http://localhost:3000/reddit/${this.$route.params.id}`
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

.clear { clear: both; height: 150px; }
</style>