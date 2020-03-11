import vue from 'vue';

export interface IConfirmDialog {
  title: string;
  info: string;
  agreeText: string;
  disagreeText: string;
  buttonActivator: string;
}

export default class ConfirmDialogView extends vue {
}