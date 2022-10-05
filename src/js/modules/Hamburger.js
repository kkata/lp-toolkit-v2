const NAV_VISIBLE_CLASS = 'is-visible'
const NAV_OPEN_CLASS = 'is-open'
const NAV_TOGGLE_CLASS = 'is-toggle'

class Hamburger {
  constructor() {
    this.button = document.getElementById('js-nav-btn')
    this.nav = document.getElementById('js-nav')
    this.matchMedia = window.matchMedia('screen and (min-width: 1000px)')
    this.isOpen = false
  }

  init() {
    if (!this.button) return
    this.bindEvent()
    if (!this.matchMedia.matches) {
      this.button.classList.add(NAV_VISIBLE_CLASS)
    }
  }

  bindEvent() {
    this.button.addEventListener(
      'click',
      (event) => {
        this.handleEvent(event)
      },
      false,
    )
    this.matchMedia.addListener((event) => {
      if (event.matches) {
        this.button.classList.remove(NAV_VISIBLE_CLASS)
        this.button.classList.remove(NAV_TOGGLE_CLASS)
        this.nav.classList.remove(NAV_OPEN_CLASS)
        this.nav.ariaHidden = true
        this.button.ariaExpanded = false
        this.isOpen = false
      } else {
        this.button.classList.add(NAV_VISIBLE_CLASS)
      }
    })
  }

  handleEvent(event) {
    this.nav.classList.toggle(NAV_OPEN_CLASS)

    this.nav.ariaHidden = !!this.isOpen
    this.button.ariaExpanded = !!!this.isOpen
    this.isOpen = !!!this.isOpen

    event.currentTarget.classList.toggle(NAV_TOGGLE_CLASS)
  }
}

export default Hamburger
