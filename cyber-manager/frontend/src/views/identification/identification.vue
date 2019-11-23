<template transition="slide-x-transition">
  <div id="identificationPage">
    <div class="identify-box">
      <div class="identify">
        <div class="service-number">
          <v-text-field readonly outlined dense v-model="newOrder.id" label="Orden de servicio"></v-text-field>
        </div>
        <div class="reception-date">
          <v-text-field readonly outlined dense v-model="newOrder.startDate" label="recepcion"></v-text-field>
        </div>
      </div>

      <div class="client-fields-box">
        <p class="font-title">Datos del cliente</p>
        <v-text-field
          :error="v.get('newOrder.clientName') != ''"
          :error-messages="v.get('newOrder.clientName')"
          outlined
          dense
          v-model="newOrder.clientName"
          label="Nombre del cliente"
        ></v-text-field>
        <v-text-field
          :error="v.get('newOrder.clientPhone') != ''"
          :error-messages="v.get('newOrder.clientPhone')"
          outlined
          dense
          v-model="newOrder.clientPhone"
          label="Telefono"
        ></v-text-field>
      </div>

      <div class="article-fields-box">
        <p class="font-title">Datos del articulo</p>
        <v-text-field
          :error="v.get('newOrder.article') != ''"
          :error-messages="v.get('newOrder.article')"
          outlined
          dense
          v-model="newOrder.article"
          label="Articulo"
        ></v-text-field>
        <v-text-field
          :error="v.get('newOrder.brand') != ''"
          :error-messages="v.get('newOrder.brand')"
          outlined
          dense
          v-model="newOrder.brand"
          label="Marca"
        ></v-text-field>
        <v-text-field
          :error="v.get('newOrder.model') != ''"
          :error-messages="v.get('newOrder.model')"
          outlined
          dense
          v-model="newOrder.model"
          label="Modelo"
        ></v-text-field>
      </div>
    </div>

    <!-- TABLE OF ORDERS -->
    <div class="orders-box">
      <v-data-table
        :height="'100%'"
        :v-model="orders.getArray()"
        :headers="headerOrders"
        :items="orders.getArray()"
        :items-per-page="8"
        item-key="id"
        show-select
        single-select
        class="orders-table elevation-0"
      >
        <template v-slot:item.action="{ item }">
          <!-- button edit item in orders table -->
          {{ interactionsMode.order }}
          <v-icon
            :disabled="interactionsMode.order == 1"
            class="mr-3"
            @click="editNewOrder(item)"
          >edit</v-icon>

          <!-- button delete selected order  -->
          <!-- :color="changeColorToEdit(item)" -->
          <v-icon 
            :disabled="(interactionsMode.order == 1) && (selectedOrder != orders.getArray().indexOf(item))"
            @click="deleteOrder(item)"
          >delete</v-icon>

        </template>
        <span>Borrar orden</span>
      </v-data-table>

      <div class="footer-box">
        <!-- DELETE THIS BUTTON (IS TEST)  -->
        <v-btn v-if="false" @click="generatePdf()">generar pdf</v-btn>

        <!-- buttons new, save, cancel a order  -->
        <v-btn
          v-if="interactionsMode.order == 0"
          @click="addNewOrder()"
          :disabled="disabledButtons"
          color="green"
          class="btn-footer"
          small
        >
          Nuevo
          <v-icon>add</v-icon>
        </v-btn>
        <div v-if="interactionsMode.order == 1">
          <v-btn @click="saveOrder()" :disabled="disabledButtons" class="btn-footer" small outlined>
            GUARDAR
            <v-icon>save</v-icon>
          </v-btn>

          <v-btn @click="cancelSaveOrder()" :disabled="disabledButtons" small outlined>
            Cancelar
            <v-icon>cancel</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <div class="notes-box">
      <div class="damage">
        <v-textarea
          v-model="newOrder.failReported"
          outlined
          dense
          name="input-7-1"
          label="Daño reportado"
          value
        ></v-textarea>
      </div>
      <div class="notes">
        <v-textarea
          v-model="newOrder.observations"
          outlined
          dense
          name="input-7-1"
          label="Notas"
          value
        ></v-textarea>
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

@Component({
  components: {}
})
export default class Repairs extends IndentificationCode {
  created() {
    this.init();
  }
}
</script>
