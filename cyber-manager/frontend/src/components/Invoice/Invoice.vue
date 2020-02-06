<template>
  <div class="invoice-page">
    <div class="banner">
      <p class="small-font">{{ enterprise.enterpriseName || 'enterprise name' }}</p>
      <p class="small-font">{{ enterprise.location || 'location' }}</p>
      <p class="small-font">{{ enterprise.phone || 'phone' }}</p>
      <p class="small-font">{{ enterprise.cellPhone || 'cellphone' }}</p>
    </div>

    <div class="container">
      <v-container class="grey lighten-5">
        <v-row no-gutters>
          <v-col lg="12">
            <v-card outlined class="small-font">
              <v-row no-gutters>
                <v-col lg="4">
                  <v-card class="pa-2 small-font" outlined tile>Orden nro: {{ order.id }}</v-card>
                </v-col>
                <v-col lg="4">
                  <v-card
                    class="pa-2 small-font"
                    outlined
                    tile
                  >Fecha: {{ order.admissionDateFront }}</v-card>
                </v-col>
                <v-col lg="4">
                  <v-card class="pa-2 small-font" outlined tile>Cliente: {{ order.clientName }}</v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="mb-3" no-gutters>
          <v-row class="mt-3" no-gutters>
            <v-col lg="4">
              <v-card class="pa-2 small-font" outlined tile>Articulo: {{ order.article }}</v-card>
            </v-col>
            <v-col lg="4">
              <v-card class="pa-2 small-font" outlined tile>Marca: {{ order.brand }}</v-card>
            </v-col>
            <v-col lg="4">
              <v-card class="pa-2 small-font" outlined tile>Modelo: {{ order.model }}</v-card>
            </v-col>
          </v-row>
        </v-row>

        <v-row class="mb-3" no-gutters>
          <v-col cols="12">
            <v-card class="pa-6 small-font" outlined tile>Falla: {{ order.reportedFailure }}</v-card>
          </v-col>
          <v-col cols="12">
            <v-card class="pa-6 small-font" outlined tile>Observaciones: {{ order.observations }}</v-card>
          </v-col>
        </v-row>

        <v-row class="mb-6" justify="end" no-gutters>
          <v-col class="mt-3" cols="4">
            <v-card
              class="pa-3 small-font"
              outlined
              tile
            >Firma del cliente: __________________________________________</v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import InvoiceView from "./Invoice.view";
import "./Invoice.scss";

import { IOrder } from "../../types/Order.type";
import { IEnterprise } from "../../types/Enterprise.type";

@Component({})
export default class Invoice extends InvoiceView {
  @Prop({
    default: {
    }
  })
  order!: IOrder;
  @Prop({
    default: {
    }
  })
  enterprise!: IEnterprise;
}
</script>