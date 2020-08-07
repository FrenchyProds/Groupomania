<template>
    <v-container>
        <mainhead/>
            <div>
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
                                    <v-card-text>
                                    <v-container>
                                        
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field label="Titre de la publication" v-model="post.title"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <div v-show="showProgress">
                                                <progress-bar :options="options" :value="progress" />
                                            </div>
                                            <v-row class="align-center pb-3">
                                                <v-col cols="12">
                                                    <v-form v-on:submit.prevent="upload" ref="form">
                                                    <v-row class="d-block pb-5">
                                                    <!-- allow the user to select an image file and when they have selected it call a function 
                                                    to handle this event-->
                                                    <label for="file-input"></label>
                                                    <input
                                                        id="file-input"
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        @change="handleFileChange($event)"
                                                    />
                                                    </v-row>
                                                    <!-- submit button is disabled until a file is selected -->
                                                    <v-btn type="submit" :disabled="filesSelected != 1" fill color="light-green" >Héberger</v-btn>
                                                    </v-form>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <section v-if="results && results.secure_url">
                                            <img :src="results.secure_url" :alt="results.public_id" />
                                            </section>

                                            <!-- display errors if not successful -->
                                            <section>
                                            <ul v-if="errors.length > 0">
                                                <li v-for="(error,index) in errors" :key="index">{{error}}</li>
                                            </ul>
                                        </section>
                                        
                                    </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-row d-flex class="justify-content-space-between">
                                    <v-btn color="red darken-1" text @click="modalDialog = false">Annuler</v-btn>
                                    <v-btn color="blue darken-1" text @click="updatePost">Confirmer</v-btn>
                                    </v-row>
                                    </v-card-actions>

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
                    <v-img
                    :src="(post.content)"
                    aspect-ratio="1.5"
                    max-height="500"
                    contain/>
                    <div v-if="post.User !== null">
                        <v-card-text @click="goToUser(user.username)">Crée par {{ user.username }} - {{ post.createdAt | moment("from") }}
                            <div v-if="post.createdAt != post.updatedAt">
                                Modifié {{ post.updatedAt | moment("from") }}
                            </div>
                        </v-card-text>
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

                <div v-if="user.id != this.userIsMe">
                    <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn @click="reportContent()" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
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

            <div v-if="this.comments.length === 0">
                Aucun commentaire n'a été posté pour l'instant !
            </div>
            <div v-else>
            <div class="comments" v-for="(comment,index) in comments" :key="index">
                <v-card>
                    <v-card-text>
                        <p>{{comment.content}}</p>
                        <p class="justify-center">{{ comment.User.username }} - {{ comment.createdAt | moment("from") }}</p>
                    </v-card-text>
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

                        <div v-if="user.id != comment.userId">
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="reportComment()" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                            </template>
                            <span>Signaler du contenu</span>
                            </v-tooltip>
                        </div>
                    </v-card-text>
                </v-card> 
            </div>
            </div>
            
        <modifiedfoot/>
    </v-container>
</template>

<script>
import modifiedfoot from './modifiedfoot'
import mainhead from './mainhead'
import swal from 'sweetalert'
import ProgressBar from "vuejs-progress-bar";
import axios from "axios";
import jwt_decode from 'jwt-decode'


let tokenFetch = JSON.parse(localStorage.getItem('jwt'))

if(tokenFetch) {
    var decoded = jwt_decode(tokenFetch);
}

let userId

if(decoded != undefined) {
userId = decoded.userId
}

