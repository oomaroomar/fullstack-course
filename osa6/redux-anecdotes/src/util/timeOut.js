const timeOut = (callback, timeout) => {
  console.log('timeout started')
  return setTimeout(() => {
    callback()
  }, timeout)

}

export { timeOut }