import Vue from 'vue'

function isGt10 (n) {
  return n < 10 ? '0' + n : n
}
Vue.filter('formatTime', (input) => {
  const d = new Date(input)
  const year = d.getFullYear()
  const month = isGt10(d.getMonth() + 1)
  const day = isGt10(d.getDate())
  const hour = isGt10(d.getHours())
  const minutes = isGt10(d.getMinutes())
  if (year) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes
  } else {
    return ''
  }
})
