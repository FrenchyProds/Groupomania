<template height="80vh">
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

        <v-tabs vertical grow class="elevation-2" background-color="white">
                <v-tab @click="toggleOptions()">Préferences</v-tab>
                <v-tab @click="toggleHistory()">Historique</v-tab>
                <v-tab v-if="this.confirmedAdmin == 1" @click="adminPanel()">Admin Panel</v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <div v-if="showOptions == true">
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

        <v-form ref="form" @submit="depSubmit">
            <v-card class="my-2">
                <v-row class="text-center ml-1">
                    <v-col cols="4">
                        Département
                    </v-col>
                    <v-col>
                        {{user.department}}
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="11">
                        <div v-if="submittedDep && $v.department.$error" class="invalid-feedback">
                            <span v-if="!$v.department.minLength">Minimum 3 lettres</span>
                            <span v-if="!$v.department.maxLength">Maximum 20 lettres</span>
                        </div>
                        <v-text-field
                        prepend-icon="work"
                        placeholder="Modifier"
                        input="text"
                        v-model="department"
                        :class="{ 'is-invalid': submittedDep && $v.department.$error }"
                        hint="Entre 3 et 20 lettres"
                        ></v-text-field>
                    </v-col>
                </v-row>
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
                                        <v-icon size="24px" v-if="!null"  color="green">mdi-checkbox-marked-circle</v-icon>
                                        Confirmer
                                    </div>
                                    </v-btn>
                                </template>
                                <span>Confirmer</span>
                            </v-tooltip>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-form> 

        <v-form ref="form" @submit="nameSubmit">
            <v-card class="my-2">
                <v-row class="text-center ml-1">
                    <v-col cols="4">
                        Prénom
                    </v-col>
                    <v-col>
                        {{user.firstName}}
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="11">
                        <div v-if="submittedName && $v.firstName.$error" class="invalid-feedback">
                            <span v-if="!$v.firstName.minLength">Minimum 3 lettres</span>
                            <span v-if="!$v.firstName.maxLength">Maximum 20 lettres</span>
                        </div>
                        <v-text-field
                        prepend-icon="person"
                        placeholder="Modifier"
                        input="text"
                        v-model="firstName"
                        :class="{ 'is-invalid': submittedName && $v.firstName.$error }"
                        hint="Entre 3 et 20 lettres"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="text-center ml-1">
                    <v-col cols="4">
                        Nom
                    </v-col>
                    <v-col>
                        {{user.lastName}}
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="11">
                        <div v-if="submittedName && $v.lastName.$error" class="invalid-feedback">
                            <span v-if="!$v.lastName.minLength">Minimum 3 lettres</span>
                            <span v-if="!$v.lastName.maxLength">Maximum 20 lettres</span>
                        </div>
                        <v-text-field
                        prepend-icon="person"
                        placeholder="Modifier"
                        input="text"
                        v-model="lastName"
                        :class="{ 'is-invalid': submittedName && $v.lastName.$error }"
                        hint="Entre 3 et 20 lettres"
                        ></v-text-field>
                    </v-col>
                </v-row>
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
                                    <v-icon size="24px" :disabled="hasName"  color="green">mdi-checkbox-marked-circle</v-icon>
                                    Confirmer
                                </div>
                                </v-btn>
                            </template>
                            <span>Confirmer</span>
                        </v-tooltip>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-form>

        <v-card class="text-center my-2">
            <v-row class="align-center">
                <v-col>
                    <v-card-text class="title font-weight-regular">
                    Modifier mon avatar
                    </v-card-text>
                </v-col>
            </v-row>
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
            <v-tooltip top> 
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon v-bind="attrs" v-on="on" @click="imageSubmit()">
                            <div class="btn-flex">
                                <v-icon size="24px" :disabled="hasImage"  color="green">mdi-checkbox-marked-circle</v-icon>
                                Confirmer
                            </div>
                            </v-btn>
                        </template>
                        <span>Confirmer</span>
                    </v-tooltip>
        </v-card>


        <v-form ref="form" @submit="passwordSubmit">
            <v-card class="my-2">
                <v-row class="text-center ml-1">
                    <v-col cols="12">
                        Modifier mon mot de passe
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12">
                        <div v-if="submittedPass && $v.updatePass.$error" class="invalid-feedback">
                            <span v-if="!$v.updatePass.minLength">Votre mot de passe doit faire au moins 8 caractères</span>
                        </div>
                        <v-row no-gutters>
                        <v-text-field
                            prepend-icon="lock"
                            :type="passwordFieldType"
                            placeholder="Nouveau mot de passe"
                            v-model="updatePass"
                            hint="Votre mot de passe doit faire au moins 8 caractères de long"
                            :class="{ 'is-invalid': submittedPass && $v.updatePass.$error }"
                        ></v-text-field>
                        <v-btn icon v-if="passwordFieldType === 'password'" @click="toggleShow" class="green--text"><v-icon>mdi-eye</v-icon></v-btn>
                        <v-btn icon v-if="passwordFieldType != 'password'" @click="toggleShow" class="red--text"><v-icon>mdi-eye-off</v-icon></v-btn>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12">
                        <div v-if="submittedPass && $v.confPass.$error" class="invalid-feedback">
                            <span v-if="!$v.confPass.sameAsPassword">Les mots de passe doivent être identiques</span>
                        </div>
                        <v-row no-gutters>
                        <v-text-field
                        prepend-icon="lock"
                        :type="passwordFieldTypeConf" 
                        placeholder="Confirmer le nouveau mot de passe" 
                        v-model="confPass"
                        hint="La confirmation doit être identique que le mot de passe renseigné ci-dessus"
                        :class="{ 'is-invalid': submittedPass && $v.confPass.$error }"
                        ></v-text-field>
                        <v-btn icon v-if="passwordFieldTypeConf === 'password'" @click="toggleShowConf" class="green--text"><v-icon>mdi-eye</v-icon></v-btn>
                        <v-btn icon v-if="passwordFieldTypeConf != 'password'" @click="toggleShowConf" class="red--text"><v-icon>mdi-eye-off</v-icon></v-btn>
                        </v-row>
                    </v-col>
                </v-row>
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
                                    <v-icon size="24px" :disabled="hasPassword"  color="green">mdi-checkbox-marked-circle</v-icon>
                                    Confirmer
                                </div>
                                </v-btn>
                            </template>
                            <span>Confirmer</span>
                        </v-tooltip>
                    </v-card-text>
                </v-card>
            </v-card>
        </v-form>

        

        <v-card class="d-flex text-center my-2">
            <v-row class="align-center mx-3">
                <v-col class="red--text" cols="12">
                    Supprimer mon compte
                </v-col>
                <v-col cols="12">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon v-bind="attrs" v-on="on">
                            <div class="btn-flex" @click="deleteAccount()">
                                <v-icon size="24px" color="red">mdi-delete-circle</v-icon>
                                Supprimer
                            </div>
                            </v-btn>
                        </template>
                        <span>Supprimer mon compte</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-card>
        </div>

        <div v-if="showHistory == true">
             <v-tabs show-arrows grow class="elevation-2" background-color="white">
                <v-tab @click="toggleGags()">Gags</v-tab>
                <v-tab @click='toggleReddits()'>Discutes</v-tab>
                <v-tab @click='toggleComments()'>Commentaires</v-tab>
            </v-tabs>

            <div v-if="gags.length > 0"  v-show="toggleGag">
            <div class="gags" v-for="gag in gags" :key="gag.id">
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
            </div>
            <div v-else class="text-center mt-4"  v-show="toggleGag">
                <v-card-title class="justify-center">Vous n'avez pas encore publié de Gag !</v-card-title>
                <v-card-text @click="goToGroupogag()">Cliquez ici pour créer votre publication</v-card-text>
            </div>

            <div v-if="reddits.length > 0" v-show="toggleReddit">
            <div class="reddits" v-for="reddit in reddits" :key="reddit.id">
                <div @click="goToReddit(reddit.id)">
                    <v-card-title class="centered-text">{{reddit.title}}</v-card-title>
                    <v-card-text>{{reddit.content}}</v-card-text>
                </div>
                <v-card-text>Posté {{ reddit.createdAt | moment("from") }}</v-card-text>
                <v-divider></v-divider>
            </div>
            </div>
            <div v-else class="text-center mt-4" v-show="toggleReddit">
                <v-card-title class="justify-center">Vous n'avez pas encore publié de Discute !</v-card-title>
                <v-card-text @click="goToGroupodiscute()">Cliquez ici pour créer votre publication</v-card-text>
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

            <div v-for="(redditComment) in redditComments" :key="redditComment.redditId + Math.random()">
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
        </div>

    
        <foot/>
    </v-container>
