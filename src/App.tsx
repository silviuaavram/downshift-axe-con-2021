import React from 'react'
import './App.css'
import Select from './components/Select'
import {ChakraProvider} from '@chakra-ui/react'
import Combobox from './components/Combobox'
import MultipleSelect from './components/MultipleSelect'
import MultipleCombobox from './components/MultipleCombobox'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <div className="container">
          <Select />
          <Combobox />
        </div>
        <div className="container">
          <MultipleSelect />
          <MultipleCombobox />
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
