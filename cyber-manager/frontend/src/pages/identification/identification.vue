<template transition="slide-x-transition">
  <div id="identification-page" :class="`cyber_manager-window_${$store.getters.theme}`">
    <MiniToolbar
      :class="`cyber_manager-background_${$store.getters.theme} mini-toolbar`"
      :buttons="miniToolbar"
      @buttonClicked="execMiniToolbarAction($event)"
      :disabled="disabledButtons"
      colorButtons="green"
    />
    <v-stepper v-model="wizard" class="stepper">
      <v-stepper-items>
        <!-- identification step -->
        <v-stepper-content step="0">
          <div class="step-content">
            <div class="left_content-box">
              <p class="cyber_manager-title">Datos de la Orden</p>
              <div class="identify">
                <div class="service-number">
                  <v-text-field
                    v-model="newOrder.id"
                    class="cyber_manager-text_field"
                    :dark="$store.getters.theme == 'dark'"
                    readonly
                    label="Orden nº"
                  ></v-text-field>
                </div>
                <div class="reception-date">
                  <v-text-field
                    :dark="$store.getters.theme == 'dark'"
                    class="cyber_manager-text_field"
                    readonly
                    v-model="newOrder.admissionDateFront"
                    label="fecha de recepcion"
                  ></v-text-field>
                </div>
              </div>

              <div class="fields">
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  :error="v.get('newOrder.clientname') != ''"
                  :error-messages="v.get('newOrder.clientname')"
                  dense
                  v-model="newOrder.clientname"
                  label="Nombre del cliente"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  :error="v.get('newOrder.clientphone') != ''"
                  :error-messages="v.get('newOrder.clientphone')"
                  dense
                  v-model="newOrder.clientphone"
                  label="Telefono"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  :error="v.get('newOrder.article') != ''"
                  :error-messages="v.get('newOrder.article')"
                  dense
                  v-model="newOrder.article"
                  label="Articulo"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  :error="v.get('newOrder.brand') != ''"
                  :error-messages="v.get('newOrder.brand')"
                  dense
                  v-model="newOrder.brand"
                  label="Marca"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  :error="v.get('newOrder.model') != ''"
                  :error-messages="v.get('newOrder.model')"
                  dense
                  v-model="newOrder.model"
                  label="Modelo"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-textarea
                  :dark="$store.getters.theme == 'dark'"
                  v-model="newOrder.reportedfailure"
                  dense
                  class="cyber_manager-text_field text-area-x text-area_small"
                  name="input-7-1"
                  label="Daño reportado"
                ></v-textarea>

                <v-textarea
                  :dark="$store.getters.theme == 'dark'"
                  v-model="newOrder.observations"
                  dense
                  label="Notas"
                  class="cyber_manager-text_field text-area-x text-area_small"
                  name="input-7-1"
                ></v-textarea>
              </div>

              <Footer
                @save="saveOrder()"
                @cancel="cancelSaveOrder()"
                @add="addOrder()"
                :hide-cancel="true"
                :save-mode="interactionsMode.order == 1"
                :disabled="disabledButtons"
              >
                <!-- <template v-slot:cancelButton="{ saveMode, disabled }">
                  <confirm-dialog
                    dark
                    v-if="saveMode"
                    v-model="showDialogCancelOrder"
                    @onSelectAction="
                      action => {
                        action ? cancelSaveOrder() : false;
                      }
                    "
                    :info-values="confirmDialogCancelOrder"
                  >
                    <template v-slot:button="{ on }">
                      <v-btn
                        :disabled="disabled"
                        class="button-footer"
                        small
                        depressed
                        v-on="on"
                      >Cancelar</v-btn>
                    </template>
                  </confirm-dialog>
                </template>-->
              </Footer>
            </div>

            <!-- TABLE OF orders -->
            <div class="right_content-box">
              <p class="cyber_manager-title">Lista de Ordenes</p>

              <div class="orders-box" :class="`cyber_manager-box_${$store.getters.theme}`">
                <div class="search-box" v-if="orders.length">
                  <div class="select">
                    <v-select
                      v-model="search.filter"
                      :dark="$store.getters.theme === 'dark'"
                      :items="Object.keys(searchFilters)"
                      class="select-list"
                      label="Buscar por"
                      item-value="text"
                    ></v-select>
                  </div>
                  <div class="field">
                    <v-text-field
                      :dark="$store.getters.theme == 'dark'"
                      v-model="search.value"
                      append-icon="search"
                      label="Buscar"
                      single-line
                      hide-details
                    ></v-text-field>
                  </div>
                </div>

                <!-- custom header of table -->
                <div class="table-header" v-if="orders.length">
                  <div class="sort-box">
                    <v-btn @click="changeSortId()" dark text fab small color="green">
                      <v-icon v-if="modeSortId">keyboard_arrow_up</v-icon>
                      <v-icon v-else>keyboard_arrow_down</v-icon>
                    </v-btn>
                  </div>

                  <div class="headers">
                    <v-layout row wrap>
                      <v-flex xs2 xl2 sm2 v-for="(header, index) in headerOrder" :key="index">
                        <p
                          class="header_table-text"
                          :class="
                            $store.getters.theme === 'light'
                              ? 'header_light'
                              : 'header_dark'
                          "
                        >{{ header.text }}</p>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>

                <!-- table  -->
                <div class="table-box">
                  <div v-if="orders.length == 0 && search.value === ''" class="no-orders">
                    <p>No tiene ordenes creadas</p>
                    <v-icon>search</v-icon>
                  </div>

                  <div class="no-orders" v-if="filterItems() == 0 && search.value">
                    <p>No se encontraron coincidencias</p>
                    <v-icon>search</v-icon>
                  </div>

                  <!-- TABLE  -->
                  <div
                    class="order"
                    v-for="(item, index) in filterItems()"
                    :key="index"
                    :class="
                      $store.getters.theme === 'light'
                        ? 'order_light'
                        : 'order_dark'
                    "
                  >
                    <div class="left-box">
                      <v-btn
                        class="icon"
                        @click="
                          () => {
                            interactionsMode.order == 0
                              ? showSelectedOrder(item)
                              : cancelSaveOrder();
                          }
                        "
                        :color="changeColorToEdit(item)"
                        :disabled="
                          interactionsMode.order == 1 &&
                            selectedOrder != orders.indexOf(item)
                        "
                        small
                        fab
                        text
                      >
                        <v-icon>
                          {{
                          interactionsMode.order == 1 &&
                          selectedOrder == orders.indexOf(item)
                          ? 'close'
                          : 'edit'
                          }}
                        </v-icon>
                      </v-btn>
                    </div>

                    <div class="content-box">
                      <v-layout row wrap>
                        <v-flex xs2 xl2 sm2 v-for="(header, index) in headerOrder" :key="index">
                          <p
                            v-if="header.value != 'status'"
                            class="item_table-text"
                          >{{ item[header.value] }}</p>
                          <!-- :outlined="$store.getters.theme  === 'dark' ? true : false" -->
                          <v-chip
                            v-if="header.value == 'status'"
                            :color="getColorByStatus(item[header.value])"
                          >{{ item[header.value] }}</v-chip>
                        </v-flex>
                      </v-layout>
                    </div>

                    <div class="right-box">
                      <confirm-dialog
                        dark
                        v-model="showDialogDelete"
                        @onSelectAction="
                          action => {
                            deleteOrder(item, action);
                          }
                        "
                        :info-values="confirmDialogDelete"
                      >
                        <template v-slot:button="{ on }">
                          <v-btn
                            class="icon"
                            v-on="on"
                            :disabled="
                              (interactionsMode.order == 1 &&
                                selectedOrder != orders.indexOf(item)) ||
                                changeColorToEdit(item) === 'grey'
                            "
                            :color="
                              changeColorToEdit(item) == 'green'
                                ? 'red lighten-2'
                                : 'grey'
                            "
                            small
                            fab
                            text
                          >
                            <v-icon>delete</v-icon>
                          </v-btn>
                        </template>
                      </confirm-dialog>
                    </div>
                  </div>
                  <!-- /TABLE -->
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- reparation step -->
        <v-stepper-content step="1">
          <div class="repair-step step-content">
            <div class="left_content-box">
              <p class="cyber_manager-title">Reparacion de Orden</p>

              <div class="identify">
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  readonly
                  :value="`${newOrder.clientname}`"
                  label="Nombre del cliente"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <div class="reception-date">
                  <v-text-field
                    :dark="$store.getters.theme == 'dark'"
                    readonly
                    :value="`${newOrder.article}`"
                    label="Articulo"
                    class="cyber_manager-text_field"
                  ></v-text-field>
                </div>
              </div>

              <div class="fields">
                <v-select
                  v-model="repair.status"
                  class="select-status"
                  :items="status"
                  item-value="text"
                  :dark="$store.getters.theme == 'dark'"
                  label="Status"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip class="chip" :color="getColorByStatus(item)">
                      <span>{{ item.text }}</span>
                    </v-chip>
                  </template>
                </v-select>

                <time-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="repair.repairdate"
                  type="date"
                  :error="v.get('repair.repairdate') != ''"
                  :errorMessage="v.get('repair.repairdate')"
                  label="Fecha de reparacion"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>

                <time-field
                  v-model="repair.deliverydate"
                  :dark="$store.getters.theme == 'dark'"
                  type="date"
                  :error="v.get('repair.deliverydate') != ''"
                  :errorMessage="v.get('repair.deliverydate')"
                  label="Fecha de Entrega"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>

                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="repair.technical"
                  class="cyber_manager-text_field"
                  label="Tecnico"
                ></v-text-field>

                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="repair.price"
                  class="cyber_manager-text_field"
                  label="Costo total: "
                ></v-text-field>

                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="repair.replacementprice"
                  class="cyber_manager-text_field"
                  label="Costo de repuesto: "
                ></v-text-field>
              </div>

              <Footer
                @add="saveRepair()"
                @cancel="loadRepair(orders[selectedOrder])"
                add-text="Guardar"
                add-icon="save"
                :save-mode="false"
                :disabled="disabledButtons"
              />
            </div>
            <div class="right_content-box">
              <p class="cyber_manager-title">Reparacion y Garantia</p>
              <div class="repair-box" :class="`cyber_manager-box_${$store.getters.theme}`">
                <div class="content-box">
                  <div class="diagnosis-box">
                    <v-textarea
                      :dark="$store.getters.theme == 'dark'"
                      v-model="repair.reparation"
                      class="cyber_manager-text_field text-area-x"
                      dense
                      name="input-7-1"
                      label="Reparacion"
                      value
                    ></v-textarea>
                    <v-text-field
                      v-model="repair.warranty"
                      class="cyber_manager-text_field"
                      dense
                      :dark="$store.getters.theme == 'dark'"
                      label="Garantia"
                    ></v-text-field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- enterprise step -->
        <v-stepper-content step="4">
          <div class="step-content">
            <div class="left_content-box">
              <p class="cyber_manager-title pl-2">Datos generales de la empresa</p>
              <div class="fields">
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="enterprise.enterprisename"
                  label="Nombre de la empresa"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="enterprise.location"
                  label="Direccion"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="enterprise.phone"
                  label="Telefono"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="enterprise.cellphone"
                  label="Celular"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  v-model="enterprise.email"
                  label="Email"
                  class="cyber_manager-text_field"
                ></v-text-field>
              </div>
              <div class="fields">
                <div class="image-box">
                  <img
                    id="imageid"
                    class="img"
                    crossorigin="anonymous"
                    v-if="enterprise.urllogo"
                    :src="enterprise.urllogo"
                    alt
                  />
                  <v-btn disabled depressed v-if="!enterprise.urllogo" class="btn-camera">
                    <v-icon>camera_enhance</v-icon>
                    <!-- <span class="text-btn">Pulse AQUI para buscar</span> -->
                  </v-btn>
                </div>
                <v-text-field
                  :dark="$store.getters.theme == 'dark'"
                  class="cyber_manager-text_field"
                  v-model="enterprise.urllogo"
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
              <div class="enterprise-box" :class="`cyber_manager-box_${$store.getters.theme}`">
                <div class="content">
                  <div class="pdf-fields">
                    <v-textarea
                      :dark="$store.getters.theme == 'dark'"
                      v-model="enterprise.enterpriserules"
                      label="Pie de factura"
                      class="cyber_manager-text_field text-area-x"
                      name="input-7-1"
                      dense
                    ></v-textarea>

                    <!-- <v-text-field
                      :dark="$store.getters.theme == 'dark'"
                      v-model="enterprise.enterpriserules"
                      label="Reglas de la empresa"
                      class="cyber_manager-text_field"
                    ></v-text-field>
                    <v-text-field
                      :dark="$store.getters.theme == 'dark'"
                      v-model="enterprise.firstmessage"
                      label="Anotacion en el pie del reporte de entrada"
                      class="cyber_manager-text_field"
                    ></v-text-field>
                    <v-text-field
                      :dark="$store.getters.theme == 'dark'"
                      v-model="enterprise.secondmessage"
                      label="Anotacion en el pie del reporte de salida"
                      class="cyber_manager-text_field"
                    ></v-text-field>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-stepper-content>
        <!-- arqueo step -->
        <v-stepper-content step="5">
          <div class="step-content">
            <div class="left_content-box">
              <p class="cyber_manager-title pl-2">Arqueo</p>
              <div class="fields">
                <time-field
                  v-model="analitycs.startDate"
                  :dark="$store.getters.theme == 'dark'"
                  type="date"
                  :error="v.get('analitycs.startDate') != ''"
                  :errorMessage="v.get('analitycs.startDate')"
                  label="Fecha inicio"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>
                <time-field
                  v-model="analitycs.endDate"
                  :dark="$store.getters.theme == 'dark'"
                  type="date"
                  :error="v.get('analitycs.endDate') != ''"
                  :errorMessage="v.get('analitycs.endDate')"
                  label="Fecha fin"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>

                <Footer
                  @save="beginAnalitycs()"
                  @cancel="resetAnalitycs()"
                  :save-mode="true"
                  save-icon="trending_up"
                  cancel-icon="autorenew"
                  save-text="Comenzar"
                  cancel-text="Reiniciar"
                  :disabled="disabledButtons"
                />
              </div>
            </div>

            <div class="right_content-box">
              <div class="box-analytics" :class="`cyber_manager-box_${$store.getters.theme}`">
                <div class="content-analytics">
                  <div class="result-box">
                    <p class="result-text">{{ analitycs.result.split(',')[0] }}</p>
                    <p class="result-text">{{ analitycs.result.split(',')[1] }}</p>
                    <p class="result-text">{{ analitycs.result.split(',')[2] }}</p>
                    <p class="result-text">{{ analitycs.result.split(',')[3] }}</p>
                    <p class="result">{{ !analitycs.result ? 'Resultado' : '' }}</p>
                    <v-icon class="icon">trending_up</v-icon>
                  </div>
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

    <v-snackbar v-model="notification.visible" :color="notification.color">
      {{
      notification.message
      }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import IdentificationView from "./identification.view";
import "./identification.scss";
import "../../styles/CyberManager.scss";
import { Component } from "vue-property-decorator";
import TimeField from "../../components/TimeField/TimeField.vue";
import Footer from "../../components/Footer/Footer.vue";
import MiniToolbar from "../../components/MiniToolbar/MiniToolbar.vue";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog.vue";

@Component({
  components: {
    TimeField,
    Footer,
    MiniToolbar,
    ConfirmDialog
  }
})
export default class Identification extends IdentificationView {
  created() {
    this.init();
  }
}
</script>
