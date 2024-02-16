export type CountryTypes = {
  name: {
    common: string
    nativeName: {
      [languageCode: string]: string
    }
    official: string
  }
  flags: {
    alt: string
    png: string
    svg: string
  }
  population: number
  cca3: string
  region: string
  subregion: string
  capital: string[]
  languages: { [languageCode: string]: string }
  currencies: { [currencyCode: string]: { name: string; symbol: string } }
  tld: string[]
  altSpellings: string[]
  borders: string[]
}
