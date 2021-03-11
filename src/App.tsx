import React from 'react'
import './App.css'
import Select from './components/Select'
import {ChakraProvider} from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <div className="container">
          <Select />
        </div>
        <div className="container">
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
