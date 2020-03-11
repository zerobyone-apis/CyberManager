<template>
  <div class="footer">
    <div class="content">
      <v-btn
        v-if="!saveMode"
        @click="$emit('add')"
        :disabled="disabled"
        class="button-footer"
        color="green"
        small
        depressed
        dark
      >
        {{ addText }}
        <v-icon>{{ addIcon }}</v-icon>
      </v-btn>

      <v-btn
        v-if="saveMode"
        @click="$emit('save')"
        :disabled="disabled"
        class="button-footer"
        color="green"
        small
        depressed
        dark
      >
        {{ saveText }}
        <v-icon>{{ saveIcon }}</v-icon>
      </v-btn>

      <slot name="cancelButton" :saveMode="saveMode" :disabled="disabled">
        <v-btn
          v-if="saveMode"
          @click="$emit('cancel')"
          :disabled="disabled"
          class="button-footer"
          color="grey"
          small
          depressed
          dark
        >
          {{ cancelText }}
          <v-icon>{{ cancelIcon }}</v-icon>
        </v-btn>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component } from "vue-property-decorator";
import FooterView from "./Footer.view";
import "./Footer.scss";
@Component({})
export default class Footer extends FooterView {
  @Prop({ default: false }) saveMode!: boolean;
  @Prop({ default: "Crear" }) addText!: string;
  @Prop({ default: "Guardar" }) saveText!: string;
  @Prop({ default: "Cancelar" }) cancelText!: string;

  @Prop({ default: "" }) addIcon!: string;
  @Prop({ default: "save" }) saveIcon!: string;
  @Prop({ default: "cancel" }) cancelIcon!: string;
  @Prop({ default: false }) disabled!: boolean;
}
</script>
