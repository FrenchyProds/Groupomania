<template>
    <v-container>
        <mainhead/>
        <v-select :items="items" label="Trier par :" filled>
        </v-select>
        <v-card class="text-center">
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
            <p>Tout le contenu sera ici</p>
        </v-card>
        <foot/>
    </v-container>
</template>

<script>
import foot from './foot'
import mainhead from './mainhead'

let tokenFetch = JSON.parse(localStorage.getItem('jwt'))
localStorage.clear;

export default {
    data: () => ({
        items: ['Dernières publications', 'Le plus de likes']
    }),
    name: 'mainPage',
    headers: {
    Authorization:
      'Bearer' + tokenFetch,
  },
    components: {
        foot,
        mainhead
    }
}
</script>

<style scoped>

</style>