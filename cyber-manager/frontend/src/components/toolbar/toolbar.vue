<template v-cloak>
  <v-toolbar 
    v-if="!$store.getters.drawerLeft"
    id="toolbar" 
    fixed 
    light 
    height="65px">

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
    <v-toolbar-title @click.stop="pageRouter('/')">
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
      <v-btn outlined fab small color="green" text>
        <v-icon>people</v-icon>
      </v-btn>
      <p>{{ $store.getters.getUsername }}</p>
      <!-- <v-btn
        outlined
        @click.native.stop="reservationDialog = true"
        class="toolbar-button-reservation"
        :class="{'reservation-mobile' : $vuetify.breakpoint.name == 'xs'}"
      >RESERVAR</v-btn>-->
    </div>

    <!-- dialogs -->
    <reservation-dialog v-model="reservationDialog"></reservation-dialog>
  </v-toolbar>
</template>

<script lang="ts">
import Vuetify from "vuetify/lib";
import ToolbarCode from "./toolbarCode";
import "./toolbarStyle.scss";
import { Watch, Component } from "vue-property-decorator";
import AddDialog from "../../components/dialogs/addDialog/addDialog.vue";
import ReservationDialog from "../dialogs/ReservationDialog/ReservationDialog.vue";

@Component({
  components: {
    AddDialog,
    ReservationDialog
  }
})
export default class Toolbar extends ToolbarCode {}
</script>