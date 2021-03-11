import * as React from 'react'
import {countries, itemToString} from '../utils/countries'

import {useSelect} from 'downshift'
import {Button, Text, List, ListItem, Box} from '@chakra-ui/react'

export default function Select() {
  // ToDo: call useSelect.
  return (
    <Box width={354}>
      <Text as="label">Select a Country: </Text>
      <Button display="block" width={354} size="md">
        Countries
      </Button>
      <List position="absolute" maxHeight={240} overflowY="scroll">
        {countries.map((item, index) => (
          <ListItem key={item.name}>{item.name}</ListItem>
        ))}
      </List>
    </Box>
  )
}
