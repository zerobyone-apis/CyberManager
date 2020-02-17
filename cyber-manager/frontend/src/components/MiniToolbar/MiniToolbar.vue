<template>
  <v-toolbar flat class="mini-toolbar" fixed outlined :height="height">
    <v-toolbar-title v-if="title" class="mini-toolbar_title ml-4">{{ title }}</v-toolbar-title>

    <v-toolbar-items class="toolbar-items hidden-xs-only">
      <v-btn
        v-for="(btn,index) in filtredButtons()"
        :key="index"
        :disabled="disabled ? true : btn.disabled"
        @click.native.stop="$emit('buttonClicked', index)"
        :color="colorButtons"
        text
        small
        class="toolbar-button"
      >
        <v-icon>{{ btn.icon }}</v-icon>
        <span>{{ btn.text }}</span>
      </v-btn>

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
      </div>
    </v-toolbar-items>
    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
    >{{ notification.message }}</v-snackbar>
  </v-toolbar>
</template>

<script lang="ts">
import "./MiniToolbar.scss";
import { Component, Prop } from "vue-property-decorator";
import MiniToolbarView from "./MiniToolbar.view";

interface IButton {
  text: "default-text";
  icon: "add";
  visible: true;
  disabled: false;
}

@Component({})
export default class MiniToolbar extends MiniToolbarView {
  @Prop({ default: [] }) buttons!: IButton[];
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: "50px" }) height!: string;
  @Prop({ default: undefined }) colorButtons!: string;
  @Prop({ default: "" }) title!: string;

  private filtredButtons() {
    return this.buttons.filter((button: IButton) => {
      if (button.visible === true) {
        return button;
      }
    });
  }

  // created() {
  //   console.log(this.filtredButtons())
  // }
}
</script>