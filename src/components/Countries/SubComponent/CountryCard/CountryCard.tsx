import Image from 'next/image'
import Link from 'next/link'
import Style from './CountryCard.module.scss'
import { formatNullableValue } from '@/helpers/formatNullableValue'
import { CountryTypes } from '@/types/countryTypes'

type CountryCardProps = {
  country: CountryTypes
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className={Style['card']}>
      <Link href={`/country/${country.cca3}`}>
        <Image
          priority
          width={247}
          height={150}
          src={country.flags.png}
          alt={`${country.flags.alt ? country.flags.alt : 'A Flag Image of ' + country.name.common}`}
          className={Style['card__image']}
        />
        <div className={Style['card__body']}>
          <h2 className={Style['card__body__title']}>{country.name.common}</h2>
          <p className={Style['card__body__text']}>
            Population:<span>{country.population.toLocaleString()}</span>
          </p>
          <p className={Style['card__body__text']}>
            Region: <span>{formatNullableValue(country.region)}</span>
          </p>
          <p className={Style['card__body__text']}>
            Capital: <span>{formatNullableValue(country.capital)}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}
