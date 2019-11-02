import { Vue, Component } from "vue-property-decorator";
import PageData from '../../../data/PageData';
import ReservationStructure from './ReservationStructure';
import InBack from "./IntegrationBackend";
//timeout: 1000,

export default class ReservationDialogCode extends Vue {
    // show access dialog inside this dialog
    private accessDialog: boolean = false;

    private structure = new ReservationStructure();
    private steps: any = this.structure.steps;
    private data: any = new PageData();
    private item: any = {};
    private wizard: number = 1;
    private inback = new InBack();

    private reservation = {
        employeeId: null,
        clientId: null,
        workId: null,
        startHour: null,
        startDate: null,
        isSuccess: false,
    }

    private selectedEmployee: any = {};
    private selectedJob: any = {};

    private structureObjectReservationResponse = {
        reserve_id: null,
        barberOrHairdresserId: null,
        clientId: null,
        nameClient: null,
        mailClient: null,
        celClient: null,
        startTime: null,
        endTime: null,
        createOn: null,
        work_id: null,
        workToDo: null,
        priceWork: null,
        workTime: null,
        additionalCost: null,
        totalCost: null
    }

    //show and hide the reservation
    get model(): boolean {
        return this["value"];
    }

    set model(model: boolean) {
        this.$emit("input", model);
    }

    private selectJob(job: any) {
        this.selectedJob = job;
        this.reservation.workId = job.workId;
    }

    private selectEmployee(employee: any) {
        this.selectedEmployee = employee;
        this.selectedJob = {};
        this.reservation.employeeId = employee.userId;
    }

    private getWorksByTypeEmployee() {
        // in this case, check if selectedEmployee have the key barberId, 
        // in this case, is barber
        if (this.selectedEmployee["barberId"]) {
            return this.data.works.barberWorks;
        } else {
            return this.data.works.hairdresserWorks;
        }
    }

    private checkSuccessStep() {
        let required = this.steps[this.wizard - 1].required;
        if (this.reservation[required] != undefined) {
            return false;//not disabled
        } else {
            return true; //disabled
        }
    }

    //pensar este metodo: debe desmarcar todos los domingos 
    private getDaysExceptWednesday() {
        return val => parseInt(val.split('-')[2]) % 7 === 1;
    }

    private getDayNumber(date: any) {
        return new Date(date).getDay();
    }

    private selectHour(hour: any) {
        this.data.weekObject.map((item: any) => {
            if (item == hour) {
                item.selected = true;
                this.reservation.startHour = hour.hour;
            } else {
                item.selected = false;
            }
        });
    }

    private getHours(saturday: boolean) {
        let items: any = [];
        this.data.weekObject.forEach((item: any) => {
            if (item.saturday == saturday) {
                items.push(item);
            }
        });
        return items;
    }

    next() {
        if (this.steps.length > this.wizard) this.wizard += 1;
    }

    prev() {
        if (this.steps.length > 0) this.wizard -= 1;
    }

    jump(value: number) {
        if (value >= 0 && value <= this.steps.length) {
            this.wizard = value;
        }
    }

    getFieldType(type: string): string {
        let component: string = "";
        if (type == "input") component = "v-text-field";
        if (type == "select") component = "v-select";
        if (type == "list") component = "x-list";
        if (type == "checkbox") component = "v-checkbox";
        if (type == "date") component = "v-date-picker";
        return component;
    }

    async event() {
        try {
            if (this.$store.getters.userLogged) {
                // continue with the reservation
            } else {
                console.log('no tiene data')
                this.accessDialog = true;
            }
        } catch (error) {
            console.error('yep, algo se rompio' + error);
        }
    }
}