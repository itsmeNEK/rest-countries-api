import Countries from '@/components/Countries/Countries'
import { searchParamsTypes } from '@/types/searchParamsTypes'

export default function Home({ searchParams }: searchParamsTypes) {
  return (
    <main>
      <Countries searchParams={searchParams} />
    </main>
  )
}
