import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/visit/$visitId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/visit/$visitId"!</div>
}
