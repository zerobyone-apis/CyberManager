<template transition="slide-x-transition">
  <div id="repairsPage">
    <div class="identify-box">
      <div class="service-number">
        <v-text-field outlined dense v-model="serviceNumber" label="Orden de servicio"></v-text-field>
      </div>
      <div class="client-name">
        <v-text-field outlined dense v-model="client.name" label="Cliente"></v-text-field>
      </div>
      <div class="article-name">
        <v-text-field outlined dense v-model="article.name" label="Articulo"></v-text-field>
      </div>
    </div>

    <div class="diagnosis-box">
      <v-textarea outlined dense name="input-7-1" label="Reparacion" value></v-textarea>
    </div>

    <div class="garanty-box">
      <v-text-field outlined dense label="Garantia"></v-text-field>
    </div>

    <div class="technical-box">
      <v-text-field outlined dense label="Tecnico"></v-text-field>
      <!-- <v-select></v-select> -->
    </div>

    <div class="content-box">
      <div class="others-box">
        <v-switch v-model="others.repair" inset label="Reparar"></v-switch>
        <v-switch v-model="others.pay" inset label="Pagar"></v-switch>
        <v-switch v-model="others.deliver" inset label="Entregar"></v-switch>
        <v-switch v-model="others.other" inset label="Otro"></v-switch>
      </div>
      
      <div class="dates-box">
        <div class="repair-date">
          <v-text-field outlined dense label="Fecha de reparacion"></v-text-field>
          <v-btn>F</v-btn>
        </div>

        <div class="deliver-date">
          <v-text-field outlined dense label="Fecha de entrega"></v-text-field>
          <v-btn>F</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//code
import RepairsCode from "./repairsCode";
//style
import "./repairsStyle.scss";
import "../../styles/fonts.scss";
//components
import { Component } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class Repairs extends RepairsCode {}
</script>
