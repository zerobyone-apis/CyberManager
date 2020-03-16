<template>
  <v-app id="app">
    <v-content class="content"> </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppCode from './appCode';
import './appStyle.scss';

@Component({
  components: {}
})
export default class App extends AppCode {
  created() {
    this.init();
  }
}
</script>
