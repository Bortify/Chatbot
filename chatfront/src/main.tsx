import install from '@twind/with-web-components'
import ReactDOM from 'react-dom/client'

import config from './twind.config'
import App from './App'

const withTwind = install(config)

class ChatFront extends withTwind(HTMLElement) {
  constructor() {
    super()
    const shadow: ShadowRoot = this.attachShadow({ mode: 'open' })
    const mountPoint: HTMLDivElement = document.createElement('div')
    shadow.appendChild(mountPoint)
    const key = this.getAttribute('key') || ''
    const root = ReactDOM.createRoot(mountPoint)
    root.render(<App identifier={key}/>)
  }
}

customElements.define('chat-front', ChatFront)
