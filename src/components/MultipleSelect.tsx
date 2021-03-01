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
  const {
    selectedItems,
    getDropdownProps,
    getSelectedItemProps,
    addSelectedItem,
    removeSelectedItem,
  } = useMultipleSelection<Country>()
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
    selectedItem: null,
    onSelectedItemChange: ({selectedItem}) => {
      selectedItem && addSelectedItem(selectedItem)
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
          {...getSelectedItemProps({selectedItem, index})}
        >
          <TagLabel>{selectedItem.name}</TagLabel>
          <TagCloseButton
            onClick={e => {
              e.stopPropagation()
              removeSelectedItem(selectedItem)
            }}
          />
        </Tag>
      ))}
      <Button
        display="block"
        width={354}
        size="md"
        {...getToggleButtonProps({...getDropdownProps({preventKeyAction: isOpen})})}
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
