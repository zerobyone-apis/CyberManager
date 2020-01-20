<template v-cloak>
  <v-toolbar color="grey lighten-2" flat v-if="$store.getters.page != 'Home'" id="toolbar" fixed light height="50px">
    <!-- LOGO  -->
    <v-toolbar-title class="title">
      CyberManager
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

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
import ToolbarCode from "./toolbarCode";
import "./toolbarStyle.scss";
import { Watch, Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Toolbar extends ToolbarCode {}
</script>