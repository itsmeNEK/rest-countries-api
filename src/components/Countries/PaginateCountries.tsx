'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
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
  const renderMoreData = useCallback(async () => {
    if (paginatedData.length >= data.length) {
      return
    }
    setPaginatedData((prevVal) => [...prevVal, ...sliceData(data)])
  }, [data, paginatedData.length])
  const handleScroll = useCallback(() => {
    const docHeight = window.innerHeight + document.documentElement.scrollTop
    const docOffHeight = document.documentElement.offsetHeight
    if (docHeight === docOffHeight) {
      start.current = limit.current
      limit.current += 12
      renderMoreData()
    }
  }, [renderMoreData])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      {paginatedData.map((country: CountryTypes, index: number) => (
        <CountryCard key={index} country={country} />
      ))}
    </>
  )
}
