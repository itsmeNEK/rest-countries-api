import Style from './page.module.scss'

export default async function notFound() {
  return (
    <section className={Style['container-not-found']}>
      <h1>Country does not exist.</h1>
    </section>
  )
}
