<template transition="slide-x-transition">
  <div id="home-page">
    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <v-stepper-content step="1">
          <!-- SIGN IN -->
          <div class="box-access">
            <h4 class="font-title title">Acceda para utilizar CyberManager</h4>

            <v-select
              v-model="user.charge"
              :items="charges"
              :error="v.get('user.charge') != ''"
              :error-messages="v.get('user.charge')"
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
              <v-btn depressed @click="signIn()" class="button">Acceder</v-btn>
            </div>

            <div class="signup-button">
              <p>No tiene cuenta? Registrese aqui</p>
              <v-btn depressed @click="goToStep(2)">
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
                v-model="createUser.charge"
                :items="charges"
                :error="v.get('createUser.charge') != ''"
                :error-messages="v.get('createUser.charge')"
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
              <v-btn depressed @click="goToStep(1)" class="mr-3">
                <v-icon>arrow_back</v-icon>Volver
              </v-btn>
              <v-btn depressed @click="signUp()" class="button">Registrarse</v-btn>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>

      <v-snackbar
        v-model="notification.visible"
        :color="notification.color"
      >{{ notification.message }}</v-snackbar>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import HomeView from "./Home.view";
import "./Home.scss";
import "../../styles/fonts.scss";
import { Component } from "vue-property-decorator";

@Component({})
export default class Home extends HomeView {}
</script>
