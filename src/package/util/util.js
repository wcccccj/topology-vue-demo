
/**
 * 防抖函数
 * @param {*} fn
 * @param {*} delay
 */
export function debounce(fn, time) {
  let _arguments = arguments
  let timeout = null
  return function() {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.call(this, _arguments)
    }, time)
  }
}