export default {
    props: {
     value: Boolean,
  },
    data () {
        const progressBarOptions = {
      text: {
        shadowColor: "black",
        fontSize: 14,
        fontFamily: "Helvetica",
        dynamicPosition: true
      },
      progress: {
        color: "#E8C401",
        backgroundColor: "#000000"
      },
      layout: {
        height: 35,
        width: 140,
        type: "line",
        progressPadding: 0,
        verticalTextAlign: 63
      },
    };
        return {
        items: ['Dernières publications', 'Le plus de likes'],
        post: [],
        user: [],
        url: [],
        comments: [],
        gagpost: false,
        results: null,
        errors: [],
        file: null,
        filesSelected: 0,
        cloudName: "",
        preset: "qqke5g5g",
        tags: "browser-upload",
        progress: 0,
        showProgress: false,
        options: progressBarOptions,
        fileContents: null,
        formData: null,
        secure_url: '',
        userIsMe: userId,
        modalDialog: false,
        updateTitle: '',
        updateContent: '',
        isFlagged: '',
        commentContent:''
    }},      
     mounted() {
         this.asyncData();
        },
     computed: {
        commentHasContent () {
            return !this.commentContent
        }
     },
        methods: {
            async asyncData() {
                 await this.axios.get('http://localhost:3000/gag/' + this.$route.params.id,
                {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    }).then(res => {
                this.post = res.data.data
                this.user = this.post.User
                this.isFlagged = this.post.isFlag
                console.log(res.data.data)
          })
          await this.axios.get('http://localhost:3000/gag/' + this.$route.params.id + '/comments',
                {
                    headers: {
                        Authorization: `Bearer ${tokenFetch}`
                        }
                        })
                        .then(res => {
                            this.comments = res.data.data
                            console.log(this.comments)       
                })
            },
            handleFileChange: function(event) {
        console.log("handlefilechange", event.target.files);
        //returns an array of files even though multiple not used
        this.file = event.target.files[0];
        this.filesSelected = event.target.files.length;
        },
        prepareFormData: function() {
        this.formData = new FormData();
        this.formData.append("upload_preset", this.preset);
        this.formData.append("file", this.fileContents);
        },
        // function to handle form submit
        upload: function() {
        //no need to look at selected files if there is no cloudname or preset
        if (this.preset.length < 1 || this.cloudName.length != 0) {
            this.errors.push("You must enter a cloud name and preset to upload");
            return;
        }
        // clear errors
        else {
            this.errors = [];
        }
        console.log("upload", this.file.name);
        let reader = new FileReader();
        // attach listener to be called when data from file
        reader.addEventListener(
            "load",
            function() {
            this.fileContents = reader.result;
            this.prepareFormData();
            let cloudinaryUploadURL = `https://api.cloudinary.com/v1_1/groupogag/upload`;
            let requestObj = {
                url: cloudinaryUploadURL,
                method: "POST",
                data: this.formData,
                onUploadProgress: function(progressEvent) {
                console.log("progress", progressEvent);
                this.progress = Math.round(
                    (progressEvent.loaded * 100.0) / progressEvent.total
                );
                console.log(this.progress);
                //bind "this" to access vue state during callback
                }.bind(this)
            };
            //show progress bar at beginning of post
            this.showProgress = true;
            axios(requestObj)
                .then(response => {
                this.results = response.data;
                this.secure_url = this.results.secure_url
                console.log(this.results);
                console.log("public_id", this.results.public_id);
                })
                .catch(error => {
                this.errors.push(error);
                console.log(this.error);
                })
                .finally(() => {
                setTimeout(
                    function() {
                    this.showProgress = false;
                    }.bind(this),
                    1000
                );
                });
            }.bind(this),
            false
        );
        // call for file read if there is a file
        if (this.file && this.file.name) {
            reader.readAsDataURL(this.file);
        }
        },
        updatePost() {
                 this.axios.put('http://localhost:3000/gag/' + this.$route.params.id, {
                    title: this.post.title,
                    content: this.secure_url,
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
                        this.axios.delete(`http://localhost:3000/gag/${this.$route.params.id}`
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
                            this.$router.push('/groupogag')
                            window.location.reload();
                        } else {
                            swal("Suppresion de publication annulée");
                        }
                        }).catch(error => {
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
                        this.axios.put(`http://localhost:3000/gag/report/${this.$route.params.id}`
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
                postComment() {
                    this.axios.post('http://localhost:3000/gag/' + this.$route.params.id + '/comment',
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
                        console.log(this.content)
                        swal('Commentaire publié !', '', 'success')
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
            }
        },
    name: 'voirgag',
    components: {
        mainhead,
        modifiedfoot,
        ProgressBar,
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
</style>