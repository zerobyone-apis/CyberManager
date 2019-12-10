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
        <v-text-field
          v-model="time"
          :error="error"
          :error-messages="errorMessage"
          :label="label"
          :prepend-icon="icon"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker v-model="time" full-width scrollable :locale="lang">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialogHour.save(time)"
          >OK</v-btn
        >
      </v-time-picker>
    </v-dialog>

    <v-dialog
      v-else
      ref="dialogDate"
      v-model="modal2"
      :return-value.sync="time"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="time"
          :error="error"
          :error-messages="errorMessage"
          :label="label"
          :prepend-icon="icon"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="time" scrollable :locale="lang">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.dialogDate.save(time)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Prop, Watch, Component } from 'vue-property-decorator';
import TimeFieldCode from './TimeFieldCode';
import './TimeFieldStyle.scss';
import Datetime from '../../../../backend/src/utils/DateTime';

@Component({})
export default class TimeField extends TimeFieldCode {
  @Prop({ default: new Datetime().now() }) value: string;

  @Prop({ default: 'date' }) type!: string;
  @Prop({ default: 'es' }) lang!: string;
  @Prop({ default: '' }) label!: string;
  @Prop({ default: '' }) icon!: string;
  @Prop({ default: '' }) error!: string;
  @Prop({ default: '' }) errorMessage!: string;

  @Watch('value')
  updateTime() {
    this.time = this.value;
    this.$emit('input', this.time);
  }
}
</script>
