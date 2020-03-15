<template>
  <div id="login-box" :class="`cyber_manager-background_${$store.getters.theme} cyber_manager-window_${$store.getters.theme}`">
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
        color="green"
        small
        depressed
      >Acceder</v-btn>
    </v-form>

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
        color="green"
        depressed
        small
      >Registrarse</v-btn>
    </v-form>
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
