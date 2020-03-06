<template>
  <div id="login-box" class="cyber_manager-dark_background">
    <h1 class="mb-6 cyber_manager-title">Login</h1>
    <v-form :ref="ON_SIGNIN">
      <v-text-field
        v-model="userSignIn.username"
        :rules="fieldRules"
        class="cyber_manager-text_field"
        label="Usuario"
        dense
        dark
      />
      <v-text-field
        v-model="userSignIn.password"
        :rules="fieldRules"
        class="cyber_manager-text_field"
        label="Constraseña"
        type="password"
        dense
        dark
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
        :rules="fieldRules"
        class="organize__select-field"
        label="Cargo"
        dense
        dark
      ></v-select>

      <v-text-field
        v-model="userSignUp.username"
        :rules="fieldRules"
        class="cyber_manager-text_field"
        label="Nombre de usuario"
        dense
        dark
      />

      <v-text-field
        v-model="userSignUp.password"
        :rules="fieldRules"
        class="cyber_manager-text_field"
        label="Contraseña"
        type="password"
        dense
        dark
      />
      <v-text-field
        v-model="userSignUp.repeatPassword"
        :rules="passwordRules"
        class="cyber_manager-text_field"
        label="Repita contraseña"
        type="password"
        dense
        dark
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
