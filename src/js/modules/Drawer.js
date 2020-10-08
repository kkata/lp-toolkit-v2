class Drawer {
  constructor() {
    this.button = document.getElementById('js-nav-btn')
    this.nav = document.getElementById('js-nav')
    this.activeClassName = 'js-active'
    this.navVisibleClassName = 'is-visible'
    this.isOpened = false
    this.matchMedia = window.matchMedia('screen and (min-width: 1000px)')
  }

  init() {
    if (!this.button) return
    this.bindEvent()
  }

  bindEvent() {
    this.changeState(this.matchMedia.matches)
    this.button.addEventListener(
      'click',
      () => {
        this.changeState(!this.isOpened)
      },
      false,
    )
    this.matchMedia.addListener((event) => {
      this.changeState(event.matches)
    })
  }

  changeState(state) {
    this.changeButtonClass(state)
    this.changeNavVisibility(state)
    this.isOpened = state
  }

  changeButtonClass(state) {
    if (state) {
      this.button.classList.add(this.activeClassName)
    } else {
      this.button.classList.remove(this.activeClassName)
    }
  }

  changeNavVisibility(state) {
    if (state) {
      this.nav.classList.add(this.navVisibleClassName)
    } else {
      this.nav.classList.remove(this.navVisibleClassName)
    }
  }
}

export default Drawer
