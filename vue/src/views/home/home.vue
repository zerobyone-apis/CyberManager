<template transition="slide-x-transition">
  <div id="homePage">
    <div class="login-box">
      <h4 class="font-title">Acceda para utilizar CyberManager</h4>

      <div class="login-fields">
        <v-text-field v-model="signInData.username" class="field" label="Usuario"></v-text-field>
        <v-text-field v-model="signInData.password" class="field" label="Contraseña"></v-text-field>
      </div>
      <p class="font-error">{{ signInErrors }}</p>
      <div class="login-footer">
        <v-btn @click="login()" class="button">Acceder</v-btn>
      </div>

      <!-- register dialog -->
      <v-dialog class="register-dialog" v-model="dialogs.signUp" width="500">
        <v-card>
          <v-card-title>Cree una cuenta para iniciar en Organize</v-card-title>
          <v-card-text>
            <div class="login-fields">
              <v-text-field v-model="signUpData.email" class="field" label="email"></v-text-field>
              <v-text-field v-model="signUpData.username" class="field" label="username"></v-text-field>
              <v-text-field v-model="signUpData.password" class="field" label="password"></v-text-field>
            </div>
            <p class="font-error">{{ signUpErrors }}</p>
            <div class="login-footer">
              <v-btn @click="register()" class="button">Crear cuenta</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>




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
