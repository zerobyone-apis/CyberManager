<template transition="slide-x-transition">
  <div id="MainPage">

    <!-- INTERNAL TOOLBAR -->
    <v-toolbar fixed light height="65px">
      <v-toolbar-items class="toolbar-items hidden-xs-only">
        <v-btn text small class="toolbar-button" @click="wizard = 1">
          <v-icon>people</v-icon>
          <span>Indentificacion</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="selectedOrder == -1"
          @click="wizard = 2"
        >
          <v-icon>settings</v-icon>
          <span>Reparacion</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="selectedOrder == -1 || wizard == 2"
          @click="generateInputPdf()"
        >
          <v-icon>input</v-icon>
          <span>Entrada</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="wizard == 1"
          @click="pageRouter('/Repairs')"
        >
          <v-icon>send</v-icon>
          <span>Salida</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        
        <!-- identification frame -->
        <v-stepper-content step="1">
          <div class="identificationPage">
            <div class="identify-box">
              <p class="font-title">Datos de la Orden</p>
              <div class="identify">
                <div class="service-number">
                  <v-text-field
                    readonly
                    outlined
                    dense
                    v-model="newOrder.id"
                    label="Orden de servicio"
                  ></v-text-field>
                </div>
                <div class="reception-date">
                  <v-text-field
                    readonly
                    outlined
                    dense
                    v-model="newOrder.startDate"
                    label="recepcion"
                  ></v-text-field>
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
                <v-textarea
                  v-model="newOrder.failReported"
                  outlined
                  dense
                  name="input-7-1"
                  label="Daño reportado"
                  value
                ></v-textarea>
                <v-textarea
                  v-model="newOrder.observations"
                  outlined
                  dense
                  name="input-7-1"
                  label="Notas"
                  value
                ></v-textarea>
              </div>

              <div class="footer-box">
                <!-- DELETE THIS BUTTON (IS TEST)  -->
                <v-btn v-if="false" @click="generatePdf()">generar pdf</v-btn>

                <!-- buttons new, save, cancel a order  -->
                <v-btn
                  v-if="interactionsMode.order == 0"
                  @click="addNewOrder()"
                  :disabled="disabledButtons"
                  color="green"
                  dark
                  class="btn-footer"
                  small
                >
                  Crear Nueva Orden
                  <v-icon>add</v-icon>
                </v-btn>
                <div v-if="interactionsMode.order == 1">
                  <v-btn
                    @click="saveOrder()"
                    :disabled="disabledButtons"
                    class="btn-footer"
                    color="green"
                    dark
                    small
                  >
                    GUARDAR
                    <v-icon>save</v-icon>
                  </v-btn>

                  <v-btn
                    @click="cancelSaveOrder()"
                    :disabled="disabledButtons"
                    color="grey"
                    dark
                    small
                  >
                    Cancelar
                    <v-icon>cancel</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>

            <!-- TABLE OF ORDERS -->
            <div class="orders-box">
              <p class="font-title">Lista de Ordenes</p>
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
              <!-- footer box table  -->
            </div>
          </div>
        </v-stepper-content>

        <!-- reparation frame -->
        <v-stepper-content step="2">
          <div class="repairPage">
            <div class="identify-box">
              <div class="service-number">
                <v-text-field outlined dense v-model="newOrder.id" label="Orden de servicio"></v-text-field>
              </div>
              <div class="client-name">
                <v-text-field outlined dense v-model="newOrder.clientName" label="Cliente"></v-text-field>
              </div>
              <div class="article-name">
                <v-text-field outlined dense v-model="newOrder.article" label="Articulo"></v-text-field>
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
                <p>Otros</p>
                <v-switch v-model="others.repair" inset label="Reparar"></v-switch>
                <v-switch v-model="others.pay" inset label="Pagar"></v-switch>
                <v-switch v-model="others.deliver" inset label="Entregar"></v-switch>
                <v-switch v-model="others.other" inset label="Otro"></v-switch>
              </div>

              <div class="dates-box">
                <div class="repair-date">
                  <v-text-field outlined dense label="Fecha de reparacion"></v-text-field>
                  <v-btn  @click="" small color="green" dark>fecha</v-btn>
                </div>

                <div class="deliver-date">
                  <v-text-field outlined dense label="Fecha de entrega"></v-text-field>
                  <v-btn @click=""  small color="green" dark>fecha</v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
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
