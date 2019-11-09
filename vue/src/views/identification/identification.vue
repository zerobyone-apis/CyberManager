<template transition="slide-x-transition">
  <div id="identificationPage">
    <div class="identify-box">
      <div class="identify">
        <div class="service-number">
          <v-text-field
            outlined 
            dense 
            v-model="orderData.serviceNumber.value" 
            label="Orden de servicio"
          ></v-text-field>
        </div>
        <div class="reception-date">
          <v-text-field 
            outlined 
            dense 
            v-model="orderData.receptionDate.value" 
            label="Fecha de recepcion"
          ></v-text-field>
        </div>
      </div>

      <div class="client-fields-box">
        <v-text-field
          :error="v.get('clientData.name') != ''"
          :error-messages="v.get('clientData.name')"    
          outlined 
          dense 
          v-model="clientData.name.value" 
          label="Nombre del cliente"
        ></v-text-field>
        <v-text-field 
          :error="v.get('clientData.location') != ''"
          :error-messages="v.get('clientData.location')"    
          outlined 
          dense 
          v-model="clientData.location.value" 
          label="Direccion"
        ></v-text-field>
        <v-text-field 
          :error="v.get('clientData.phone') != ''"
          :error-messages="v.get('clientData.phone')"    
          outlined 
          dense 
          v-model="clientData.phone.value" 
          label="Telefono"
        ></v-text-field>
      </div>

      <div class="article-fields-box">
        <v-text-field
          :error="v.get('articleData.name') != ''"
          :error-messages="v.get('articleData.name')"     
          outlined 
          dense 
          v-model="articleData.name.value" 
          label="Articulo"
        ></v-text-field>
        <v-text-field 
          :error="v.get('articleData.brand') != ''"
          :error-messages="v.get('articleData.brand')"     
          outlined 
          dense 
          v-model="articleData.brand.value" 
          label="Marca"
        ></v-text-field>
        <v-text-field 
          :error="v.get('articleData.model') != ''"
          :error-messages="v.get('articleData.model')"  
          outlined 
          dense 
          v-model="articleData.model.value" 
          label="Modelo"
        ></v-text-field>
        <v-text-field 
          :error="v.get('articleData.serial') != ''"
          :error-messages="v.get('articleData.serial')"  
          outlined 
          dense 
          v-model="articleData.serial.value" 
          label="Nro de serie"
        ></v-text-field>
      </div>
    </div>

    <div class="orders-box">
      <v-data-table
        :height="'100%'"
        v-model="orders"
        :headers="headerOrders"
        :items="orders"
        :items-per-page="5"
        item-key="name"
        show-select
        single-select
        class="orders-table elevation-1"
      >
        <template v-slot:top>
          <div class="header-table">
            <v-btn @click="newOrder()" outlined>Nuevo</v-btn>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon :color="selectedOrder ? 'green' : 'grey'" class="mr-3" @click="editOrder(item)">edit</v-icon>
          <v-icon @click="deleteOrder(item)">delete</v-icon>
        </template>
      </v-data-table>
      
      <div class="footer-box">
        <v-btn @click="saveOrder()" class="btn-footer" small outlined>
          GUARDAR
          <v-icon>save</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="notes-box">
      <div class="damage">
        <v-textarea 
          v-model="orderData.damage.value"
          outlined 
          dense 
          name="input-7-1" 
          label="Daño reportado" 
          value
        ></v-textarea>
      </div>
      <div class="notes">
        <v-textarea 
          v-model="orderData.notes.value"
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
import AddDialog from "../../components/dialogs/addDialog/addDialog.vue";

@Component({
  components: {
    AddDialog
  }
})
export default class Repairs extends IndentificationCode {}
</script>
