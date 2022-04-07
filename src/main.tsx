import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import App from './App'
import ReactDOM from 'react-dom' 

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)