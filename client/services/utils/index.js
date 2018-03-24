/**
 * LeForum Project
 *
 * github.com/MrOnlineCoder/LeForum
 * (c) MrOnlineCoder 2018
 */

import moment from 'moment'

function formatDate(raw) {
  return moment(raw).format('DD.MM.YYYY');
}


export default {
  formatDate
}
