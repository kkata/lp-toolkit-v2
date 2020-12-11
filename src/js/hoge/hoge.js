import Tab from '../modules/Tab'
import sal from 'sal.js'

import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'

const application = Application.start()
const context = require.context('./controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

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
