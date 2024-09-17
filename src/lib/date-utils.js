const moment = require('moment');

Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

function getDateInfo(date) {
    const year = date.getFullYear();
    
    // Calculate the quarter (Jan-Mar = Q1, Apr-Jun = Q2, etc.)
    const month = date.getMonth() + 1;
    //const quarter = Math.floor(month / 3);
    const quarter = moment(date).quarter()
    
    // Calculate the first day of the year and the first day of the current quarter
    const startOfYear = new Date(year, 0, 1);
    const startOfQuarter = new Date(year, (quarter - 1) * 3, 1);
    
    // Get the difference in days between the start of the quarter and the given date
    const msPerDay = 24 * 60 * 60 * 1000;
    const dayOfQuarter = Math.floor((date - startOfQuarter) / msPerDay) + 1;
    
    // Calculate the week number within the quarter (week starts on Sunday)
    const week = Math.floor(dayOfQuarter / 7) + 1;

    // Get the correct day number with Sunday as day 1 (Sunday = 0 in getDay())
    const day = date.getDay() === 0 ? 1 : date.getDay() + 1;

    // Format the return object
    return {
      year: year.toString(),
      quarter: quarter.toString().padStart(2, '0'),
      week: week.toString().padStart(2, '0'),
      day: day.toString().padStart(2, '0')
    };
  }

  function getMonthNameFromDateInternational(langCode, date, style = 'long') {
    const formatter = new Intl.DateTimeFormat(langCode, { month: style });
    return formatter.format(date);
  }

  function getDayNameFromDateInternational(langCode, date, style = 'long') {
    const formatter = new Intl.DateTimeFormat(langCode, { weekday: style });
    return formatter.format(date);
  }

  function getLocalDate(dateDDMMYYYY) {
    // Split the date string into day, month, and year parts
    const [day, month, year] = dateDDMMYYYY.split('/').map(Number);
    
    // JavaScript Date constructor uses month index starting from 0 (January is 0)
    // So, we subtract 1 from the month value
    return (new Date(year, month - 1, day)).addHours(12);
  }

  module.exports = {
    getDateInfo,
    getDayNameFromDateInternational,
    getMonthNameFromDateInternational,
    getLocalDate
  };
  
  // // Example usage:
  // const date = new Date('2024-09-15T12:00:00Z');
  // const result = getDateInfo(date);
  // console.log(result);
