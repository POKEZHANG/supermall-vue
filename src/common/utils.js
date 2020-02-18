export function debounce(func, delay) { //第一个参数是传入的函数,第二个是延迟的时间
  let timer = null  //记录有没有定时器
  return function(...args) { //返回一个新的函数
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}