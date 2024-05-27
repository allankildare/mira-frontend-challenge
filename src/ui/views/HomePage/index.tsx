import { NavigatorAndProviderView, OrderDetails } from '~/ui/components'

export function HomePage() {
  return (
    <>
      <section>
        <OrderDetails />
      </section>

      <section>
        <NavigatorAndProviderView />
      </section>
    </>
  )
}
