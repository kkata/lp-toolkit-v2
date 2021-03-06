import LinkScroll from './modules/LinkScroll'
import Drawer from './modules/Drawer'
import LazyLoad from 'vanilla-lazyload'
import whatInput from 'what-input'

document.addEventListener('DOMContentLoaded', (event) => {
  const drawer = new Drawer().init()
  const linkScroll = new LinkScroll().init()
  const pageLazyLoad = new LazyLoad({
    elements_selector: '.lazy',
  })
})
