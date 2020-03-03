<template transition="slide-x-transition">
  <div id="identification-page">
    <MiniToolbar
      class="mini-toolbar"
      :buttons="miniToolbar"
      @buttonClicked="execMiniToolbarAction($event)"
      :disabled="disabledButtons"
      colorButtons="rgb(29, 211, 29)"
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
                    dark
                    class="cyber_manager-text_field"
                    readonly
                    v-model="newOrder.id"
                    label="Orden nº"
                  ></v-text-field>
                </div>
                <div class="reception-date">
                  <v-text-field
                    dark
                    class="cyber_manager-text_field"
                    readonly
                    v-model="newOrder.admissionDateFront"
                    label="fecha de recepcion"
                  ></v-text-field>
                </div>
              </div>

              <div class="fields">
                <v-text-field
                  dark
                  :error="v.get('newOrder.clientName') != ''"
                  :error-messages="v.get('newOrder.clientName')"
                  dense
                  v-model="newOrder.clientName"
                  label="Nombre del cliente"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  dark
                  :error="v.get('newOrder.clientPhone') != ''"
                  :error-messages="v.get('newOrder.clientPhone')"
                  dense
                  v-model="newOrder.clientPhone"
                  label="Telefono"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  dark
                  :error="v.get('newOrder.article') != ''"
                  :error-messages="v.get('newOrder.article')"
                  dense
                  v-model="newOrder.article"
                  label="Articulo"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  dark
                  :error="v.get('newOrder.brand') != ''"
                  :error-messages="v.get('newOrder.brand')"
                  dense
                  v-model="newOrder.brand"
                  label="Marca"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  dark
                  :error="v.get('newOrder.model') != ''"
                  :error-messages="v.get('newOrder.model')"
                  dense
                  v-model="newOrder.model"
                  label="Modelo"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  dark
                  v-model="newOrder.reportedFailure"
                  dense
                  label="Daño reportado"
                  class="cyber_manager-text_field"
                ></v-text-field>

                <v-text-field
                  dark
                  v-model="newOrder.observations"
                  dense
                  label="Notas"
                  class="cyber_manager-text_field"
                ></v-text-field>
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
              <p
                class="cyber_manager-title"
              >Lista de Ordenes</p>

              <div class="search-box" v-if="orders.length">
                <div class="select">
                  <v-select
                    dark
                    v-model="search.filter"
                    label="Buscar por"
                    :items="Object.keys(searchFilters)"
                    item-value="text"
                    defa
                  ></v-select>
                </div>
                <div class="field">
                  <v-text-field
                    dark
                    v-model="search.value"
                    append-icon="search"
                    label="Buscar"
                    single-line
                    hide-details
                  ></v-text-field>
                </div>
              </div>

              <!-- custom header of table -->
              <div class="table-header">
                <div class="order">
                  <div class="left-box"></div>
                  <div class="content-box">
                    <v-layout row wrap>
                      <v-flex xs2 xl2 sm2 v-for="(header,index) in headerOrder" :key="index">
                        <p class="header_table-text">{{ header.text }}</p>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div class="right-box"></div>
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
                <div class="order" v-for="(item, index) in filterItems()" :key="index">
                  <div class="left-box">
                    <v-icon
                      class="icon"
                      @click="showSelectedOrder(item)"
                      :color="changeColorToEdit(item)"
                      :disabled="
                        interactionsMode.order == 1 &&
                          selectedOrder != orders.indexOf(item)
                      "
                    >edit</v-icon>
                  </div>

                  <div class="content-box">
                    <v-layout row wrap>
                      <v-flex xs2 xl2 sm2 v-for="(header,index) in headerOrder" :key="index">
                        <p class="item_table-text">{{ item[header.value] }}</p>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div class="right-box">
                    <v-icon
                      class="icon"
                      :disabled="
                        (interactionsMode.order == 1 &&
                          selectedOrder != orders.indexOf(item)) ||
                          changeColorToEdit(item) === 'grey'
                      "
                      @click="deleteOrder(item)"
                      :color="changeColorToEdit(item)"
                    >delete</v-icon>
                  </div>
                </div>
                <!-- /TABLE -->
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
                  dark
                  readonly
                  :value="`${newOrder.clientName}`"
                  label="Nombre del cliente"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <div class="reception-date">
                  <v-text-field
                    dark
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
                  chips
                  flat
                  dark
                  attach
                  label="Status"
                >
                  <template v-slot:selection="{ item }">
                    <v-chip :color="getColorByStatus(item)">
                      <span>{{ item.text }}</span>
                    </v-chip>
                  </template>
                </v-select>

                <time-field
                  dark="true"
                  v-model="repair.repairDate"
                  type="date"
                  :error="v.get('repair.repairDate') != ''"
                  :errorMessage="v.get('repair.repairDate')"
                  label="Fecha de reparacion"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>

                <time-field
                  v-model="repair.deliverDate"
                  type="date"
                  :error="v.get('repair.deliverDate') != ''"
                  :errorMessage="v.get('repair.deliverDate')"
                  label="Fecha de Entrega"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>

                <v-text-field
                  dark
                  v-model="repair.technical"
                  class="cyber_manager-text_field"
                  label="Tecnico"
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="repair.price"
                  class="cyber_manager-text_field"
                  label="Costo total: "
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="repair.replacementPrice"
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
              <div class="content-box">
                <div class="diagnosis-box">
                  <v-textarea
                    dark
                    v-model="repair.reparation"
                    outlined
                    dense
                    name="input-7-1"
                    label="Reparacion"
                    value
                  ></v-textarea>
                  <v-text-field v-model="repair.warranty" outlined dense dark label="Garantia"></v-text-field>
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
                  dark
                  v-model="enterprise.enterpriseName"
                  label="Nombre de la empresa"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="enterprise.location"
                  label="Direccion"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="enterprise.phone"
                  label="Telefono"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  dark
                  v-model="enterprise.cellphone"
                  label="Celular"
                  class="cyber_manager-text_field"
                ></v-text-field>
                <v-text-field
                  dark
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
                    v-if="enterprise.urlLogo"
                    :src="enterprise.urlLogo"
                    alt
                  />
                  <v-btn disabled depressed v-if="!enterprise.urlLogo" class="btn-camera">
                    <v-icon>camera_enhance</v-icon>
                    <!-- <span class="text-btn">Pulse AQUI para buscar</span> -->
                  </v-btn>
                </div>
                <v-text-field
                  dark
                  class="cyber_manager-text_field"
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
                    dark
                    v-model="enterprise.enterpriseRules"
                    label="Reglas de la empresa"
                    class="cyber_manager-text_field"
                  ></v-text-field>
                  <v-text-field
                    dark
                    v-model="enterprise.firstMessage"
                    label="Anotacion en el pie del reporte de entrada"
                    class="cyber_manager-text_field"
                  ></v-text-field>
                  <v-text-field
                    dark
                    v-model="enterprise.secondMessage"
                    label="Anotacion en el pie del reporte de salida"
                    class="cyber_manager-text_field"
                  ></v-text-field>
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
                  type="date"
                  :error="v.get('analitycs.startDate') != ''"
                  :errorMessage="v.get('analitycs.startDate')"
                  label="Fecha inicio"
                  lang="es"
                  class="cyber_manager-text_field"
                ></time-field>
                <time-field
                  v-model="analitycs.endDate"
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
                  save-icon="arrow_right"
                  cancel-icon="arrow_left"
                  save-text="Comenzar"
                  cancel-text="Reiniciar"
                  :disabled="disabledButtons"
                />
              </div>
            </div>

            <div class="right_content-box">
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

    <v-snackbar
      v-model="notification.visible"
      :color="notification.color"
    >{{ notification.message }}</v-snackbar>
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
import Toolbar from "../../components/toolbar/toolbar.vue";

@Component({
  components: {
    TimeField,
    Footer,
    MiniToolbar,
    Toolbar
  }
})
export default class Identification extends IdentificationView {
  created() {
    this.init();
  }
}
</script>
