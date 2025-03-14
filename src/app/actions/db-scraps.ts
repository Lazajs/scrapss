'use server'
import { Scrap } from '@prisma/client'
import client from '@/prisma'
import { revalidatePath } from 'next/cache'

export async function createScrap(scrap: Scrap) {
  try {
    await client.scrap.create({ data: scrap })
    revalidatePath('/')
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to create scrap: ${e.message}`)
    } else throw new Error('Failed to create scrap')
  }
}

export async function getAllScraps(): Promise<Scrap[]> {
  try {
    const data: Scrap[] = await client.scrap.findMany()
    return data
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to fetch scraps: ${e.message}`)
    } else throw new Error('Failed to fetch scraps')
  }
}

export async function deleteScrap(id: number): Promise<null> {
  try {
    await client.scrap.delete({ where: { id } })
    revalidatePath('/')
    return null
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to delete scrap: ${e.message}`)
    } else throw new Error('Failed to delete scrap')
  }
}
