<template transition="slide-x-transition">
  <div id="homePage">
    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <v-stepper-content step="1">
          <!-- SIGN IN -->
          <div class="box-access">
            <h4 class="font-title title">Acceda para utilizar CyberManager</h4>

            <v-select
              v-model="user.cargo"
              :items="charges"
              :error="v.get('user.cargo') != ''"
              :error-messages="v.get('user.cargo')"
              label="Cargo"
              outlined
            ></v-select>

            <v-text-field
              v-model="user.username"
              :error="v.get('user.username') != ''"
              :error-messages="v.get('user.username')"
              class="field"
              label="Usuario"
            ></v-text-field>
            <v-text-field
              v-model="user.passwd"
              :error="v.get('user.passwd') != ''"
              :error-messages="v.get('user.passwd')"
              class="field"
              type="password"
              label="Contraseña"
            ></v-text-field>

            <div class="footer">
              <v-btn @click="signIn()" class="button">Acceder</v-btn>
            </div>

            <div class="signup-button">
              <p>No tiene cuenta? Registrese aqui</p>
              <v-btn @click="goToStep(2)">
                Registrase Aqui
                <v-icon>people</v-icon>
              </v-btn>
            </div>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <!-- SIGN UP -->
          <div class="box-access register-box">
            <div class="login-fields">
              <h4 class="font-title title">Registrese Aqui</h4>

              <v-select
                v-model="createUser.cargo"
                :items="charges"
                :error="v.get('createUser.cargo') != ''"
                :error-messages="v.get('createUser.cargo')"
                label="Cargo"
                outlined
              ></v-select>

              <v-text-field
                v-model="createUser.username"
                :error="v.get('createUser.username') != ''"
                :error-messages="v.get('createUser.username')"
                class="field"
                label="Usuario"
              ></v-text-field>

              <v-text-field
                v-model="createUser.passwd"
                :error="v.get('createUser.passwd') != ''"
                :error-messages="v.get('createUser.passwd')"
                class="field"
                label="Contraseña"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="createUser.passwd2"
                :error="v.get('createUser.passwd2') != ''"
                :error-messages="v.get('createUser.passwd2')"
                class="field"
                label="Repita contraseña"
                type="password"
              ></v-text-field>
            </div>
            <!-- <p class="font-error font-text">{{ signUpErrors }}</p> -->
            <div class="footer">
              <v-btn small @click="goToStep(1)" class="mr-3">
                <v-icon>arrow_back</v-icon>Volver
              </v-btn>
              <v-btn @click="signUp()" class="button">Registrarse</v-btn>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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

@Component({
  components: {
  }
})
export default class Home extends HomeCode {}
</script>
