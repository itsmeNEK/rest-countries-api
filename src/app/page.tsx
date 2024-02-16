import Countries from '@/components/Countries/Countries'

export default function Home({
  searchParams,
}: {
  [key: string]: string | string[] | undefined
}) {
  console.log(searchParams)
  return (
    <main>
      <Countries />
    </main>
  )
}
