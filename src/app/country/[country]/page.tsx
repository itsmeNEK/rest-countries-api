import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import Style from './page.module.scss'
import BackButton from '@/components/BackButton/BackButton'
import { formatNullableValue } from '@/helpers/formatNullableValue'
import renderObjectValues from '@/helpers/renderObjectValues'
import fetchCountries from '@/utils/FetchCountries'
import fetchCountryNames from '@/utils/fetchCountryName'
const API_URL_FIELDS =
  '?fields=name,flags,population,region,subregion,capital,languages,currencies,tld,altSpellings,borders,cca3'

export default async function CountryDetails({
  params,
}: {
  params: {
    country: string
  }
}) {
  const data =
    (await fetchCountries('alpha', API_URL_FIELDS, params.country)) ?? []
  if (data.length === 0) {
    return notFound()
  }
  const {
    flags,
    name,
    altSpellings,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
    borders,
  } = data[0]

  const bordersNames = await fetchCountryNames(borders)
  return (
    <section className='wrapper'>
      <div className={Style['top-navigation']}>
        <BackButton />
      </div>
      <div className={Style['country-container']}>
        <div className={Style['country-container__country-flag']}>
          <Image
            priority
            width={600}
            height={400}
            src={flags.svg}
            alt={`${flags.alt ? flags.alt : 'A Flag Image of ' + name.common}`}
            className={Style['country-container__country-flag__image']}
          />
        </div>
        <div className={Style['country-container__details']}>
          <h1 className={Style['country-container__details__title']}>
            {name.common}
          </h1>
          <div className={Style['country-container__details__content']}>
            <div className={Style['divider']}>
              <p>
                <span>Native Name:</span> {formatNullableValue(altSpellings[1])}
              </p>

              <p>
                <span>Population:</span>{' '}
                {formatNullableValue(population.toLocaleString())}
              </p>

              <p>
                <span>Region:</span> {formatNullableValue(region)}
              </p>

              <p>
                <span>Suspan Region:</span> {formatNullableValue(subregion)}
              </p>

              <p>
                <span>Capital:</span> {formatNullableValue(capital[0])}
              </p>
            </div>
            <div className={Style['divider']}>
              <p>
                <span>Top Level Domain:</span> {formatNullableValue(tld[0])}
              </p>

              <p>
                <span>Currencies:</span>
                {renderObjectValues({ data: currencies, fieldName: 'name' })}
              </p>

              <p>
                <span>Languages:</span>
                {renderObjectValues({ data: languages })}
              </p>
            </div>
          </div>
          <div className={Style['country-container__details__borders']}>
            <h2>Border Countries: </h2>
            <div className={Style['links']}>
              {bordersNames.length > 0 ? (
                bordersNames.map(
                  (border: { name: string; code: string }, index: number) => {
                    const { name, code } = border
                    return (
                      <Link
                        href={`/country/${code}`}
                        key={index}
                        aria-label={`Link to ${name}`}
                      >
                        {name}
                      </Link>
                    )
                  }
                )
              ) : (
                <p>No Border Countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
