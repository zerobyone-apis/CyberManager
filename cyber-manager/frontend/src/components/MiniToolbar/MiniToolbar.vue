<template>
  <div class="mini-toolbar">
    <div class="toolbar-items">
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
    </div>

    <div class="right-box">

      <v-icon text v-if="true" @click="changeVisualMode()">{{ themes[currentMode].icon }}</v-icon>

      <v-menu offset-y dark>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="user-btn" small color="rgb(29, 211, 29)" text>
            <v-icon>account_circle</v-icon>
            {{ $store.getters.getUsername }}
          </v-btn>
        </template>
        <v-list>
          <confirm-dialog
            dark
            v-model="showDialogExit"
            @onSelectAction="(action)=>{ action ? closeSesion() : false }"
            :info-values="confirmDialogExit"
          >
            <template v-slot:button="{ on }">
              <v-list-item v-on="on">
                <v-list-item-title>Cerrar sesion</v-list-item-title>
              </v-list-item>
            </template>
          </confirm-dialog>
        </v-list>
      </v-menu>
    </div>

    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
    >{{ notification.message }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import "./MiniToolbar.scss";
import { Component, Prop } from "vue-property-decorator";
import MiniToolbarView from "./MiniToolbar.view";
import "../../styles/CyberManager.scss";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog.vue";

interface IButton {
  text: "default-text";
  icon: "add";
  visible: true;
  disabled: false;
}

@Component({
  components: {
    ConfirmDialog
  }
})
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