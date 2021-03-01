import * as React from 'react'
import {countries, Country, itemToString} from '../utils/countries'

import {useSelect} from 'downshift'
import {Button, Text, List, ListItem, Box} from '@chakra-ui/react'

export default function Select() {
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    isOpen,
    highlightedIndex,
    selectedItem,
  } = useSelect<Country>({
    items: countries,
    itemToString,
    stateReducer(prevState, actionAndChanges) {
      const {type, changes} = actionAndChanges

      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown:
          return {
            selectedItem: countries[changes.highlightedIndex ?? 0],
            isOpen: false,
            highlightedIndex: -1,
          }
        case useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp:
          return {
            selectedItem:
              countries[changes.highlightedIndex ?? countries.length - 1],
            isOpen: false,
            highlightedIndex: -1,
          }
        default:
          return changes
      }
    },
  })
  return (
    <Box width={354}>
      <Text as="label" {...getLabelProps()}>
        Countries:{' '}
      </Text>
      <Button display="block" width={354} size="md" {...getToggleButtonProps()}>
        {selectedItem ? itemToString(selectedItem) : `Countries`}
      </Button>
      <List
        position="absolute"
        maxHeight={240}
        overflowY="scroll"
        {...getMenuProps()}
      >
        {isOpen
          ? countries.map((item, index) => (
              <ListItem
                key={item.name}
                fontWeight={
                  selectedItem && selectedItem === item ? 'bold' : undefined
                }
                backgroundColor={
                  highlightedIndex === index ? 'lightblue' : undefined
                }
                {...getItemProps({item, index})}
              >
                {item.name}
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  )
}
