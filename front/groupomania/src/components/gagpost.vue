<template>
<v-dialog :value="value" @input="$emit('input')" max-width="800px">
  <v-card>
      <v-form ref="form"
      lazy-validation @submit="formSubmit">
        <v-container>
          <v-col>
            <v-row>
              <v-text-field
              v-model="title"
              prepend-icon="fa-pen"
                label="Titre"
                class="ma-2"
                required
              ></v-text-field>
              </v-row>
              <cl-upload class="align" />
            
            <v-row justify="space-around">
                <v-btn type="submit" value="Submit" class="mt-4" outlined color="green">Valider</v-btn>
                <v-btn color="red" class="mt-4" outlined @click.native="$emit('input')">Annuler</v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>
  </v-card>
</v-dialog>
</template>

<script>
import CloudinaryUpload from "./cloudinaryUpload/imageUpload";
import swal from 'sweetalert'

const gagURL = 'http://localhost:3000/gag/post'

export default {
  props: {
     value: Boolean,
  },
  data() {
   return {
      title: '',
      imageURL: `${this.results.secure_url}`
    }},
    methods: {
          formSubmit(e) {
          e.preventDefault();
          this.axios.post(gagURL
          ,{
           title: this.title,
           content: this.imageURL, })
          .then(response => {
            // Handle success.
            console.log(response)
            console.log(this.title)
            swal('Gag publié !', 'Votre publication a été mise en ligne', 'success')
            this.$router.push('/groupogag');
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
  },
  components: {
      "cl-upload": CloudinaryUpload
  },
  name: 'gagpost'
}
</script>