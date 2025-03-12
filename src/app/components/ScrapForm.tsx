'use client'

import { useActionState } from 'react'
import { createScrap } from '@/app/actions/db-scraps'
import { Input } from './Input'

export function ScrapForm() {
  const [state, action] = useActionState(createScrap, {})

  return (
    <form
      action={action}
      className="card flex flex-col justify-center gap-4 items-center"
    >
      <Input name="service" label="Service" type="text" placeholder="Service" />
      <Input name="uri" label="URI" type="text" placeholder="URI" />
      <Input name="endsOn" label="Ends On" type="date" placeholder="Ends On" />
      <Input
        name="notifyEvery"
        label="Notify Every"
        type="number"
        placeholder="Notify Every"
      />
      <Input name="xpath" label="XPath" type="text" placeholder="XPath" />

      <button type="submit" className="btn-primary">
        Create
      </button>
    </form>
  )
}
