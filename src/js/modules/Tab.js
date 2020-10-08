class Tab {
  constructor(tabClassName, tabContentClassName) {
    this.tab = document.getElementsByClassName(tabClassName)
    this.tabContent = document.getElementsByClassName(tabContentClassName)
    this.tabActiveClassName = 'is-active'
    this.tabContentVisibleClassName = 'is-visible'
  }

  init() {
    if (!this.tab) return
    this.bindEvent()
    this.changeVisibility(this.tab[0], this.tabContent[0])
  }

  removeClassName(nodeList, className) {
    Array.prototype.slice.call(nodeList).forEach((elem) => {
      elem.classList.remove(className)
    })
  }
  hasClassName(elem, className) {
    return elem.classList.contains(className)
  }
  changeVisibility(target, content) {
    this.removeClassName(this.tab, this.tabActiveClassName)
    this.removeClassName(this.tabContent, this.tabContentVisibleClassName)
    content.classList.add(this.tabContentVisibleClassName)
    target.classList.add(this.tabActiveClassName)
  }
  handleClickPc(event) {
    event.preventDefault()
    const target = event.currentTarget
    const content = document.querySelector(
      '.' + event.currentTarget.dataset.target,
    )
    this.changeVisibility(target, content)
  }
  addEvent(listenerPc) {
    Array.prototype.slice.call(this.tab).forEach((elem) => {
      elem.addEventListener('click', listenerPc, false)
    })
  }
  bindEvent() {
    const listenerPc = () => {
      this.handleClickPc(event)
    }
    this.addEvent(listenerPc)
  }
}

export default Tab
