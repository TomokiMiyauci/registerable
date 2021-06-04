import { pipe } from 'fonction'

const changeSearchQuery = pipe(
  (url: string, ...query: ConstructorParameters<typeof URLSearchParams>) => {
    const _url = new URL(url)
    const urlSearchParams = new URLSearchParams(...query)

    _url.search = urlSearchParams.toString()
    return _url.toString()
  },
  (url) => {
    history.replaceState(undefined, '', url)
  }
)

const focus = (el: HTMLElement): void => el.focus()

const safeFocus = (el: HTMLElement | undefined): void => {
  if (el) {
    focus(el)
  }
}

const getRegistryBaseURL = (registry: string): string => {
  switch (registry) {
    case 'deno.land': {
      return 'https://deno.land/x/'
    }
    case 'nest.land': {
      return 'https://nest.land/package/'
    }
    case 'npm': {
      return 'https://www.npmjs.com/package/'
    }
    default: {
      return ''
    }
  }
}
const getPackageURL = (registry: string, packageName: string): string =>
  new URL(packageName, getRegistryBaseURL(registry)).toString()

export { changeSearchQuery, safeFocus, getPackageURL }
