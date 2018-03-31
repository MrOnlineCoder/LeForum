/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

import moment from 'moment'
import camelcase from 'camelcase'

function formatDate(raw) {
  return moment(raw).format('DD.MM.YYYY');
}

function formatDateTime(raw) {
  let a = moment(raw);

  if (a.isSame(new Date(), 'day')) {
    return 'today at '+a.format('HH:mm');
  }

  return moment(raw).format('DD.MM.YYYY HH:mm');
}

function toCamelCase(data) {
  return camelcase(data);
}

export default {
  formatDate,
  formatDateTime,
  toCamelCase
}
