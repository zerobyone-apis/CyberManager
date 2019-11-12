<template transition="slide-x-transition">
  <div id="homePage">
    <div class="login-box">
      <h4 class="font-title">Acceda para utilizar CyberManager</h4>

      <div class="box-access login-fields">
        <v-text-field
          v-model="signInData.username.value"
          :error="v.get('signInData.username') != ''"
          :error-messages="v.get('signInData.username')"
          class="field"
          label="Usuario"
        ></v-text-field>
        <v-text-field
          v-model="signInData.password.value"
          :error="v.get('signInData.password') != ''"
          :error-messages="v.get('signInData.password')"
          class="field"
          type="password"
          label="Contraseña"
        ></v-text-field>
      </div>
      <p class="font-error font-text">{{ signInErrors }}</p>
      <div class="login-footer">
        <v-btn @click="login()" class="button">Acceder</v-btn>
      </div>
    </div>

    <div class="box-access register-box">
       <h4 class="font-title">Registrese Aqui</h4>
      <div class="login-fields">
        <v-text-field 
          v-model="signUpData.username.value" 
          :error="v.get('signUpData.username') != ''"
          :error-messages="v.get('signUpData.username')"
          class="field" 
          label="usuario"
        ></v-text-field>
        <v-text-field 
          v-model="signUpData.password.value" 
          :error="v.get('signUpData.password') != ''"
          :error-messages="v.get('signUpData.password')"
          class="field" 
          label="contraseña" 
          type="password"
        ></v-text-field>
        <v-text-field 
          v-model="signUpData.password2.value"
          :error="v.get('signUpData.password2') != ''"
          :error-messages="v.get('signUpData.password2')" 
          class="field" 
          label="repita contraseña" 
          type="password"
        ></v-text-field>
      </div>
      <p class="font-error font-text">{{ signUpErrors }}</p>
      <div class="login-footer">
        <v-btn @click="register()" class="button">Registrarse</v-btn>
      </div>
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
