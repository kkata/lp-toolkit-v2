import LinkScroll from './modules/LinkScroll'
import Hamburger from './modules/Hamburger'
import LazyLoad from 'vanilla-lazyload'
import whatInput from 'what-input'

document.addEventListener('DOMContentLoaded', (event) => {
  const hamburger = new Hamburger().init()
  const linkScroll = new LinkScroll().init()
  const pageLazyLoad = new LazyLoad({
    elements_selector: '.lazy',
  })
})
