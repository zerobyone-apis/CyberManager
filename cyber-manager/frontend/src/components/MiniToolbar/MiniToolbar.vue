<template>
  <v-toolbar flat class="mini-toolbar" fixed outlined :height="height">
    <v-toolbar-title v-if="title" class="mini-toolbar_title ml-4">{{ title }}</v-toolbar-title>
    
    <v-toolbar-items class="toolbar-items hidden-xs-only">
      <v-btn
        v-for="(btn,index) in buttons"
        :key="index"
        :v-if="btn.visible"
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
    </v-toolbar-items>
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
  @Prop({ default: '' }) title!: string; 
}
</script>