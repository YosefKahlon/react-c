export type PrimeThemeName = 'lara-light-blue' | 'lara-dark-blue'

const buildThemeHref = (theme: PrimeThemeName) =>
  `https://unpkg.com/primereact/resources/themes/${theme}/theme.css`

export const applyPrimeTheme = (theme: PrimeThemeName) => {
  if (typeof document === 'undefined') return
  const id = 'prime-theme-link'
  const href = buildThemeHref(theme)
  let link = document.getElementById(id) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  if (link.href !== href) {
    link.href = href
  }
}
