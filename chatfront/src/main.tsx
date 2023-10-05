// import ChatFront from './WebComponent'
import './index.css'

// customElements.define('chat-front',ChatFront)

import install from '@twind/with-web-components'
import config from './twind.config'

const withTwind = install(config)

class TwindElement extends withTwind(HTMLElement) {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })
    
    shadow.innerHTML = `<h1 class="text-3xl font-bold underline">Hello world!</h1>`
  }
}

customElements.define('twind-element', TwindElement,)