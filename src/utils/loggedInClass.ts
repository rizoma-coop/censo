

const loggedInClass = {
  add: () => {
    document.body.classList.add('is-logged-in')
  },
  remove: () => {
    document.body.classList.remove('is-logged-in')
  },

  toggle: () => {
    const passwordId = localStorage.getItem('passwordId')
    if (passwordId) {
      loggedInClass.add()
    }
  }
}

export default loggedInClass