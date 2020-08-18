 <template>
 <v-container>
  <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src='../../assets/icon-left-font-monochrome-black.png'
          class="my-1"
          contain
          height="150"
        />
      </v-col>
    </v-row>
<v-card-title class="justify-center mb-10 pa-0">Le réseau social qui nous rapproche</v-card-title>
 </v-container>
</template>

<script>
export default {
    name: 'indexhead'
}
</script>

<style scoped>
.v-card__title {
    word-break: normal;
    text-align: center;
    font-weight: 700;
}
</style>