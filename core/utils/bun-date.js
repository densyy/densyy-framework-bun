export default Object.freeze(
  class BunDate {
    constructor () {
      this.currentDate = new Date()
    }

    now () {
      return this.currentDate
    }

    //
    // ADD
    //

    _adjustDate (unit, value) {
      const newDate = new Date(this.currentDate)
      newDate[`set${unit}`](newDate[`get${unit}`]() + value)
      return newDate
    }

    addHours (hours) {
      return this._adjustDate('Hours', hours)
    }

    addDays (days) {
      return this._adjustDate('Date', days)
    }

    addMonths (months) {
      return this._adjustDate('Month', months)
    }

    addYears (years) {
      return this._adjustDate('FullYear', years)
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
      return new Date(year, month - 1, day)
    }

    _format (format = 'dd/MM/yyyy HH:mm:ss') {
      const date = this.currentDate
      const components = {
        dd: date.getDate().toString().padStart(2, '0'),
        MM: (date.getMonth() + 1).toString().padStart(2, '0'),
        yyyy: date.getFullYear(),
        HH: date.getHours().toString().padStart(2, '0'),
        mm: date.getMinutes().toString().padStart(2, '0'),
        ss: date.getSeconds().toString().padStart(2, '0')
      }

      return Object.entries(components).reduce(
        (formatted, [key, value]) => formatted.replace(key, value),
        format
      )
    }
  }
)
