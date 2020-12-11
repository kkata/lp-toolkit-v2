import { Controller } from 'stimulus'

export default class extends Controller {
  static values = { isOpen: Boolean }
  static targets = ['content']
  static classes = ['visible']

  initialize() {
    this.isOpen = false
  }

  toggleContent() {
    this.contentTarget.classList.toggle(this.data.get('visibleClass'))
  }

  toggleText(e) {
    this.isOpen = !this.isOpen
    return (e.currentTarget.innerHTML = this.isOpen ? '閉じる' : '続きを読む')
  }
}
