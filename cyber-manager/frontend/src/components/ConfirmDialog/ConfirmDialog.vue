<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on }">
      <slot name="button" :on="on">
        <v-btn color="grey" small depressed dark v-on="on">{{ infoValues.buttonActivator }}</v-btn>
      </slot>
    </template>
    <v-card :dark="dark" class="card">
      <v-card-title class="headline">{{ infoValues.title }}</v-card-title>
      <v-card-text>{{ infoValues.info }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          small
          depressed
          dark
          text
          @click="disagreeAction()"
        >{{ infoValues.disagreeText }}</v-btn>
        <v-btn color="green darken-1" text @click="agreeAction()">{{ infoValues.agreeText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import "./ConfirmDialog.scss";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConfirmDialogView from "./ConfirmDialog.view";
import "../../styles/CyberManager.scss";
import IConfirmDialog from "./ConfirmDialog.view";

@Component({})
export default class ConfirmDialog extends ConfirmDialogView {
  @Prop({ default: false }) value!: boolean;
  @Prop({
    default: {
      title: "",
      info: "",
      agreeText: "",
      disagreeText: "",
      buttonActivator: ""
    }
  })
  infoValues!: IConfirmDialog;
  @Prop({default: false}) dark!: boolean;

  private dialog: boolean = false;
  private EVENT_ACTION: string = "onSelectAction";

  @Watch("value")
  onChangeValue() {
    this.dialog = this.value;
  }

  agreeAction() {
    this.dialog = false;
    this.$emit(this.EVENT_ACTION, true);
    this.$emit("input", false);
  }

  disagreeAction() {
    this.dialog = false;
    this.$emit(this.EVENT_ACTION, false);
    this.$emit("input", false);
  }
}
</script>