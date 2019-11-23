<template v-cloak>
  <v-toolbar v-if="$store.getters.userLogged" id="toolbar" fixed light height="65px">
    <!-- LEFT MENU - BUTTON  -->
    <v-btn
      class="left-menu-btn d-flex d-sm-none"
      @click="$store.commit('drawerLeft', true)"
      fab
      text
      small
    >
      <v-icon>menu</v-icon>
    </v-btn>

    <!-- LOGO  -->
    <v-toolbar-title>
      CyberManager
      <!-- <img class="logo" src="@/assets/logo.png" @click.stop="pageRouter('/')" alt="Avatar" /> -->
    </v-toolbar-title>

    <div class="flex-grow-1"></div>

    <v-toolbar-items class="toolbar-items hidden-xs-only">
      <v-btn
        text
        small
        class="toolbar-button"
        v-for="(item, index) in filteredConf"
        :key="index"
        :disabled="$store.getters.selectedOrder != -1"
        :v-if="item.toolbar"
        @click="pageRouter(item.route)"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.name }}</span>
      </v-btn>
    </v-toolbar-items>

    <div class="right-box">
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="user-btn" outlined small color="green" text>
            {{ $store.getters.getUsername }}
            <v-icon>dehaze</v-icon>
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