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
  Button,
} from '@chakra-ui/react'
import {ChevronDownIcon} from '@chakra-ui/icons'

export default function MultipleCombobox() {
  const [selectedItems, setSelectedItems] = React.useState<Country[]>([])
  const {
    removeSelectedItem,
    getDropdownProps,
    getSelectedItemProps,
    addSelectedItem,
  } = useMultipleSelection<Country>({
    selectedItems,
    onSelectedItemsChange({selectedItems}) {
      selectedItems && setSelectedItems(selectedItems)
    },
  })
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
    selectedItem: null,
    itemToString,
    onSelectedItemChange: ({selectedItem}) => {
      selectedItem && addSelectedItem(selectedItem)
    },
    onInputValueChange({inputValue}) {
      if (typeof inputValue !== 'undefined') {
        getCountries(inputValue).then((items: Country[]) => {
          setItems(items)
        })
      }
    },
    stateReducer(state, actionAndChanges) {
      const {type, changes} = actionAndChanges

      if (
        type === useCombobox.stateChangeTypes.ItemClick ||
        type === useCombobox.stateChangeTypes.InputKeyDownEnter
      ) {
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: true,
        }
      }

      return changes
    },
  })

  return (
    <Box width={354}>
      {selectedItems.length > 0 ? (
        <Box>
          <Text>You have selected {selectedItems.length} items.</Text>
          <Button onClick={() => setSelectedItems([])}>Clear selection.</Button>
        </Box>
      ) : null}
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
            onClick={(e) => {
              e.stopPropagation()
              removeSelectedItem(selectedItem)
            }}
          />
        </Tag>
      ))}
      <Flex {...getComboboxProps()}>
        <Input
          {...getInputProps({...getDropdownProps({preventKeyAction: isOpen})})}
          placeholder="Type in a country ..."
        ></Input>
        <IconButton
          icon={<ChevronDownIcon />}
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
