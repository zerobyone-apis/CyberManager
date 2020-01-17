export default class Datetime {
  
  convert(date: string, hour?: string) {
    let d = date.split('/');
    let orderDate = d[2] + '-' + d[0] + '-' + d[1];
    let h = (hour == undefined ? '' : hour);
    return orderDate + (h == '' ? '' : ' ' + h);
  }

  backendConvert(date: string, hour?: string) {
    // let d = date.split('/');
    let orderDate = date;//d[2] + '-' + d[1] + '-' + d[0];
    let h = (hour == undefined ? '' : hour);
    return orderDate + (h == '' ? '' : ' ' + h);
  }


  backendNow() {
    return this.backendConvert(
      new Date().toLocaleDateString(),
      new Date().toLocaleTimeString()
    );
  }

  now(datetime?: string) {
    if (datetime) {
      return this.getDate(datetime) + ' ' + this.getHour(datetime);
    } else {
      let parts = this.convert(
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      ).split(' ');
      let dParts = parts[0].split('-');
      parts[0] = `${dParts[1]}/${dParts[2]}/${dParts[0]}`

        return `${parts[0]} ${parts[1]}` // remove AM or PM
    }
  }

  getDate(datetime?: string | Date | undefined) {
    if (datetime) {
      let d =  datetime.toString().split(' ')[0].split('-');
      return `${d[0]}/${d[1]}/${d[2]}`;
    } else {
      return new Date().toLocaleDateString();
    }
  }


  getHour(datetime?: string) { // datetime: 2019-11-26T03:00:00.000Z
    if (datetime) {
      return datetime.split('T')[1].split('.')[0];
    } else {
      return new Date().toLocaleTimeString().split(' ')[0];
    }
  }


  normalize(datetime: string) { // datetime: 2019-11-26T03:00:00.000Z
    // console.log('Normalize date: ', datetime)
    let partDate = datetime.split('T')[0].split('-');
    // console.log('Result: ', partDate[2] + '-' + partDate[1] + '-' + partDate[0] + ' ' + this.getHour(datetime))
    return partDate[2] + '/' + partDate[1] + '/' + partDate[0] + ' ' + this.getHour(datetime).substring(0, 5)
  }


  convertDatetime(time: string | Date) {
    // 06/12/2019 00:00:00 or 06-12-2019 00:00:00
    let splitChar = '-';
    if(time.toString().indexOf('/') != -1) {
      splitChar = '/';
    }
    let d: string[] = time.toString().split(' ')[0].split(splitChar);
    let h = time.toString().split(' ')[1];
    if(h == 'undefined') {
      h = '00:00:00';
    }
    let formated = d[2] + '-' + d[1] + '-' + d[0];
    // console.log(formated)
    return formated;
  }


}
