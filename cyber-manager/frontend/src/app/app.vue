<template>
  <v-app id="app">
    <v-content class="content">
      <v-container fluid class="container">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Toolbar from "@/components/toolbar/toolbar.vue";
import AppCode from "./appCode";
import "./appStyle.scss";


@Component({
  components: {
    Toolbar,
  }
})
export default class App extends AppCode {
  created() {
    this.init();
  }
}
</script>