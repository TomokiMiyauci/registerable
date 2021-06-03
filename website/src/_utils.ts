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
export { changeSearchQuery, safeFocus }
