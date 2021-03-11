import * as React from 'react'
import {
  countries,
  Country,
  getCountries,
  itemToString,
} from '../utils/countries'

import {useSelect} from 'downshift'
import {
  Text,
  List,
  ListItem,
  Flex,
  Input,
  Box,
  IconButton,
} from '@chakra-ui/react'
import {ChevronDownIcon, ChevronUpIcon, SmallCloseIcon} from '@chakra-ui/icons'

export default function Combobox() {
  const [items, setItems] = React.useState<Country[]>([])
  // ToDo: Replace with useCombobox
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
  })

  return (
    <Box width={354}>
      <Text as="label" {...getLabelProps()}>
        Select a Country:{' '}
      </Text>
      <Flex>
        <Input placeholder="Type in a country ..."></Input>
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
