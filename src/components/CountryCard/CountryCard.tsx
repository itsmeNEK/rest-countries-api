import Image from 'next/image'
import Link from 'next/link'
import Style from './CountryCard.module.scss'
import { CountryTypes } from '@/types/countryTypes'

type CountryCardProps = {
  country: CountryTypes
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <div className={Style['card']}>
      <Link href={`/country/${country.alpha3Code}`}>
        <Image
          priority
          width={256}
          height={128}
          src={country.flags.png}
          alt={`${country.name} Flag`}
          className={Style['card__image']}
        />
        <div className={Style['card__body']}>
          <h1 className={Style['card__body__title']}>{country.name}</h1>
          <p className={Style['card__body__text']}>
            Population:<span>{country.population.toLocaleString()}</span>
          </p>
          <p className={Style['card__body__text']}>
            Region: <span>{country.region}</span>
          </p>
          <p className={Style['card__body__text']}>
            Capital: <span>{country.capital}</span>
          </p>
        </div>
      </Link>
    </div>
  )
}
