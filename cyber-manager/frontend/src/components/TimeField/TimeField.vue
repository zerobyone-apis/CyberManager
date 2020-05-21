<template>
  <div>
    <v-dialog
      v-if="type == 'hour'"
      ref="dialogHour"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <div class="field-date__box">
          <v-text-field
            v-model="time"
            :error="error"
            :error-messages="errorMessage"
            :label="label"
            readonly
            :dark="dark"
            v-on="on"
            :outlined="outlined"
          ></v-text-field>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                @click="setTodayHour()"
                text
                color="rgb(29, 211, 29)"
                v-on="on"
                class="btn-date"
                fab
                small
              >
                <v-icon>alarm</v-icon>
              </v-btn>
            </template>
            <span>pegar hora actual</span>
          </v-tooltip>
        </div>
      </template>
      <v-time-picker v-model="time" full-width scrollable :locale="lang">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialogHour.save(time)">OK</v-btn>
      </v-time-picker>
    </v-dialog>

    <!-- Date Dialog  -->
    <v-dialog
      v-else
      ref="dialogDate"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <div class="field-date__box">
          <v-text-field
            class="field"
            v-model="simpleDate"
            :error="error"
            :error-messages="errorMessage"
            :label="label"
            readonly
            :dark="dark"
            v-on="on"
            :outlined="outlined"
          >
            <template v-slot:append>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    @click="setTodayDate()"
                    text
                    color="rgb(29, 211, 29)"
                    v-on="on"
                    class="insert_date-btn"
                  >
                    <v-icon>calendar_today</v-icon>
                  </v-btn>
                </template>
                <span>pegar fecha actual</span>
              </v-tooltip>
            </template>
          </v-text-field>
        </div>
      </template>
      <v-date-picker v-model="time" :min="min" scrollable :locale="lang">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialogDate.save(time)">OK</v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component, Vue } from "vue-property-decorator";
import "./TimeFieldStyle.scss";
import moment from "moment";

@Component({})
export default class TimeField extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ default: "date" }) type!: string;
  @Prop({ default: "es" }) lang!: string;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: "" }) error!: string;
  @Prop({ default: "" }) min!: string;
  @Prop({ default: false }) outlined!: boolean;
  @Prop({ default: false }) dark!: boolean;
  @Prop({ default: "" }) errorMessage!: string;

  // date
  private menu = false;
  private date = "";
  // time
  private time = "";
  private simpleDate = "";
  private menu2 = false;
  private modal2 = false;

  created() {
    this.time = this.value;
  }

  @Watch("time")
  updateTime() {
    console.log(`change time ${this.time}`);
    if (this.time.indexOf(":") == -1) {
      this.simpleDate = "";
    }
    this.$emit("input", this.time);
  }

  @Watch("value")
  updateValue() {
    if (this.time.indexOf(":") == -1) {
      if (this.value == "") {
        this.simpleDate = "";
        this.time = "";
      } else {
        this.simpleDate = this.getDate(this.value);
      }
    }
  }

  /**
   @TODO 
    Refactor method
  */
  setTodayDate() {
    this.simpleDate = this.getDate();
    const parts = this.simpleDate.split("/");
    this.time = `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  getDate(datetime?: string) {
    if (datetime) {
      return moment(datetime).format("DD/MM/YYYY");
    } else {
      return moment().format("DD/MM/YYYY");
    }
  }

  /**
   @TODO 
    Refactor method
  */
  setTodayHour() {
    let hParts = new Date()
      .toLocaleTimeString()
      .split(" ")[0]
      .split(":");
    console.log(hParts);
    if (hParts[0].length == 1) {
      hParts[0] = "0" + hParts[0];
    }
    this.time = `${hParts[0]}:${hParts[1]}`;
  }
}
</script>
<style lang="scss">
.field-date__box {
  display: flex;
  .btn-date {
    position: relative;
    margin-top: 20px;
  }
}
</style>
