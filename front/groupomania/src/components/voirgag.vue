<template>
    <v-container>
        <mainhead/>
            <div>
                <div v-if="user">
                    <v-row justify="space-around">
                        <div v-if="user.id === userIsMe">
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
                                        
                                        <v-col cols="12">
                                            <v-text-field label="Titre de la publication" v-model="post.title"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
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
                    </div>

                        <div v-if="this.isAdmin == true">
                            <v-dialog v-model="modalDialog" max-width="600px">
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
                                <v-card-title>
                                <span class="headline" >Modérer la publication</span>
                                </v-card-title>
                                <v-card-text>
                                <v-container>
                                    
                                    <v-col cols="12">
                                        <v-text-field label="Titre de la publication" v-model="post.title"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
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
                                <v-btn color="blue darken-1" text @click="moderatePost()">Confirmer</v-btn>
                                </v-row>
                                </v-card-actions>

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
                        <v-btn @click="likePost()" v-bind="attrs" v-on="on" class="green--text"><v-icon color="green">mdi-arrow-up-bold</v-icon>
                        <div v-if="(post.likesCount - post.dislikesCount > 0)"> {{post.likesCount - post.dislikesCount}}</div></v-btn>
                        </template>
                        <span>J'aime !</span>
                        </v-tooltip>
                    </div>

                    <div class="dislikes">
                        <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn @click="dislikePost()" v-bind="attrs" v-on="on" class="red--text"><v-icon color="red">mdi-arrow-down-bold</v-icon>
                        <div v-if="post.dislikesCount - post.likesCount > 0">{{post.dislikesCount + post.likesCount}}</div></v-btn>
                        </template>
                        <span>J'aime pas !</span>
                        </v-tooltip>
                    </div>

                <div v-if="user.id != userIsMe">
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

        <div>
            <v-card-title>
                Commentaires : {{ post.commentsCount }}
            </v-card-title>

            <v-row class="align-center">
                <v-textarea label="Poster un commentaire !" v-model="commentContent" class="px-2"></v-textarea>
                <v-btn x-small fill-height tile class="mr-2" :disabled="commentHasContent" @click="postComment()"><v-icon color="green">mdi-arrow-right</v-icon></v-btn>
            </v-row>

            <div v-if="this.comments.length === 0">
                Aucun commentaire n'a été posté pour l'instant !
            </div>
            <div v-else>
                <div class="comments" v-for="comment in eachComment" :key="comment.id + Math.random()">
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
                            <div v-else>
                            <p>Utilisateur Supprimé - {{ comment.createdAt | moment("from") }}</p>
                            </div>
                            <div v-if="comment.createdAt != comment.updatedAt">
                                Modifié {{ comment.updatedAt | moment("from") }}
                            </div>
                        </v-card-text>
                        <v-card-text class="text-truncate" background-color="grey">
                            <div class="likes">
                                <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn @click="likeComment(comment.id)" v-bind="attrs" v-on="on" class="green--text"><v-icon>mdi-arrow-up-bold</v-icon>
                                <div v-if="comment.likesCount > comment.dislikesCount">{{comment.likesCount}}</div></v-btn>
                                </template>
                                <span>J'aime !</span>
                                </v-tooltip>
                            </div>

                            <div class="dislikes">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn @click='dislikeComment(comment.id)' v-bind="attrs" v-on="on" class="red--text"><v-icon>mdi-arrow-down-bold</v-icon>
                                    <div v-if="comment.dislikesCount > comment.likesCount">{{comment.dislikesCount}}</div></v-btn>
                                    </template>
                                    <span>J'aime pas !</span>
                                </v-tooltip>
                            </div>
    
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-if="comment.User.id != userIsMe" @click="reportComment(comment.id)" v-bind="attrs" v-on="on"><v-icon>mdi-flag</v-icon></v-btn>
                                </template>
                                <span>Signaler du contenu</span>
                            </v-tooltip>
                        </v-card-text>
                    </v-card> 
                </div>
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

let gagUrl = 'http://localhost:3000/gag/'

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
        commentContent:'',
        eachComment: [],
        isAdmin: ''
    }},      
     mounted() {
         this.asyncData();
        },
    beforeMount() {
        this.axios.get('http://localhost:3000/user/' + userId, {
            headers: {
                Authorization: `Bearer ${tokenFetch}`
            }
        }).then(res => {
            console.log(res)
            this.isAdmin = res.data.user.isAdmin
        })
    },
     computed: {
        commentHasContent () {
            return !this.commentContent
        }
     },
        methods: {
            async asyncData() {
                 await this.axios.get(gagUrl + this.$route.params.id,
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
          await this.axios.get(gagUrl + this.$route.params.id + '/comments',
                {
                    headers: {
                        Authorization: `Bearer ${tokenFetch}`
                        }
                        })
                        .then(res => {
                            this.comments = res.data.data
                            console.log(this.comments)  
                            this.fetchEachComment();     
                })
            },
            async fetchEachComment() {
                for(let i = 0; i < this.comments.length; i++) {
                    await this.axios.get(gagUrl + this.$route.params.id + '/comment/' + this.comments[i].id,
                {
                    headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                })
                    .then(res => {
                        this.eachComment.push(res.data.Comment)
                        console.log(this.userIsMe)
                        console.log(res.data.Comment.User.id)
                        console.log(res.data)
                    }) 
               
                }
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
                 this.axios.put(gagUrl + this.$route.params.id, {
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
                        this.axios.delete(gagUrl + `${this.$route.params.id}`
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
                        this.axios.put( gagUrl + `report/${this.$route.params.id}`
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
                    this.axios.post(gagUrl + this.$route.params.id + '/comment',
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
                        this.axios.delete(gagUrl + `${this.$route.params.id}` + '/comment/' + commentId,
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
                    this.axios.get(gagUrl + this.$route.params.id + '/like',
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
                    
                forceRerender() {
                    this.componentKey += 1;
                },
                 dislikePost() {
                    this.axios.get(gagUrl + this.$route.params.id + '/dislike',
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }    
                    })
                            .then(response => {
                                // Handle success.
                                console.log(response)
                                if(this.post.isDisliked) {
                                    swal("Dislike supprimé !","","success");
                                    window.location.reload();
                                } else if(!this.post.isDisliked) {
                                    swal("Publication dislikée !","","success")
                                    window.location.reload();
                                }
                            })
                        },
                     likeComment(commentId) {
                            this.axios.get(gagUrl + this.$route.params.id + '/comment/' + commentId + '/like',
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
                            this.axios.get(gagUrl + this.$route.params.id + '/comment/' + commentId + '/dislike',
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
                                    this.axios.put(gagUrl + this.$route.params.id + '/comment/report/' + commentId
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
                            moderatePost() {
                                this.axios.put(gagUrl + this.$route.params.id + '/admin', {
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
                                        this.axios.delete(gagUrl + `${this.$route.params.id}/admin`
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