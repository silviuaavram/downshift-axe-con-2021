import * as React from 'react'
import {Country, getCountries, itemToString} from '../utils/countries'

import {useCombobox, useMultipleSelection} from 'downshift'
import {
  IconButton,
  Text,
  List,
  ListItem,
  Flex,
  Input,
  Box,
  Tag,
  TagCloseButton,
  TagLabel,
} from '@chakra-ui/react'
import {ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons'

export default function MultipleCombobox() {
  // ToDo: Replace this with useMultipleSelection
  const selectedItems: Country[] = []
  const [itemsUnfiltered, setItems] = React.useState<Country[]>([])
  const items = itemsUnfiltered.filter(
    (country) => selectedItems.indexOf(country) === -1,
  )
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    getInputProps,
    getComboboxProps,
    isOpen,
    selectedItem,
    highlightedIndex,
  } = useCombobox<Country>({
    items,
    itemToString,
    // ToDo: control selectedItem
    onSelectedItemChange: ({selectedItem: newSelectedItem}) => {
      // ToDo: add selected item
    },
    onInputValueChange({inputValue}) {
      if (inputValue !== undefined) {
        getCountries(inputValue).then((items: Country[]) => {
          setItems(items)
        })
      }
    },
  })

  return (
    <Box width={354}>
      <Text as="label" {...getLabelProps()}>
        Select a Country:{' '}
      </Text>
      {selectedItems.map((selectedItem, index) => (
        <Tag key={selectedItem.name + 'selected'}>
          <TagLabel>{selectedItem.name}</TagLabel>
          <TagCloseButton
            onClick={(e) => {
              // ToDo: stop propagation and remove item
            }}
          />
        </Tag>
      ))}
      <Flex {...getComboboxProps()}>
        <Input
          {
            ...getInputProps(/* ToDo: merge props and preventKeyAction when isOpen */)
          }
          placeholder="Type in a country ..."
        ></Input>
        <IconButton
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          size="md"
          {...getToggleButtonProps()}
        ></IconButton>
      </Flex>
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
