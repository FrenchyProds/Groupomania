<template>
<v-dialog :value="value" @input="$emit('input')" max-width="800px">
  <v-card>
      <v-form ref="form"
      lazy-validation @submit="formSubmit">
        <v-container>
          <v-col>
            <div v-if="submitted && $v.title.$error" class="invalid-feedback">
                <span v-if="!$v.title.required">Un titre est requis</span>
                <span v-if="!$v.title.minLength">Le titre doit faire au moins 3 caractères de long</span>
                <span v-if="!$v.title.maxLength">Le titre doit faire moins de 50 caractères de long</span>
            </div>
            <v-row>
              <v-text-field
                v-model="title"
                prepend-icon="fa-pen"
                :class="{ 'is-invalid': submitted && $v.title.$error }"
                label="Titre"
                class="ma-2"
                required
                hint="Entre 3 et 50 caractères"
              ></v-text-field>
              </v-row>
              <div v-if="submitted && $v.content.$error" class="invalid-feedback">
                <span v-if="!$v.content.required">Du contenu est requis</span>
                <span v-if="!$v.content.minLength">Le contenu doit faire au moins 3 caractères de long</span>
                <span v-if="!$v.content.maxLength">Le contenu doit faire moins de 250 caractères de long</span>
              </div>
              <v-row>
              <v-textarea
                v-model="content"
                prepend-icon="fa-pen"
                :class="{ 'is-invalid': submitted && $v.content.$error }"
                label="Contenu"
                class="ma-2"
                required
                hint="Entre 3 et 250 caractères"
              ></v-textarea>
              </v-row>
            
            <v-row justify="space-around">
                <v-btn type="submit" value="Submit" class="mt-4" outlined color="green" :disabled='isComplete'>Valider</v-btn>
                <v-btn color="red" class="mt-4" outlined @click.native="$emit('input')">Annuler</v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>
  </v-card>
</v-dialog>
</template>

<script>
import swal from 'sweetalert'
import jwt_decode from 'jwt-decode'
import { required, minLength, maxLength } from "vuelidate/lib/validators";

const redditURL = 'http://localhost:3000/reddit/post'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'));

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
  data: () => ({
      title: '',
      content: '',
      submitted: false,
    }),
    validations: {
      title: { required, minLength: minLength(3), maxLength: maxLength(50) },
      content: { required, minLength: minLength(3), maxLength: maxLength(250) }
    },
    methods: {
          formSubmit(e) {
          e.preventDefault();
          this.submitted = true;
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
          this.axios.post(redditURL
          , 
          {
           title: this.title,
           content: this.content,
           userId: userId },
           {
                headers: {
                    Authorization: `Bearer ${tokenFetch}`
                        }
                    })
          .then(response => {
            // Handle success.
            console.log(response)
            swal('Discute publié !', 'Votre publication a été mise en ligne', 'success')
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
    return !this.title || !this.content;
    },
  },
  components: {
  }
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
</style>