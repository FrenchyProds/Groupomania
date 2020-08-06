<template>

<v-dialog :value="value" @input="$emit('input')" max-width="800px" ma-1>
    <v-form ref="postForm">
  <v-card class="text-center my-2">
        <v-row class="align-center">
            
              <v-text-field
              v-model="title"
              prepend-icon="fa-pen"
                label="Titre"
                class="pa-2"
                required
              ></v-text-field>
            
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
         <section v-if="results && results.secure_url">
                <img :src="results.secure_url" :alt="results.public_id" />
                </section>

                <!-- display errors if not successful -->
                <section>
                <ul v-if="errors.length > 0">
                    <li v-for="(error,index) in errors" :key="index">{{error}}</li>
                </ul>
            </section>
        <v-tooltip top> 
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                icon v-bind="attrs" v-on="on" @click="formSubmit()" :disabled='isComplete'>
                <div class="btn-flex">
                    <v-icon size="24px"  color="green">mdi-checkbox-marked-circle</v-icon>
                    Confirmer
                </div>
                </v-btn>
            </template>
            <span>Confirmer</span>
        </v-tooltip>
    </v-card>
    
    </v-form>
    </v-dialog>
</template>

<script>
import swal from 'sweetalert'
import ProgressBar from "vuejs-progress-bar";
import axios from "axios";
import jwt_decode from 'jwt-decode'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'));

if(tokenFetch) {
    var decoded = jwt_decode(tokenFetch);
}

let userId

if(decoded != undefined) {
userId = decoded.userId
}

console.log(userId)


const gagURL = 'http://localhost:3000/gag/post'

export default {
  props: {
     value: Boolean,
  },
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
      title: '',
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
      isDisabled: true,
    }},
    methods: {
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
          formSubmit() {
          this.axios.post(gagURL
          ,{
           title: this.title,
           content: this.secure_url,
           userId: userId },
           {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    })           
          .then(response => {
            // Handle success.
            console.log(response)
            swal('Gag publié !', 'Votre publication a été mise en ligne', 'success')
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
        },
  computed: {
  isComplete () {
    return !this.title || !this.secure_url;
    }
  },
  components: {
      ProgressBar
  },
  name: 'gagpost'
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