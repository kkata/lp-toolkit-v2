import MoveTo from 'moveto'

class LinkScroll {
  constructor() {
    this.trigger = document.querySelectorAll('a[href^="#"]')
    this.headerHeight = 0
    this.matchMedia = window.matchMedia('screen and (min-width: 960px)')
  }

  init() {
    this.bindEvent()
  }

  getHeaderHeight() {
    return (this.headerHeight = this.matchMedia.matches
      ? 0
      : (this.headerHeight = document.querySelector(
          '[data-scroll-header]',
        ).offsetHeight))
  }

  registerMoveTo() {
    this.trigger.forEach((elem) => {
      this.moveTo.registerTrigger(elem)
    })
  }

  bindEvent() {
    this.matchMedia.addListener((event) => {
      if (event.matches) {
        this.moveTo.options.tolerance = 0
        this.registerMoveTo()
      } else {
        this.moveTo.options.tolerance = document.querySelector(
          '[data-scroll-header]',
        ).offsetHeight
        this.registerMoveTo()
      }
    })
    this.getHeaderHeight()
    this.moveTo = new MoveTo({
      tolerance: this.headerHeight,
      duration: 800,
      easing: 'easeOutQuart',
      container: window,
    })
    this.registerMoveTo()
  }
}

export default LinkScroll
