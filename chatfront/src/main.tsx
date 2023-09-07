import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import r2wc from "react-to-webcomponent"

const ChatFront = r2wc(App, React, ReactDOM)

customElements.define("chat-front", ChatFront)