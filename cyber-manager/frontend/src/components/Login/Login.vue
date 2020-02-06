<template>
  <div id="login-box">
    <h1 class="mb-6 organize__font-title">Login</h1>
    <v-form :ref="ON_SIGNIN">
      <v-text-field
        v-model="userSignIn.username"
        :rules="fieldRules"
        class="organize__text-field"
        label="usuario"
        dense
      />
      <v-text-field
        v-model="userSignIn.password"
        :rules="fieldRules"
        class="organize__text-field organize__text-field_button"
        label="constraseña"
        type="password"
        dense
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

    <h2 class="mb-6 organize__font-title">registrese aqui</h2>

    <v-form :ref="ON_SIGNUP">
      <v-select
        v-if="charges"
        v-model="userSignUp.charge"
        :items="charges"
        :rules="fieldRules"
        class="organize__select-field"
        label="Cargo"
        dense
      ></v-select>

      <v-text-field
        v-model="userSignUp.username"
        :rules="fieldRules"
        class="organize__text-field"
        label="nombre de usuario"
        dense
      />

      <v-text-field
        v-model="userSignUp.password"
        :rules="fieldRules"
        class="organize__text-field"
        label="contraseña"
        type="password"
        dense
      />
      <v-text-field
        v-model="userSignUp.repeatPassword"
        :rules="passwordRules"
        class="organize__text-field"
        label="repita contraseña"
        type="password"
        dense
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

@Component({})
export default class Login extends LoginActions {
  @Prop({ default: false }) charges!: string[];
}
</script>
