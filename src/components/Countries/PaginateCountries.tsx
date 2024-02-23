'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import PrimaryButton from '../common/button/PrimaryButton'
import ArrowUpSvgIcon from '../common/svg/ArrowUpSvgIcon'
import Style from './Countries.module.scss'
import CountryCard from '@/components/Countries/SubComponent/CountryCard/CountryCard'
import { CountryTypes } from '@/types/countryTypes'

type PaginateCountriesProps = {
  data: CountryTypes[]
}

export default function PaginateCountries({ data }: PaginateCountriesProps) {
  const start = useRef<number>(0)
  const limit = useRef<number>(12)
  const sliceData = (data: CountryTypes[]) => {
    return data.slice(
      start.current,
      limit.current <= data.length ? limit.current : data.length
    )
  }
  const [paginatedData, setPaginatedData] = useState<CountryTypes[]>(
    sliceData(data)
  )
  const [showBackToTopButton, setShowBackToTopButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const renderMoreData = useCallback(async () => {
    if (paginatedData.length >= data.length) {
      return
    }
    setPaginatedData((prevVal) => [...prevVal, ...sliceData(data)])
  }, [data, paginatedData.length])
  const handleScroll = useCallback(() => {
    const docHeight = window.innerHeight + document.documentElement.scrollTop
    const docOffHeight = document.documentElement.offsetHeight
    const isTop = window.scrollY > 300
    if (docHeight === docOffHeight) {
      start.current = limit.current
      limit.current += 12
      renderMoreData()
    }
    setShowBackToTopButton(isTop ? true : false)
  }, [renderMoreData])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  useEffect(() => {
    start.current = 0
    limit.current = 12
    setPaginatedData(sliceData(data))
  }, [data])

  return (
    <>
      {paginatedData.map((country: CountryTypes, index: number) => (
        <CountryCard key={index} country={country} />
      ))}{' '}
      {showBackToTopButton && (
        <PrimaryButton
          className={Style['scroll-to-top-button']}
          onClick={scrollToTop}
          title='Scroll to top'
          aria-label='Scroll to top'
        >
          <ArrowUpSvgIcon />
        </PrimaryButton>
      )}
    </>
  )
}
