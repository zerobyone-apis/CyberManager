<template transition="slide-x-transition">
  <div id="MainPage">
    <!-- INTERNAL TOOLBAR -->
    <v-toolbar color="grey lighten-2" class="mini-toolbar" fixed outlined height="50px">
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

    <!-- <v-divider></v-divider> -->

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
                    v-model="newPedido.fechaIngreso"
                    label="recepcion"
                    class="custom-field"
                  ></v-text-field>
                </div>
              </div>

              <div class="client-fields-box">
                <!-- <h4 class="font-title">Datos del cliente</h4> -->
                <v-text-field
                  :error="v.get('newPedido.nombreCliente') != ''"
                  :error-messages="v.get('newPedido.nombreCliente')"
                  outlined
                  dense
                  v-model="newPedido.nombreCliente"
                  label="Nombre del cliente"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newPedido.telCliente') != ''"
                  :error-messages="v.get('newPedido.telCliente')"
                  outlined
                  dense
                  v-model="newPedido.telCliente"
                  label="Telefono"
                  class="custom-field"
                ></v-text-field>
              </div>

              <div class="article-fields-box">
                <v-text-field
                  :error="v.get('newPedido.articulo') != ''"
                  :error-messages="v.get('newPedido.articulo')"
                  outlined
                  dense
                  v-model="newPedido.articulo"
                  label="Articulo"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newPedido.marca') != ''"
                  :error-messages="v.get('newPedido.marca')"
                  outlined
                  dense
                  v-model="newPedido.marca"
                  label="Marca"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newPedido.modelo') != ''"
                  :error-messages="v.get('newPedido.modelo')"
                  outlined
                  dense
                  v-model="newPedido.modelo"
                  label="Modelo"
                  class="custom-field"
                ></v-text-field>

                <!-- TEXT AREA  -->
                <v-textarea
                  v-model="newPedido.fallReportada"
                  height="40"
                  label="Daño reportado"
                  value
                  class="custom-text-area"
                ></v-textarea>
                <v-textarea
                  v-model="newPedido.observaciones"
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
                    label="Buscar por"
                    :items="Object.keys(searchFilters)"
                    item-value="text"
                    defa
                  ></v-select>
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
                  :v-model="pedidos.getArray()"
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
                    <v-icon
                      @click="
                        () => {
                          select();
                          showSelectedPedido(item);
                        }
                      "
                      :color="changeColorToEdit(item)"
                      :disabled="
                        interactionsMode.order == 1 &&
                          selectedPedido !=
                            pedidos.getArray().indexOf(item)
                      "
                    >edit</v-icon>
                  </template>

                  <template v-slot:item.status="{ item }">
                    <v-chip :color="getColorByStatus(item.status)">
                      <span>{{ item.status }}</span>
                    </v-chip>
                  </template>

                  <template v-slot:item.action="{ item }">
                    <v-icon
                      :disabled="
                        interactionsMode.order == 1 &&
                          selectedPedido !=
                            pedidos.getArray().indexOf(item)
                      "
                      @click="deletePedido(item)"
                      :color="changeColorToEdit(item)"
                    >delete</v-icon>
                  </template>
                  <span>Borrar orden</span>
                </v-data-table>
              </div>
            </div>

            <v-progress-circular
              v-if="disabledButtons"
              :size="90"
              :width="7"
              color="green"
              indeterminate
            >{{ 'cargando' }}</v-progress-circular>
          </div>
        </v-stepper-content>
        <!-- reparation frame -->
        <v-stepper-content step="2">
          <div class="repairPage">
            <h3 class="font-title">Reparacion de Orden</h3>
            <div class="identify-box">
              <p class="item-info">{{ 'Ordern nro: ' + reparacionPedido.idPedido }}</p>
              <p class="item-info">{{ 'Cliente: ' + reparacionPedido.nombreCliente }}</p>
              <p class="item-info">{{ 'Articulo: ' + reparacionPedido.articulo }}</p>
            </div>

            <div class="content-box">
              <div class="status-box">
                <!-- <p>Status Pedido</p> -->
                <v-select
                  v-model="reparacionPedido.status"
                  :items="Object.keys(status)"
                  chips
                  flat
                  attach
                  label="Status"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip :color="getColorByStatus(item)">
                      <span>{{ item }}</span>
                    </v-chip>
                  </template>
                </v-select>
              </div>

              <div class="dates-box">
                <!-- {{ reparacionPedido.fechaReparacion }} -->
                <time-field
                  v-model="reparacionPedido.fechaReparacion"
                  type="date"
                  :error="v.get('reparacionPedido.fechaReparacion') != ''"
                  :errorMessage="v.get('reparacionPedido.fechaReparacion')"
                  label="Fecha de reparacion"
                  lang="es"
                ></time-field>
                <!-- {{ reparacionPedido.fechaEntrega }} -->
                <time-field
                  v-model="reparacionPedido.fechaEntrega"
                  type="date"
                  :error="v.get('reparacionPedido.fechaEntrega') != ''"
                  :errorMessage="v.get('reparacionPedido.fechaEntrega')"
                  label="Fecha de Entrega"
                  lang="es"
                ></time-field>
              </div>

              <div class="technical-box">
                <v-text-field v-model="reparacionPedido.tecnico" flat dense label="Tecnico"></v-text-field>
                <v-text-field v-model="reparacionPedido.precio" flat dense label="Costo Total: "></v-text-field>
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
            <v-progress-circular
              v-if="disabledButtons"
              :size="90"
              :width="7"
              color="green"
              indeterminate
            >{{ 'cargando' }}</v-progress-circular>
          </div>
        </v-stepper-content>
        <!-- enterprise frame -->
        <v-stepper-content step="3">
          <div class="enterprisePage">
            <div class="info-box">
              <div class="info-fields">
                <h3 class="font-title pl-2">Datos generales de la empresa</h3>
                <v-text-field
                  v-model="empresa.nombre"
                  label="Nombre de la empresa"
                  class="custom-field"
                ></v-text-field>
                <v-text-field v-model="empresa.direccion" label="Direccion" class="custom-field"></v-text-field>
                <v-text-field v-model="empresa.telefono" label="Telefono" class="custom-field"></v-text-field>
                <v-text-field v-model="empresa.celular" label="Celular" class="custom-field"></v-text-field>
                <v-text-field v-model="empresa.email" label="Email" class="custom-field"></v-text-field>
              </div>

              <div class="image-box">
                <v-text-field
                  v-model="empresa.urlLogo"
                  class="file-btn"
                  label="Pegue el url de la imagen"
                  hint="Si al pegar el url la imagen no carga es debido a que no se permite su uso."
                ></v-text-field>

                <img
                  id="imageid"
                  crossorigin="anonymous"
                  v-if="empresa.urlLogo"
                  class="img"
                  :src="empresa.urlLogo"
                  alt
                />

                <v-btn v-if="!empresa.urlLogo" class="btn-camera">
                  <span>No hay imagen seleccionada</span>
                  <v-icon>camera_enhance</v-icon>
                </v-btn>
                <!-- <input label="Seleccione" type="file" accept="image/*" @change="uploadImage($event)" /> -->
              </div>
            </div>
            <div class="pdf-fields">
              <v-text-field
                v-model="empresa.garantia"
                label="Garantia en las facturas"
                class="custom-field"
              ></v-text-field>
              <v-text-field
                v-model="empresa.primerMsjRecibo"
                label="Anotacion en el pie del reporte de entrada"
                class="custom-field"
              ></v-text-field>
              <v-text-field
                v-model="empresa.segundoMsjRecibo"
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

            <v-progress-circular
              v-if="disabledButtons"
              :size="90"
              :width="7"
              color="green"
              indeterminate
            >{{ 'cargando' }}</v-progress-circular>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
// code
import IndentificationView from "./identification.view";
// style
import "./identification.scss";
import "../../styles/fonts.scss";
import TimeField from "../../components/TimeField/TimeField.vue";
// components
import { Component } from "vue-property-decorator";

@Component({
  components: {
    TimeField
  }
})
export default class Indentificacion extends IndentificationView {
  created() {
    this.init();
  }
}
</script>
