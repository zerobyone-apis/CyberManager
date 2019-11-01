<template transition="slide-x-transition">
  <div id="homePage">
    <div class="login-box">
      
    </div>
  </div>
</template>

<script lang="ts">
//code
import HomeCode from "./homeCode";
//style
import "./homeStyle.scss";
import "../../styles/fonts.scss";
//components
import { Component } from "vue-property-decorator";
import AddDialog from "../../components/dialogs/addDialog/addDialog.vue";

@Component({
  components: {
    AddDialog
  }
})
export default class Home extends HomeCode {}
</script>
