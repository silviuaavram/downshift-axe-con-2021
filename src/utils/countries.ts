import countriesData from './countries.json'

const timeoutCount = 1000
export const countries: Country[] = countriesData

export interface Country {
  name: string
  code: string
}

export function itemToString(item: Country | null) {
  return item ? item.name : ''
}

function asyncDebounce(fn: Function): Function {
  let timeout: NodeJS.Timeout | null = null
  let promise: Promise<Country[]> | null = null
  let resolve: Function

  return function debouncedFn(...args: any[]) {
    if (!promise) {
      promise = new Promise((r) => {
        resolve = r
      })
    }

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(function () {
      resolve(fn(...args))
      timeout = null
      promise = null
    }, timeoutCount)

    return promise
  }
}

function getCountriesFn(inputValue: string): Country[] {
  return inputValue
    ? countries.filter((country) =>
        country.name.toLowerCase().startsWith(inputValue),
      )
    : countries
}

export const getCountries = asyncDebounce(getCountriesFn)
