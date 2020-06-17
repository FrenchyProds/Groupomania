<template>
  <v-app>
    <v-content>
      <router-view><Index/></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Index from './components/index';


export default {
  name: 'App',
  components: {
    Index,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.v-application a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.8)
}
</style>
