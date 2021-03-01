import * as React from 'react'
import {countries, Country, getCountries, itemToString} from '../utils/countries'

import {useCombobox} from 'downshift'
import {
  Text,
  List,
  ListItem,
  Flex,
  Input,
  Box,
  IconButton,
} from '@chakra-ui/react'
import {ChevronDownIcon, SmallCloseIcon} from '@chakra-ui/icons'

export default function Combobox() {
  const [items, setItems] = React.useState<Country[]>([])
  const [selectedItem, setSelectedItem] = React.useState<Country | null>(null)

  React.useEffect(() => {
    setTimeout(() => {
      setSelectedItem(countries[10])
    }, 1000)
  }, [])
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    getInputProps,
    getComboboxProps,
    isOpen,
    highlightedIndex,
    reset,
  } = useCombobox<Country>({
    items,
    itemToString,
    selectedItem,
    stateReducer(state, actionAndChanges) {
      const {type, changes} = actionAndChanges

      if (type === useCombobox.stateChangeTypes.InputBlur) {
        return {
          ...changes,
          inputValue: state.inputValue,
          selectedItem: state.selectedItem,
        }
      }

      return changes
    },
    onSelectedItemChange({selectedItem}) {
      if (typeof selectedItem !== 'undefined') {
        setSelectedItem(selectedItem)
      }
    },
    onInputValueChange({inputValue}) {
      if (typeof inputValue !== 'undefined') {
        getCountries(inputValue).then((items: Country[]) => {
          setItems(items)
        })
      }
    }
  })

  return (
    <Box width={354}>
      <Text as="label" {...getLabelProps()}>
        Select a Country:{' '}
      </Text>
      <Flex {...getComboboxProps()}>
        <Input {...getInputProps()} placeholder="Type in a country ..."></Input>
        <IconButton
          icon={<ChevronDownIcon />}
          size="md"
          {...getToggleButtonProps()}
        ></IconButton>
        <IconButton
          icon={<SmallCloseIcon />}
          size="md"
          aria-label="clear selection"
          onClick={() => {
            reset()
          }}
          tabIndex={-1}
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
