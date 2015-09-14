var FancyHelpers = {
  _filterRecords(text, records, recordProperty) {
    return records.filter(function (record) {
      return record[recordProperty].toLowerCase().indexOf(text.toLowerCase()) >= 0
    })
  }
};