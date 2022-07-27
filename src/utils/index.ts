import { API } from "@/global";

class Utils {
  formVerify(form: { [x: string]: null; }, rules: any) {
    for (const res of rules) {
      if (form[res.field] === '' || form[res.field] === undefined || form[res.field] === null) {
        return res.msg;
      }
    }
    return false;
  }

  formatTime(time: string, date = false,ch=false) {
    let formatDate = time.split('T').join(' ').split('.')[0]
    let _data =  date ? formatDate.split(' ')[0] : formatDate
    if(ch){
      // 将 2022-01-01 12:20:20 转化为 2022年01月01日 12时20分20秒
      const _year = _data.split('-')[0]
      const _month = _data.split('-')[1]
      const _day = _data.split(' ')[0].split('-')[2]
      const _hour = _data.split(' ')[1].split(':')[0]
      const _minute = _data.split(' ')[1].split(':')[1]
      const _second = _data.split(' ')[1].split(':')[2]
      _data = `${_year}年${_month}月${_day}日 ${_hour}时${_minute}分`
    }
    return _data
  }

  now() {
    return new Date().toLocaleDateString().split('/').join('-')
  }


  pad2(n: string | number) { return n < 10 ? '0' + n : n }

  pad4(n: number) { return n < 1000 ? JSON.stringify(n).padStart(4 - JSON.stringify(n).length, '0') : n }

  getFullTime(date: Date) {
    return date.getFullYear().toString() + '-' + this.pad2(date.getMonth() + 1) + '-' + this.pad2(date.getDate()) + ' ' + this.pad2(date.getHours()) + ':' + this.pad2(date.getMinutes());
  }

  assign(form: API.IObject, copyForm: API.IObject) {
    const _copyForm = JSON.parse(JSON.stringify(copyForm))
    const _keys = Object.keys(form)
    _keys.forEach((res) => { form[res] = _copyForm[res] })
    return form
  }
}


export default new Utils()