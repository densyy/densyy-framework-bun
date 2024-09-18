export default class BunDate {
  now () {
    return new Date()
  }

  //
  // ADD
  //

  addHours (hours) {
    const newDate = this.now()
    newDate.setHours(newDate.getHours() + hours)
    return newDate
  }

  addDays (days) {
    const newDate = this.now()
    newDate.setDate(newDate.getDate() + days)
    return newDate
  }

  addMonths (months) {
    const newDate = this.now()
    newDate.setMonth(newDate.getMonth() + months)
    return newDate
  }

  addYears (years) {
    const newDate = this.now()
    newDate.setFullYear(newDate.getFullYear() + years)
    return newDate
  }

  //
  // PRINT
  //

  printDateBR () {
    return this._format('dd/MM/yyyy')
  }

  printDateTimeBR () {
    return this._format('dd/MM/yyyy HH:mm:ss')
  }

  printDateUSA () {
    return this._format('yyyy-MM-dd')
  }

  //
  // CONVERT
  //

  dateStringBRtoDate (dateString) {
    const [day, month, year] = dateString.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  dateStringUSAtoDate (dateString) {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day)
  }

  dataObjtoDate (year, month, day = 1) {
    day = day.toString().padStart(2, '0')
    month = month.toString().padStart(2, '0')

    const dateStringUSA = `${year}-${month}-${day}`
    return this.dateStringUSAtoDate(dateStringUSA)
  }

  _format (formato = 'dd/MM/yyyy HH:mm:ss') {
    const newDate = this.now()
    const day = newDate.getDate().toString().padStart(2, '0')
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
    const year = newDate.getFullYear()
    const hour = newDate.getHours().toString().padStart(2, '0')
    const minute = newDate.getMinutes().toString().padStart(2, '0')
    const second = newDate.getSeconds().toString().padStart(2, '0')

    return formato
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second)
  }
}
