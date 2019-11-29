<template transition="slide-x-transition">
  <div id="MainPage">
    <!-- INTERNAL TOOLBAR -->
    <v-toolbar class="mini-toolbar" fixed dark flat height="50px">
      <v-toolbar-items class="toolbar-items hidden-xs-only">
        <v-btn text small class="toolbar-button" @click="wizard = 1">
          <v-icon>people</v-icon>
          <span>Indentificacion</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="selectedPedido == -1"
          @click="wizard = 2"
        >
          <v-icon>settings</v-icon>
          <span>Reparacion</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="selectedPedido == -1 || wizard != 1"
          @click="generateInputPdf()"
        >
          <v-icon>input</v-icon>
          <span>Entrada</span>
        </v-btn>

        <v-btn text small class="toolbar-button" :disabled="wizard != 2 " @click>
          <v-icon>send</v-icon>
          <span>Salida</span>
        </v-btn>

        <v-btn
          v-if="$store.getters.getCharge == 'Supervisor'"
          @click="wizard = 3"
          text
          small
          class="toolbar-button"
        >
          <v-icon>home</v-icon>
          <span>Empresa</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <!-- identification frame -->
        <v-stepper-content step="1">
          <div class="identificationPage">
            <div class="identify-box">
              <h3 class="font-title pl-2">Datos de la Orden</h3>
              <div class="identify">
                <div class="service-number">
                  <v-text-field
                    readonly
                    v-model="newPedido.idOrden"
                    label="Orden de servicio"
                    class="custom-field"
                  ></v-text-field>
                </div>
                <div class="reception-date">
                  <v-text-field
                    readonly
                    v-model="newPedido.startDate"
                    label="recepcion"
                    class="custom-field"
                  ></v-text-field>
                </div>
              </div>

              <div class="client-fields-box">
                <!-- <h4 class="font-title">Datos del cliente</h4> -->
                <v-text-field
                  :error="v.get('newPedido.clientName') != ''"
                  :error-messages="v.get('newPedido.clientName')"
                  outlined
                  dense
                  v-model="newPedido.clientName"
                  label="Nombre del cliente"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newPedido.clientPhone') != ''"
                  :error-messages="v.get('newPedido.clientPhone')"
                  outlined
                  dense
                  v-model="newPedido.clientPhone"
                  label="Telefono"
                  class="custom-field"
                ></v-text-field>
              </div>

              <div class="article-fields-box">
                <v-text-field
                  :error="v.get('newPedido.article') != ''"
                  :error-messages="v.get('newPedido.article')"
                  outlined
                  dense
                  v-model="newPedido.article"
                  label="Articulo"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newPedido.brand') != ''"
                  :error-messages="v.get('newPedido.brand')"
                  outlined
                  dense
                  v-model="newPedido.brand"
                  label="Marca"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newPedido.model') != ''"
                  :error-messages="v.get('newPedido.model')"
                  outlined
                  dense
                  v-model="newPedido.model"
                  label="Modelo"
                  class="custom-field"
                ></v-text-field>

                <!-- TEXT AREA  -->

                <v-textarea
                  v-model="newPedido.failReported"
                  height="40"
                  label="Daño reportado"
                  value
                  class="custom-text-area"
                ></v-textarea>
                <v-textarea
                  v-model="newPedido.observations"
                  height="40"
                  label="Notas"
                  value
                  class="custom-text-area"
                ></v-textarea>
              </div>

              <div class="footer-box">
                <!-- DELETE THIS BUTTON (IS TEST)  -->
                <v-btn v-if="false" @click="generatePdf()">generar pdf</v-btn>

                <!-- buttons new, save, cancel a order  -->
                <v-btn
                  v-if="interactionsMode.order == 0"
                  @click="addnewPedido()"
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
              <h3 class="font-title">Lista de Ordenes</h3>
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
                    @click="editnewPedido(item)"
                  >edit</v-icon>

                  <!-- button delete selected order  -->
                  <!-- :color="changeColorToEdit(item)" -->
                  <v-icon
                    :disabled="(interactionsMode.order == 1) && (selectedPedido != orders.getArray().indexOf(item))"
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
                <v-text-field
                  v-model="newPedido.id"
                  readonly
                  label="Orden de servicio"
                  class="custom-field"
                ></v-text-field>
              </div>
              <div class="client-name">
                <v-text-field
                  v-model="newPedido.clientName"
                  readonly
                  label="Cliente"
                  class="custom-field"
                ></v-text-field>
              </div>
              <div class="article-name">
                <v-text-field
                  v-model="newPedido.article"
                  readonly
                  label="Articulo"
                  class="custom-field"
                ></v-text-field>
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
                  <time-field
                    v-model="newPedido.reparation"
                    @time="(time)=> { newPedido.reparation = time }"
                    type="date"
                    :error="v.get('newPedido.reparation') != ''"
                    :errorMessage="v.get('newPedido.reparation')"
                    label="Fecha de recepcion"
                    lang="es"
                  ></time-field>
                  <v-btn @click small color="green" dark>fecha</v-btn>
                </div>

                <div class="deliver-date">
                  <v-text-field outlined dense label="Fecha de entrega"></v-text-field>
                  <v-btn @click small color="green" dark>fecha</v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>

        <!-- enterprise frame -->
        <v-stepper-content step="3">
          <div class="enterprisePage">
            <div class="info-box">
              <div class="info-fields">
                <h3 class="font-title pl-2">Datos generales de la empresa</h3>
                <v-text-field
                  v-model="enterprise.name"
                  label="Nombre de la empresa"
                  class="custom-field"
                ></v-text-field>

                <v-text-field v-model="enterprise.direccion" label="Direccion" class="custom-field"></v-text-field>
                <v-text-field v-model="enterprise.telefono" label="Telefono" class="custom-field"></v-text-field>
                <v-text-field v-model="enterprise.celular" label="Celular" class="custom-field"></v-text-field>
                <v-text-field v-model="enterprise.email" label="Email" class="custom-field"></v-text-field>
              </div>
              <div class="image-box">
                <v-text-field
                  v-model="enterprise.urlLogo"
                  label="Url del logo"
                  class="custom-field"
                ></v-text-field>
                <img :src="enterprise.urlLogo" height="300" v-if="enterprise.urlLogo" />
              </div>
            </div>
            <div class="pdf-fields">
              <v-text-field
                v-model="enterprise.garantia"
                label="Garantia en las facturas"
                class="custom-field"
              ></v-text-field>
              <v-text-field label="Anotacion en el pie del reporte de entrada" class="custom-field"></v-text-field>
              <v-text-field label="Anotacion en el pie del reporte de salida" class="custom-field"></v-text-field>
            </div>
            <div class="footer">
              <v-btn
                @click="saveEnterpriseInfo()"
                :disabled="disabledButtons"
                class="btn-footer"
                color="green"
                dark
                small
              >
                GUARDAR
                <v-icon>save</v-icon>
              </v-btn>

              <v-btn @click :disabled="disabledButtons" color="grey" dark small>
                Cancelar
                <v-icon>cancel</v-icon>
              </v-btn>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

  </div>
</template>

<script lang="ts">
// code
import IndentificationCode from "./identificationCode";
// style
import "./identificationStyle.scss";
import "../../styles/fonts.scss";
import TimeField from "../../components/TimeField/TimeField.vue";
// components
import { Component } from "vue-property-decorator";

@Component({
  components: {
    TimeField
  }
})
export default class Repairs extends IndentificationCode {
  created() {
    this.init();
  }
}
</script>
