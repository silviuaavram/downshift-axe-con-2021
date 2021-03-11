import * as React from 'react'
import {countries, Country, itemToString} from '../utils/countries'

import {useSelect, useMultipleSelection} from 'downshift'
import {
  Button,
  Text,
  List,
  ListItem,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react'

export default function MultipleSelect() {
  // ToDo: Replace this with useMultipleSelection called with itemToString
  const selectedItems: Country[] = []
  const items = countries.filter(
    (country) => selectedItems.indexOf(country) === -1,
  )
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    isOpen,
    selectedItem,
    highlightedIndex,
  } = useSelect<Country>({
    items,
    itemToString,
    // ToDo: control selectedItem
    onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
      // ToDo: add selected item
    },
  })
  return (
    <Box width={354}>
      <Text as="label" {...getLabelProps()}>
        Select a Country:{' '}
      </Text>
      {selectedItems.map((selectedItem, index) => (
        <Tag
          key={selectedItem.name + 'selected'}
        >
          <TagLabel>{selectedItem.name}</TagLabel>
          <TagCloseButton
            onClick={e => {
              // ToDo: stop propagation and remove item
            }}
          />
        </Tag>
      ))}
      <Button
        display="block"
        width={354}
        size="md"
        {...getToggleButtonProps(/* ToDo: merge props and preventKeyAction when isOpen */)}
      >
        {selectedItem ? itemToString(selectedItem) : `Countries`}
      </Button>
      <List
        position="absolute"
        maxHeight={240}
        overflowY="scroll"
        {...getMenuProps()}
      >
        {isOpen
          ? items.map((item, index) => (
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
