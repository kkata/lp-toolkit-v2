import Tab from '../modules/Tab'
import sal from 'sal.js'

const tab = new Tab('js-tab', 'js-tab-content')
tab.init()

const inViewAnimateElements = document.querySelectorAll('.js-block-animated')

inViewAnimateElements.forEach((element) => {
  element.addEventListener('sal:in', ({ detail }) => {
    detail.target.classList.add('is-inview')
  })
})
const scrollAnimations = sal({
  rootMargin: '0px 0px -40% 0px',
  threshold: 0.4,
})

class Toggle {
  constructor() {
    this.button = document.querySelectorAll('.js-toggle-btn')
    this.toggleContentClassName = 'is-visible'
    this.toggleButtonClassName = 'is-clicked'
    this.toggleButtonTextClose = '閉じる'
    this.toggleButtonTextOpen = '続きを読む'
  }

  init() {
    if (!this.button) return
    this.bindEvent()
  }

  changeState(content, target) {
    this.changeButtonText(content, target)
    this.changeVisibility(content, target)
  }

  hasClassName(elem, className) {
    return elem.classList.contains(className)
  }

  changeVisibility(content, target) {
    if (!this.hasClassName(content, this.toggleContentClassName)) {
      content.classList.add(this.toggleContentClassName)
    } else {
      content.classList.remove(this.toggleContentClassName)
    }
  }
  changeButtonText(content, target) {
    if (!this.hasClassName(content, this.toggleContentClassName)) {
      target.innerHTML = this.toggleButtonTextClose
      target.classList.add(this.toggleButtonClassName)
    } else {
      target.innerHTML = this.toggleButtonTextOpen
      target.classList.remove(this.toggleButtonClassName)
    }
  }
  bindEvent() {
    this.button.forEach((elem) => {
      elem.addEventListener(
        'click',
        (event) => {
          event.preventDefault()

          const target = event.currentTarget
          const content = document.querySelector(
            '.' + event.currentTarget.dataset.target,
          )

          this.changeState(content, target)
        },
        false,
      )
    })
  }
}

const toggle = new Toggle()
toggle.init()
