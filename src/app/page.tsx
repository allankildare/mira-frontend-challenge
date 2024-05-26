import { Menu } from '~/ui/components'
import { HomePage } from '~/ui/views'

export default function Home() {
  return (
    <>
      <Menu />
      <main>
        <HomePage />
      </main>
    </>
  )
}
