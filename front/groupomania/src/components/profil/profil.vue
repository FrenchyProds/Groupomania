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

        <v-tabs grow class="elevation-2" background-color="white">
                <v-tab>Préferences</v-tab>
                <v-tab>Historique</v-tab>
        </v-tabs>

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
                <v-text-field placeholder="Modifier" input="text" v-model="department">
                </v-text-field>
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
                <v-text-field placeholder="Modifier" input="text" v-model="firstName">
                </v-text-field>
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
                <v-text-field placeholder="Modifier" input="text" v-model="lastName">
                </v-text-field>
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
                            <v-icon size="24px" v-if="!null"  color="green">mdi-checkbox-marked-circle</v-icon>
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
            <v-col cols="11">
                <v-text-field placeholder="Nouveau mot de passe" v-model="updatePass">
                </v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="11">
                <v-text-field placeholder="Confirmer le nouveau mot de passe" v-model="confPass">
                </v-text-field>
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

<div class="clear"></div>
    
        <foot/>
    </v-container>
</template>

<script>
import foot from '../modifiedfoot'
import axios from "axios";
import swal from 'sweetalert';
import ProgressBar from "vuejs-progress-bar";

let tokenFetch = JSON.parse(localStorage.getItem('jwt'));

let userId = JSON.parse(localStorage.getItem('id'));

let userMe = `http://localhost:3000/user/${userId}`;
console.log(userMe)

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
        userMe: this.userMe
        // imageURL: `${this.results.secure_url}`,
        // darkMode: '',
        // password: '',
        // passwordConf: '',
        }
    },
        beforeRouteEnter (to, from, next) {
            return tokenFetch ? next() : next('/')
        },
        created () {
            this.fetchAuthenticatedUser()
        },
        // computed () {
            
        // },
         methods: {
            async fetchAuthenticatedUser () {
                this.axios
                    .get(await userMe, {
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
                        console.log(this.user)
                    })
            },
            // function to handle file info obtained from local
            // file system and set the file state
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
            depSubmit(e) {
                e.preventDefault();
                console.log(this.department)
                this.axios
                    .put(
                        userMe,
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
                console.log(this.firstName)
                console.log(this.lastName)
                this.axios
                    .put(
                        userMe,
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
                this.axios.put(userMe
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
                console.log(this.password)
                this.axios
                    .put(
                        userMe,
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
                        this.axios.delete(userMe
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

.clear { clear: both; height: 150px; }

form input {
  background: #fff;
  border: 1px solid #9c9c9c;
}


</style>