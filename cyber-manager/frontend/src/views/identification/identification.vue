<template transition="slide-x-transition">
  <div id="identification-page">
    <MiniToolbar
      class="mini-toolbar"
      :buttons="miniToolbar"
      @buttonClicked="execMiniToolbarAction($event)"
      :disabled="disabledButtons"
      colorButtons="green darken-1"
    />

    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <!-- identification step -->
        <v-stepper-content step="1">
          <div class="step-content">
            <div class="left_content-box">
              <h3 class="font-title pl-2">Datos de la Orden</h3>
              <div class="identify">
                <div class="service-number">
                  <v-text-field
                    readonly
                    v-model="newOrder.id"
                    label="Orden de servicio"
                    class="custom-field"
                  ></v-text-field>
                </div>
                <div class="reception-date">
                  <v-text-field
                    readonly
                    v-model="newOrder.admissionDateFront"
                    label="recepcion"
                    class="custom-field"
                  ></v-text-field>
                </div>
              </div>
              <div class="fields">
                <v-text-field
                  :error="v.get('newOrder.clientName') != ''"
                  :error-messages="v.get('newOrder.clientName')"
                  outlined
                  dense
                  v-model="newOrder.clientName"
                  label="Nombre del cliente"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newOrder.clientPhone') != ''"
                  :error-messages="v.get('newOrder.clientPhone')"
                  outlined
                  dense
                  v-model="newOrder.clientPhone"
                  label="Telefono"
                  class="custom-field"
                ></v-text-field>
              </div>
              <div class="fields">
                <v-text-field
                  :error="v.get('newOrder.article') != ''"
                  :error-messages="v.get('newOrder.article')"
                  outlined
                  dense
                  v-model="newOrder.article"
                  label="Articulo"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newOrder.brand') != ''"
                  :error-messages="v.get('newOrder.brand')"
                  outlined
                  dense
                  v-model="newOrder.brand"
                  label="Marca"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  :error="v.get('newOrder.model') != ''"
                  :error-messages="v.get('newOrder.model')"
                  outlined
                  dense
                  v-model="newOrder.model"
                  label="Modelo"
                  class="custom-field"
                ></v-text-field>
                <v-textarea
                  v-model="newOrder.reportedFailure"
                  height="40"
                  label="Daño reportado"
                  value
                  class="custom-text-area"
                ></v-textarea>
                <v-textarea
                  v-model="newOrder.observations"
                  height="40"
                  label="Notas"
                  value
                  class="custom-text-area"
                ></v-textarea>
              </div>
              <Footer
                @save="saveOrder()"
                @cancel="cancelSaveOrder()"
                @add="addOrder()"
                :save-mode="interactionsMode.order == 1"
                :disabled="disabledButtons"
              />
            </div>
            <!-- TABLE OF orders -->
            <div class="orders-box">
              <h3
                v-if="orders.length && filterItems().length != 0"
                class="font-title"
              >
                Lista de Ordenes
              </h3>
              <div class="search-box" v-if="orders.length">
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
                <div
                  v-if="orders.length == 0 && search.value === ''"
                  class="no-orders"
                >
                  <p>No tiene ordenes creadas</p>
                  <v-icon>search</v-icon>
                </div>

                <div
                  class="no-orders"
                  v-if="filterItems() == 0 && search.value"
                >
                  <p>No se encontraron coincidencias</p>
                  <v-icon>search</v-icon>
                </div>

                <v-data-table
                  v-if="orders.length && filterItems().length != 0"
                  height="100%"
                  :v-model="orders"
                  :headers="headerOrder"
                  :items="filterItems()"
                  :items-per-page="500"
                  item-key="id"
                  show-select
                  hide-default-footer
                  single-select
                  class="orders-table elevation-0"
                >
                  <template v-slot:item.data-table-select="{ item, select }">
                    <v-icon
                      @click="
                        () => {
                          select();
                          showSelectedOrder(item);
                        }
                      "
                      :color="changeColorToEdit(item)"
                      :disabled="
                        interactionsMode.order == 1 &&
                          selectedOrder != orders.indexOf(item)
                      "
                      >edit</v-icon
                    >
                  </template>
                  <template v-slot:item.status="{ item }">
                    <v-icon class="mr-2" :color="getColorByStatus(item.status)"
                      >info</v-icon
                    >
                    <span>{{ item.status }}</span>
                  </template>
                  <template v-slot:item.action="{ item }">
                    <v-icon
                      :disabled="
                        (interactionsMode.order == 1 &&
                          selectedOrder != orders.indexOf(item)) ||
                          changeColorToEdit(item) === 'grey'
                      "
                      @click="deleteOrder(item)"
                      :color="changeColorToEdit(item)"
                      >delete</v-icon
                    >
                  </template>
                  <span>Borrar orden</span>
                </v-data-table>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- reparation step -->
        <v-stepper-content step="2">
          <div class="repair-step step-content">
            <div class="left_content-box">
              <h3 class="font-title">Reparacion de Orden</h3>
              <div class="fields">
                <p>Cliente: {{ newOrder.clientName }}</p>
                <p>Articulo: {{ newOrder.article }}</p>
              </div>
              <div class="fields">
                <v-select
                  v-model="repair.status"
                  :items="status"
                  item-value="text"
                  chips
                  flat
                  attach
                  label="Status"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip :color="getColorByStatus(item)">
                      <span>{{ item.text }}</span>
                    </v-chip>
                  </template>
                </v-select>
              </div>
              <div class="fields">
                <time-field
                  v-model="repair.repairDate"
                  type="date"
                  :error="v.get('repair.repairDate') != ''"
                  :errorMessage="v.get('repair.repairDate')"
                  label="Fecha de reparacion"
                  lang="es"
                ></time-field>
                <time-field
                  v-model="repair.deliverDate"
                  type="date"
                  :error="v.get('repair.deliverDate') != ''"
                  :errorMessage="v.get('repair.deliverDate')"
                  label="Fecha de Entrega"
                  lang="es"
                ></time-field>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="repair.technical"
                  flat
                  dense
                  label="Tecnico"
                ></v-text-field>
                <v-text-field
                  v-model="repair.price"
                  flat
                  dense
                  label="Costo Total: "
                ></v-text-field>
              </div>
              <Footer
                @save="saveRepair()"
                @cancel="loadRepair(orders[selectedOrder])"
                cancel-text="Cancelar"
                :save-mode="true"
                :disabled="disabledButtons"
              />
            </div>
            <div class="right_content-box">
              <h3 class="font-title">Reparacion y Garantia</h3>
              <div class="content-box">
                <div class="diagnosis-box">
                  <v-textarea
                    v-model="repair.reparation"
                    outlined
                    dense
                    name="input-7-1"
                    label="Reparacion"
                    value
                  ></v-textarea>
                  <v-text-field
                    v-model="repair.warranty"
                    outlined
                    dense
                    label="Garantia"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- input invoice step -->
        <v-stepper-content step="3">
          <div class="content-doc">
            <div id="invoice-input-box" class="invoice-box">
              <Invoice
                :order="newOrder"
                class="input-invoice-box"
                :enterprise="enterprise"
              />
              <v-divider class="mt-3 mb-3"></v-divider>
              <Invoice
                :order="newOrder"
                class="input-invoice-box"
                :enterprise="enterprise"
              />
            </div>
          </div>
          <Footer v-print="'#invoice-input-box'" add-text="Imprimir" />
        </v-stepper-content>

        <!-- output invoice step -->
        <v-stepper-content step="4">
          <div class="content-doc">
            <div id="invoice-output-box" class="invoice-box">
              <Invoice
                :order="newOrder"
                class="input-invoice-box"
                :enterprise="enterprise"
              />
              <v-divider class="mt-3 mb-3"></v-divider>
              <Invoice
                :order="newOrder"
                class="input-invoice-box"
                :enterprise="enterprise"
              />
            </div>
          </div>
          <Footer
            v-print="'#invoice-output-box'"
            add-text="Imprimir"
            add-icon="print"
          />
        </v-stepper-content>
        <!-- enterprise step -->
        <v-stepper-content step="5">
          <div class="step-content">
            <div class="left_content-box">
              <h3 class="font-title pl-2">Datos generales de la empresa</h3>
              <div class="fields">
                <v-text-field
                  v-model="enterprise.enterpriseName"
                  label="Nombre de la empresa"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  v-model="enterprise.location"
                  label="Direccion"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  v-model="enterprise.phone"
                  label="Telefono"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  v-model="enterprise.cellphone"
                  label="Celular"
                  class="custom-field"
                ></v-text-field>
                <v-text-field
                  v-model="enterprise.email"
                  label="Email"
                  class="custom-field"
                ></v-text-field>
              </div>
              <div class="fields">
                <div class="image-box">
                  <img
                    class="img"
                    crossorigin="anonymous"
                    v-if="enterprise.urlLogo"
                    :src="enterprise.urlLogo"
                    alt
                  />
                  <v-btn
                    disabled
                    depressed
                    v-if="!enterprise.urlLogo"
                    class="btn-camera"
                  >
                    <v-icon>camera_enhance</v-icon>
                    <!-- <span class="text-btn">Pulse AQUI para buscar</span> -->
                  </v-btn>
                </div>
                <v-text-field
                  v-model="enterprise.urlLogo"
                  label="Pegue el url de la imagen"
                  hint="Si al pegar el url la imagen no carga es debido a que no se permite su uso."
                ></v-text-field>
              </div>
              <Footer
                @save="saveEnterprise()"
                @cancel="getEnterprise()"
                cancel-text="Cancelar"
                :save-mode="true"
                :disabled="disabledButtons"
              />
            </div>
            <div class="right_content-box">
              <div class="content">
                <div class="pdf-fields">
                  <v-text-field
                    v-model="enterprise.enterpriseRules"
                    label="Reglas de la empresa"
                    class="custom-field"
                  ></v-text-field>
                  <v-text-field
                    v-model="enterprise.firstMessage"
                    label="Anotacion en el pie del reporte de entrada"
                    class="custom-field"
                  ></v-text-field>
                  <v-text-field
                    v-model="enterprise.secondMessage"
                    label="Anotacion en el pie del reporte de salida"
                    class="custom-field"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- arqueo step -->
        <v-stepper-content step="6">
          <div class="step-content">
            <div class="left_content-box">
              <h3 class="font-title pl-2">Arqueo</h3>
              <div class="fields">
                <time-field
                  v-model="analitycs.startDate"
                  type="date"
                  :error="v.get('analitycs.startDate') != ''"
                  :errorMessage="v.get('analitycs.startDate')"
                  label="Fecha inicio"
                  lang="es"
                ></time-field>
                <time-field
                  v-model="analitycs.endDate"
                  type="date"
                  :error="v.get('analitycs.endDate') != ''"
                  :errorMessage="v.get('analitycs.endDate')"
                  label="Fecha fin"
                  lang="es"
                ></time-field>

                <Footer
                  @add="beginAnalitycs()"
                  @cancel="resetAnalitycs()"
                  add-text="Comenzar"
                  cancel-text="Reiniciar"
                  :disabled="disabledButtons"
                />
              </div>
            </div>

            <div class="right_content-box">
              <div class="content-analytics">
                <div class="result-box">
                  <p class="result">Reultado</p>
                  <v-icon class="icon">trending_up</v-icon>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>
      </v-stepper-items>

      <v-progress-linear
        class="progress-linear"
        v-if="disabledButtons"
        height="15"
        :active="disabledButtons"
        :indeterminate="disabledButtons"
        color="green"
      ></v-progress-linear>
    </v-stepper>

    <v-snackbar v-model="notification.visible" :color="notification.color">{{
      notification.message
    }}</v-snackbar>
  </div>
</template>

<script lang="ts">
import IndentificationView from './identification.view';
import './identification.scss';
import '../../styles/fonts.scss';
import { Component } from 'vue-property-decorator';
import TimeField from '../../components/TimeField/TimeField.vue';
import Footer from '../../components/Footer/Footer.vue';
import MiniToolbar from '../../components/MiniToolbar/MiniToolbar.vue';
import Toolbar from '../../components/toolbar/toolbar.vue';
import Invoice from '../../components/Invoice/Invoice.vue';

@Component({
  components: {
    TimeField,
    Footer,
    MiniToolbar,
    Toolbar,
    Invoice
  }
})
export default class Indentificacion extends IndentificationView {
  created() {
    this.init();
  }
}
</script>
