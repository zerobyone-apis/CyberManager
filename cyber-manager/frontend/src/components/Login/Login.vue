<template>
  <div
    id="login-box"
    :class="`cyber_manager-background_${$store.getters.theme} cyber_manager-window_${$store.getters.theme}`"
  >
    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <!-- login step -->
        <v-stepper-content step="0">
          <div class="step-content">
            <h1 class="mb-6 cyber_manager-title">Login</h1>
            <v-form :ref="ON_SIGNIN">
              <v-text-field
                v-model="userSignIn.username"
                :dark="$store.getters.theme == 'dark'"
                :rules="fieldRules"
                class="cyber_manager-text_field"
                label="Usuario"
              />

              <v-text-field
                v-model="userSignIn.password"
                :rules="fieldRules"
                :dark="$store.getters.theme == 'dark'"
                class="cyber_manager-text_field"
                label="Constraseña"
                type="password"
              ></v-text-field>

              <v-btn
                @click="signIn()"
                :disabled="disabledButtons"
                :dark="!disabledButtons"
                class="mt-4 mb-4 organize__button"
                color="green darken-3"
                small
                depressed
              >Acceder</v-btn>

              <div class="button-register">
                <p>Si no tiene una cuenta</p>
                <v-btn
                  @click="wizard = 1"
                  :dark="!disabledButtons"
                  class="organize__button"
                  color="green darken-3"
                  small
                  depressed
                  outlined
                >Registrarse Aqui</v-btn>
              </div>

            </v-form>
          </div>
        </v-stepper-content>
        <!-- register step -->
        <v-stepper-content step="1">
          <div class="step-content">
            <h2 class="mb-6 cyber_manager-title">Registrese aqui</h2>

            <v-form :ref="ON_SIGNUP">
              <v-select
                v-if="charges"
                v-model="userSignUp.charge"
                :items="charges"
                :dark="$store.getters.theme == 'dark'"
                :rules="fieldRules"
                class="organize__select-field"
                label="Cargo"
              ></v-select>

              <v-text-field
                v-model="userSignUp.username"
                :dark="$store.getters.theme == 'dark'"
                :rules="fieldRules"
                class="cyber_manager-text_field"
                label="Nombre de usuario"
              />

              <v-text-field
                v-model="userSignUp.password"
                :rules="fieldRules"
                :dark="$store.getters.theme == 'dark'"
                class="cyber_manager-text_field"
                label="Contraseña"
                type="password"
              />
              <v-text-field
                v-model="userSignUp.repeatPassword"
                :rules="passwordRules"
                :dark="$store.getters.theme == 'dark'"
                class="cyber_manager-text_field"
                label="Repita contraseña"
                type="password"
              />
              <v-btn
                @click="signUp()"
                :disabled="disabledButtons"
                :dark="!disabledButtons"
                class="mt-4 organize__button"
                color="green darken-3"
                depressed
                small
              >Registrarse</v-btn>

              <v-btn
                @click="wizard = 0"
                :dark="!disabledButtons"
                class="mt-4 mb-4 organize__button"
                small
                depressed
              >Volver</v-btn>
            </v-form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import LoginActions from "./Login.actions";
import "./Login.scss";
import "../../styles/CyberManager.scss";

@Component({
  components: {}
})
export default class Login extends LoginActions {
  @Prop({ default: false }) charges!: string[];
}
</script>
