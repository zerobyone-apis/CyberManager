<template transition="slide-x-transition">
  <div id="identificationPage">
    <div class="identify-box">
      <div class="identify">
        <div class="service-number">
          <v-text-field outlined dense v-model="serviceNumber" label="Orden de servicio"></v-text-field>
        </div>
        <div class="reception-date">
          <v-text-field outlined dense v-model="reception.date" label="Fecha de recepcion"></v-text-field>
        </div>
      </div>

      <div class="client-fields-box">
        <v-text-field outlined dense v-model="client.name" label="Nombre del cliente"></v-text-field>
        <v-text-field outlined dense v-model="client.location" label="Direccion"></v-text-field>
        <v-text-field outlined dense v-model="client.phone" label="Telefono"></v-text-field>
      </div>

      <div class="article-fields-box">
        <v-text-field outlined dense v-model="article.name" label="Articulo"></v-text-field>
        <v-text-field outlined dense v-model="article.brand" label="Marca"></v-text-field>
        <v-text-field outlined dense v-model="article.model" label="Modelo"></v-text-field>
        <v-text-field outlined dense v-model="article.serial" label="Nro de serie"></v-text-field>
      </div>
    </div>

    <div class="orders-box">
      <v-data-table
        :height="'100%'"
        :v-model="orders"
        :headers="headerOrders"
        :items="orders"
        :items-per-page="5"
        single-select
        item-key="name"
        show-select
        class="elevation-1"
      >
        <template v-slot:top>
          <div class="header-table">
            <v-btn outlined>Nuevo</v-btn>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon class="mr-3" @click="editOrder(item)">edit</v-icon>
          <v-icon @click="deleteOrder(item)">delete</v-icon>
        </template>
      </v-data-table>
      

      <div class="footer-box">
        <v-btn class="btn-footer" small outlined>
          GUARDAR
          <v-icon>save</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="notes-box">
      <div class="damage">
        <v-textarea outlined dense name="input-7-1" label="Daño reportado" value></v-textarea>
      </div>
      <div class="notes">
        <v-textarea outlined dense name="input-7-1" label="Notas" value></v-textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//code
import IndentificationCode from "./identificationCode";
//style
import "./identificationStyle.scss";
import "../../styles/fonts.scss";
//components
import { Component } from "vue-property-decorator";
import AddDialog from "../../components/dialogs/addDialog/addDialog.vue";

@Component({
  components: {
    AddDialog
  }
})
export default class Repairs extends IndentificationCode {}
</script>
