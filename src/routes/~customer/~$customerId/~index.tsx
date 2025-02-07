import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customer/$customerId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_customer/$customerId/"!</div>
}
