class Tab {
  constructor(tabClassName, tabContentClassName, initialTab) {
    this.tab = document.getElementsByClassName(tabClassName)
    this.tabContent = document.getElementsByClassName(tabContentClassName)
    this.initialTab = initialTab
  }

  init() {
    if (!this.tab) return
    this.bindEvent()
    this.changeButtonSate(
      document.querySelector('[aria-controls=' + this.initialTab + ']'),
    )
    this.changeTabPanel(
      document.querySelector('[aria-controls=' + this.initialTab + ']'),
    )
  }

  addEvent(listenerPc) {
    this.tab.forEach((element) => {
      element.addEventListener('click', listenerPc, false)
    })
  }
  bindEvent() {
    const listenerPc = () => {
      this.handleTab(event)
    }
    this.addEvent(listenerPc)
  }

  handleTab(event) {
    this.changeButtonSate(event.currentTarget)
    this.changeTabPanel(event.currentTarget)
  }

  changeButtonSate(target) {
    this.tab.forEach((element) => {
      element.ariaSelected = false
    })
    target.ariaSelected = true
  }

  changeTabPanel(target) {
    this.tabContent.forEach((element) => {
      element.ariaHidden = true
    })
    document.getElementById(
      target.getAttribute('aria-controls'),
    ).ariaHidden = false
  }
}

export default Tab
