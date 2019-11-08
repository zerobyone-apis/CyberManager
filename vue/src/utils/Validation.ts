export default class Validation {

  private fieldsFail = [];

  validateFields(forms: any[]) {
    this.fieldsFail = [];
    let noErrors = true;
    forms.forEach(fields => {
      Object.keys(fields).forEach((field: any) => {
        if (fields[field].value == '' && fields[field].required == true) {
          noErrors = false;
          let fieldError = {
            name: field,
            form: fields.formName,
            error: 'campo requerido'
          }
          console.log(fieldError)
          this.fieldsFail.push(fieldError);
        }
      });
    });
    return noErrors;
  }

  get(nameField: string) { // formName.field
    let errorString = '';

    const formName = nameField.split('.')[0];
    const fieldName = nameField.split('.')[1];

    this.fieldsFail.forEach(field => {
      if (field.form == formName && field.name == fieldName) {
        errorString = field.error;
      }
    });
    return errorString;
  }
}