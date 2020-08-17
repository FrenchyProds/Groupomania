<template>
  <v-app>
    <v-content>
      <router-view><Index/></router-view>
    </v-content>
    <div class="clear"></div>
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
.clear { clear: both; height: 150px; }
</style>
