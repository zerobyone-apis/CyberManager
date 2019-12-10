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
          :disabled="pedido.selectedPedido == -1"
          @click="wizard = 2"
        >
          <v-icon>settings</v-icon>
          <span>Reparacion</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="pedido.selectedPedido == -1 || wizard != 1"
          @click="generateInputPdf()"
        >
          <v-icon>input</v-icon>
          <span>Entrada</span>
        </v-btn>

        <v-btn
          text
          small
          class="toolbar-button"
          :disabled="wizard != 2"
          @click="generateOutputPdf()"
        >
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
                    v-model="pedido.newPedido.idOrden"
                    label="Orden de servicio"
                    class="custom-field"
                  ></v-text-field>
                </div>
                <div class="reception-date">
                  <v-text-field
                    readonly
                    v-model="pedido.newPedido.fechaIngreso"
                    label="recepcion"
                    class="custom-field"
                  ></v-text-field>
                </div>
              </div>

              <div class="client-fields-box">
                <!-- <h4 class="font-title">Datos del cliente</h4> -->
                <v-text-field
                  :error="v.get('pedido.newPedido.nombreCliente') != ''"
                  :error-messages="v.get('pedido.newPedido.nombreCliente')"
                  outlined
                  dense
                  v-model="pedido.newPedido.nombreCliente"
                  label="Nombre del cliente"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('pedido.newPedido.telCliente') != ''"
                  :error-messages="v.get('pedido.newPedido.telCliente')"
                  outlined
                  dense
                  v-model="pedido.newPedido.telCliente"
                  label="Telefono"
                  class="custom-field"
                ></v-text-field>
              </div>

              <div class="article-fields-box">
                <v-text-field
                  :error="v.get('pedido.newPedido.articulo') != ''"
                  :error-messages="v.get('pedido.newPedido.articulo')"
                  outlined
                  dense
                  v-model="pedido.newPedido.articulo"
                  label="Articulo"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('pedido.newPedido.marca') != ''"
                  :error-messages="v.get('pedido.newPedido.marca')"
                  outlined
                  dense
                  v-model="pedido.newPedido.marca"
                  label="Marca"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('pedido.newPedido.modelo') != ''"
                  :error-messages="v.get('pedido.newPedido.modelo')"
                  outlined
                  dense
                  v-model="pedido.newPedido.modelo"
                  label="Modelo"
                  class="custom-field"
                ></v-text-field>

                <!-- TEXT AREA  -->
                <v-textarea
                  v-model="pedido.newPedido.fallReportada"
                  height="40"
                  label="Daño reportado"
                  value
                  class="custom-text-area"
                ></v-textarea>
                <v-textarea
                  v-model="pedido.newPedido.observaciones"
                  height="40"
                  label="Notas"
                  value
                  class="custom-text-area"
                ></v-textarea>
              </div>

              <div class="footer-box">
                <!-- buttons new, save, cancel a order  -->
                <v-btn
                  v-if="interactionsMode.order == 0"
                  @click="addPedido()"
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
                    @click="savePedido()"
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
                    @click="cancelSavePedido()"
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

            <!-- TABLE OF pedidos -->
            <div class="pedidos-box">
              <h3 class="font-title">Lista de Ordenes</h3>
              <div class="search-box">
                
                <div class="select">
                  <v-select
                    v-model="search.filter" 
                    label="Buscar por" :items="Object.keys(searchFilters)" item-value="text" defa></v-select>
                </div>
                <div class="field">
                  <v-text-field
                    v-model="search.value"
                    append-icon="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </div>
              </div>

              <div class="table-box">
                <v-data-table
                  height="100%"
                  :v-model="pedido.pedidos.getArray()"
                  :headers="headerPedido"
                  :items="filterItems()"
                  :items-per-page="500"
                  item-key="idOrden"
                  show-select
                  hide-default-footer
                  single-select
                  class="pedidos-table elevation-0"
                >
                  <template v-slot:item.data-table-select="{ item, select }">
                    <!-- button edit item in pedidos table -->
                    <v-icon
                      @click="() => { select();showSelectedPedido(item) }"
                      :color="changeColorToEdit(item)"
                    >edit</v-icon>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <!-- button delete item in pedidos table -->
                    <v-icon
                      :disabled="
                      interactionsMode.order == 1 &&
                        pedido.selectedPedido != pedido.pedidos.getArray().indexOf(item)
                    "
                      @click="deletePedido(item)"
                      :color="changeColorToEdit(item)"
                    >delete</v-icon>
                  </template>
                  <span>Borrar orden</span>
                  <template v-slot:footer="{ props }">
                    <div class="green"></div>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- reparation frame -->
        <v-stepper-content step="2">
          <div class="repairPage">
            <div class="identify-box">
              <div class="service-number">
                <v-text-field
                  v-model="reparacionPedido.idPedido"
                  readonly
                  label="Orden de servicio"
                  class="custom-field"
                ></v-text-field>
              </div>
              <div class="client-name">
                <v-text-field
                  v-model="reparacionPedido.nombreCliente"
                  readonly
                  label="Cliente"
                  class="custom-field"
                ></v-text-field>
              </div>
              <div class="getArticulo-name">
                <v-text-field
                  v-model="reparacionPedido.articulo"
                  readonly
                  label="Articulo"
                  class="custom-field"
                ></v-text-field>
              </div>
            </div>

            <div class="diagnosis-box">
              <v-textarea
                v-model="reparacionPedido.reparacion"
                outlined
                dense
                name="input-7-1"
                label="Reparacion"
                value
              ></v-textarea>
            </div>

            <div class="garanty-box">
              <v-text-field v-model="reparacionPedido.garantia" outlined dense label="Garantia"></v-text-field>
            </div>

            <div class="technical-box">
              <v-text-field v-model="reparacionPedido.tecnico" outlined dense label="Tecnico"></v-text-field>
              <!-- <v-select></v-select> -->
            </div>

            <div class="content-box">
              <div class="status-box">
                <p>Status Pedido</p>
                <v-switch v-model="pedido.status.recibido" inset label="Recibido"></v-switch>
                <v-switch v-model="pedido.status.reparandose" inset label="En Reparacion"></v-switch>
                <v-switch v-model="pedido.status.confirmando_pago" inset label="Confirmando Pago"></v-switch>
                <v-switch v-model="pedido.status.en_talleres" inset label="En Taller"></v-switch>
                <v-switch v-model="pedido.status.entregado" inset label="Entregado"></v-switch>
              </div>

              <div class="dates-box">
                <div class="repair-date">
                  <time-field
                    v-model="pedido.newPedido.fechaReparacion"
                    type="date"
                    :error="v.get('pedido.newPedido.fechaReparacion') != ''"
                    :errorMessage="v.get('pedido.newPedido.fechaReparacion')"
                    label="Fecha de reparacion"
                    lang="es"
                  ></time-field>
            
                  <v-btn
                    @click="pedido.newPedido.fechaReparacion = datetime.now()"
                    small
                    color="green"
                    dark
                  >fecha</v-btn>
                </div>

                <div class="deliver-date">
                  
                  <time-field
                    v-model="pedido.newPedido.fechaEntrega"
                    type="date"
                    :error="v.get('pedido.newPedido.fechaEntrega') != ''"
                    :errorMessage="v.get('pedido.newPedido.fechaEntrega')"
                    label="Fecha de Entrega"
                    lang="es"
                  ></time-field>

                  <v-btn
                    @click="pedido.newPedido.fechaEntrega = datetime.now()"
                    small
                    color="green"
                    dark
                  >fecha</v-btn>
                </div>
              </div>
            </div>
            <div class="footer">
              <v-btn
                @click="saveRepairPedido()"
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
        <!-- enterprise frame -->
        <v-stepper-content step="3">
          <div class="enterprisePage">
            <div class="info-box">
              <div class="info-fields">
                <h3 class="font-title pl-2">Datos generales de la empresa</h3>
                <v-text-field
                  v-model="empresa.data.nombre"
                  label="Nombre de la empresa"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  v-model="empresa.data.direccion"
                  label="Direccion"
                  class="custom-field"
                ></v-text-field>
                <v-text-field v-model="empresa.data.telefono" label="Telefono" class="custom-field"></v-text-field>
                <v-text-field v-model="empresa.data.celular" label="Celular" class="custom-field"></v-text-field>
                <v-text-field v-model="empresa.data.email" label="Email" class="custom-field"></v-text-field>
              </div>


              <div class="image-box">
                <img :src="empresa.data.urlLogo" alt width="200" height="200" />
                <input type="file" accept="image/*" @change="uploadImage($event)" />
              </div>
            </div>
            <div class="pdf-fields">
              <v-text-field
                v-model="empresa.data.garantia"
                label="Garantia en las facturas"
                class="custom-field"
              ></v-text-field>
              <v-text-field
                v-model="empresa.data.primerMsjRecibo"
                label="Anotacion en el pie del reporte de entrada"
                class="custom-field"
              ></v-text-field>
              <v-text-field
                v-model="empresa.data.segundoMsjRecibo"
                label="Anotacion en el pie del reporte de salida"
                class="custom-field"
              ></v-text-field>
            </div>
            <div class="footer">
              <v-btn
                @click="saveEmpresaInfo()"
                :disabled="disabledButtons"
                class="btn-footer"
                color="green"
                dark
                small
              >
                GUARDAR
                <v-icon>save</v-icon>
              </v-btn>
              <v-btn @click="empresa.get()" :disabled="disabledButtons" color="grey" dark small>
                Cargar los datos por defecto
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
export default class Indentificacion extends IndentificationCode {
  created() {
    this.init();
  }
}
</script>
