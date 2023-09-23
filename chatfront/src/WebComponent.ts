import React from 'react'
import ReactDOM from 'react-dom/client'
import r2wc from 'react-to-webcomponent'

import App from './App'

const ChatFront = r2wc(App, React, ReactDOM, {
  props: {
    identifier: 'string',
  },
})

export default ChatFront
