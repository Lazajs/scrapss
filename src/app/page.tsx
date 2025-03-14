import React from 'react'
import { ScrapForm } from './components/scrap-form'
import { ScrapList } from './components/scrap-list'

export default async function Home() {
  return (
    <>
      <ScrapForm />
      <ScrapList />
    </>
  )
}
