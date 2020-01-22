
import FastClick from 'fastclick'
if (process.client) {
  // 去除300ms延迟
  document.addEventListener(
    'DOMContentLoaded',
    function () {
      FastClick.attach(document.body)
    },
    false
  )
}
