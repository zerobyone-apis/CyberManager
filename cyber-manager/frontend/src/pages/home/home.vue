<template transition="slide-x-transition">
  <div id="home-page">
    <img
      class="img-back"
      src="https://i.pinimg.com/originals/9c/d1/a0/9cd1a09bb5c3d5a6774128147c96b18b.gif"
    />
    <login
      @onSignIn="(userSignIn)=>{signIn(userSignIn)}"
      @onSignUp="(userSignUp)=>{signUp(userSignUp)}"
      :charges="charges"
    />

    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
    >{{ notification.message }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import HomeView from "./home.view";
import "./home.scss";
import "../../styles/CyberManager.scss";
import { Component } from "vue-property-decorator";
import Login from "../../components/Login/Login.vue";

@Component({
  components: {
    Login
  }
})
export default class Home extends HomeView {}
</script>
