const filterChangeAction = (filterString) => {
  return {
    type: 'CHANGE',
    payload: filterString
  }

}

export { filterChangeAction }