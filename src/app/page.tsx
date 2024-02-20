import Countries from '@/components/Countries/Countries'

export default function Home({
  searchParams,
}: {
  searchParams: {
    region: string
    search: string
  }
}) {
  return (
    <main>
      <Countries searchParams={searchParams} />
    </main>
  )
}
