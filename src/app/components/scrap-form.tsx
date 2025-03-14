'use client'

import { useActionState } from 'react'
import { Input } from './input'
import { doScrapping } from '../actions/scrapping'

export function ScrapForm() {
  const [createState, createAction, createIsPending] = useActionState(
    doScrapping,
    {}
  )

  const errors = createState?.errors

  return (
    <form
      action={createAction}
      className="card flex flex-col justify-center gap-4 items-center"
    >
      <Input
        name="service"
        label="Service"
        type="text"
        placeholder="Service"
        disabled={createIsPending}
        error={errors?.service?.[0]}
      />
      <Input
        name="uri"
        label="URI"
        type="text"
        placeholder="URI"
        disabled={createIsPending}
        error={errors?.uri?.[0]}
      />
      <Input
        name="endsOn"
        label="Ends On"
        type="date"
        placeholder="Ends On"
        defaultValue={new Date().toISOString().slice(0, 10)}
        disabled={createIsPending}
        error={errors?.endsOn?.[0]}
      />
      <Input
        name="notifyEvery"
        label="Notify Every (minutes)"
        type="number"
        placeholder="Notify Every"
        defaultValue={'60'}
        disabled={createIsPending}
        error={errors?.notifyEvery?.[0]}
      />
      <Input
        name="xpath"
        label="XPath"
        type="text"
        placeholder="XPath"
        disabled={createIsPending}
        error={errors?.xpath?.[0]}
      />

      <button
        type="submit"
        className="btn-primary cursor-pointer"
        disabled={createIsPending}
      >
        {createIsPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  )
}
