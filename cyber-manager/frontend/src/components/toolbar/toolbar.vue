<template v-cloak>
  <v-toolbar dark v-if="$store.getters.userLogged" id="toolbar" fixed light height="65px">
    <!-- LOGO  -->
    <v-toolbar-title class="title">
      CyberManager
      <!-- <img class="logo" src="@/assets/logo.png" @click.stop="pageRouter('/')" alt="Avatar" /> -->
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

<!--  { name: "Identificacion", icon: "people", href: "/", route: "/Identification", toolbar: true },
      { name: "Reparacion", icon: "settings", href: "/", route: "/Repairs", toolbar: true },
      { name: "Entrada", icon: "input", href: "/", route: "/Repairs", toolbar: true },
      { name: "Salida", icon: "send", href: "/", route: "/Repairs", toolbar: true }, -->



    <div class="right-box">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="user-btn" small color="green" outlined text>
            <v-icon>people</v-icon>
            {{ $store.getters.getUsername }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="closeSesion()">
            <v-list-item-title>Cerrar sesion</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <p class="user-name"></p> -->
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import Vuetify from "vuetify/lib";
import ToolbarCode from "./toolbarCode";
import "./toolbarStyle.scss";
import { Watch, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Toolbar extends ToolbarCode {}
</script>