</template>

<script>
import foot from '../footers/modifiedfoot'
import axios from "axios";
import swal from 'sweetalert';
import ProgressBar from "vuejs-progress-bar";
import jwt_decode from 'jwt-decode'
import { minLength, sameAs, maxLength } from "vuelidate/lib/validators";

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
        user: [],
        id: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        avatar: '',
        department: '',
        password: '',
        updatePass: '',
        confPass: '',
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
        componentKey: 0,
        userMe: '',
        userIsMe: userId,
        showOptions: true,
        showHistory: false,
        reddits: [],
        gags: [],
        gagComments: [],
        redditComments: [],
        toggleGag: true,
        toggleReddit: false,
        toggleComment: false,
        isAdmin: '',
        confirmedAdmin: '',
        passwordFieldType: 'password',
        passwordFieldTypeConf: 'password',
        submittedName: false,
        submittedPass: false,
        submittedDep: false,
        }
    },
        beforeRouteEnter (to, from, next) {
            return tokenFetch ? next() : next('/')
        },
        beforeRouteUpdate (to, from, next) {
            this.fetchUser(to.params.id)
            next()
        },
        created () {
            this.fetchUser(this.$route.params.id)
        },
        mounted () {
        },
        computed: {
            hasImage () {
                return !this.fileContents;
            },
            hasPassword () {
                    return !this.updatePass || !this.confPass;
            },
            hasName () {
                return !this.firstName || !this.lastName
            }
        },
        validations: {
            department: { minLength: minLength(3), maxLength: maxLength(20) },
            firstName: { minLength: minLength(3), maxLength: maxLength(20) },
            lastName: { minLength: minLength(3), maxLength: maxLength(30) },
            updatePass: { minLength: minLength(8) },
            confPass: { sameAsPassword: sameAs('updatePass') }
        },
         methods: {
             fetchUser () {
                this.axios
                    .get(`http://localhost:3000/user/${this.$route.params.id}`, {
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
                        this.password = this.user.password
                        this.isAdmin = this.user.isAdmin
                        this.fetchGags();
                        this.fetchReddits();
                        this.fetchGagComments();
                        this.fetchRedditComments();
                        if(this.isAdmin == true) {
                            this.fetchAdmin(this.$route.params.id)
                            }
                    })  
            },
            toggleShow() {
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
            },
            toggleShowConf() {
                this.passwordFieldTypeConf = this.passwordFieldTypeConf === 'password' ? 'text' : 'password';
            },
            goToGroupogag() {
                this.$router.push({ name: 'groupogag' })
            },
            goToGroupodiscute() {
                this.$router.push({ name: 'groupodiscute' })
            },
            fetchAdmin() {
                this.axios.get(`http://localhost:3000/admin/${this.$route.params.id}`, {
                    headers: {
                            Authorization: `Bearer ${tokenFetch}`
                        }
                }).then(response => {
                    this.confirmedAdmin = response.data.user.isAdmin
                })
            },
            // function to handle file info obtained from local
            // file system and set the file state
            handleFileChange: function(event) {
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
                    this.progress = Math.round(
                        (progressEvent.loaded * 100.0) / progressEvent.total
                    );
                    //bind "this" to access vue state during callback
                    }.bind(this)
                };
                //show progress bar at beginning of post
                this.showProgress = true;
                axios(requestObj)
                    .then(response => {
                    this.results = response.data;
                    this.avatar = response.data.secure_url
                    })
                    .catch(error => {
                    this.errors.push(error);
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
            depSubmit(e) {
                e.preventDefault();
                this.submittedDep = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.axios
                    .put(
                        `http://localhost:3000/user/${this.$route.params.id}`,
                        {
                            department: this.department
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
                        swal("Département mis à jour","","success")
                        window.location.reload();                   
                    })
                    .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
            },
            nameSubmit(e) {
                e.preventDefault();
                this.submittedName = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                this.axios
                    .put(
                        `http://localhost:3000/user/${this.$route.params.id}`,
                        {
                            firstName: this.firstName,
                            lastName: this.lastName
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
                        swal("Noms mis à jour !","","success")
                        window.location.reload();
                    })
                    .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
            },
            imageSubmit() {
                this.axios.put(`http://localhost:3000/user/${this.$route.params.id}`
                ,{
                avatar: this.avatar },
                    {
                        headers: {
                        Authorization: `Bearer ${tokenFetch}`
                            }
                    })
                .then(response => {
                    // Handle success.
                    console.log(response)
                    swal('Avatar modifié !', '', 'success')
                    window.location.reload();
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error.response);
                    swal("Quelque chose n'a pas fonctionné", "", "error")
                })
                },
                validate () {
                this.$refs.form.validate()
                },
                passwordSubmit(e) {
                e.preventDefault();
                this.submittedPass = true;
                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }
                if(this.updatePass == this.confPass) {
                this.axios
                    .put(
                        `http://localhost:3000/user/password/${this.$route.params.id}`,
                        {
                            password: this.updatePass
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
                        swal("Mot de passe modifié !","","success")
                        window.location.reload();
                    })
                    .catch(error => {
                            // Handle error.
                            console.log('An error occurred:', error.response);
                            swal("Quelque chose n'a pas fonctionné", "", "error")
                        })
                    } else {
                        swal("Mots de passe différents !","Merci de bien vouloir renseigner des mots de passe identiques", "error")
                    }
                    },
                    deleteAccount() {
                        swal({
                        title: "Voulez-vous vraiment supprimer votre compte ?",
                        text: "Une fois supprimé, vous ne pourrez pas le récupérer",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                        }) 
                        .then((willDelete) => {
                        if (willDelete) {
                            swal("Votre compte a été supprimé avec succes", {
                            icon: "success",
                            })
                        this.axios.delete(`http://localhost:3000/user/${this.$route.params.id}`
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
                            this.$router.push('/')
                        } else {
                            swal("Suppresion de compte annulée");
                        }
                        })
                
                .catch(error => {
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
                        this.axios.get(`http://localhost:3000/comments/Gag/byUser/${this.id}`, {
                            headers: {
                                            Authorization: `Bearer ${tokenFetch}`
                                        }
                                }).then(response => {
                                this.gagComments = response.data.data
                                })
                    },
                    fetchRedditComments() {
                        this.axios.get(`http://localhost:3000/comments/Reddit/byUser/${this.id}`, {
                            headers: {
                                            Authorization: `Bearer ${tokenFetch}`
                                        }
                                }).then(response => {
                                this.redditComments = response.data.data
                                })
                    },
                    toggleOptions() {
                        this.showOptions = true;
                        this.showHistory = false;
                    },
                    toggleHistory() {
                        this.showOptions = false;
                        this.showHistory = true;
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
                    },
                    adminPanel() {
                        this.$router.push({name:'admin'})
                    }
                },
            headers: {
            Authorization:
              'Bearer' + tokenFetch,
        },
    name: 'profil',
    components: {
        foot,
        ProgressBar
    }
}
</script>

<style scoped>

.v-divider {
    margin: 1rem 0rem;
}

.theme--light.v-input{
    margin-left: 1rem;
}


form input {
  background: #fff;
  border: 1px solid #9c9c9c;
}


</style>