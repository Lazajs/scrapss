import React from 'react'
import prisma from '@/prisma'
import { ScrapForm } from './components/ScrapForm'
import { getAllScraps } from './actions/db-scraps'
import { ScrapList } from './components/ScrapList'

export default async function Home() {
  const scraps = await getAllScraps()
  console.log(scraps)
  return (
    <>
      <ScrapForm />
      <ScrapList />
    </>
  )
}
