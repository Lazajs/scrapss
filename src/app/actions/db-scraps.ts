'use server'
import { Prisma, Scrap } from '@prisma/client'
import client from '@/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  uri: z.string(),
  endsOn: z.string(),
  notifyEvery: z.number(),
  service: z.string(),
  xpath: z.string()
})

export type CreateScrapActionError = {
  uri?: string[]
  endsOn?: string[]
  notifyEvery?: string[]
  service?: string[]
  xpath?: string[]
}

export type CreateScrapActionState = {
  uri?: string
  endsOn?: string
  notifyEvery?: number
  service?: string
  xpath?: string
  errors?: CreateScrapActionError
}

export async function createScrap(
  prevState: CreateScrapActionState,
  formData: FormData
): Promise<CreateScrapActionState> {
  const { data, error } = schema.safeParse({
    uri: formData.get('uri') as string,
    endsOn: new Date(formData.get('endsOn') as string).toISOString(),
    notifyEvery: parseInt(formData.get('notifyEvery') as string),
    service: formData.get('service') as string,
    xpath: formData.get('xpath') as string
  })

  console.log(data)

  if (error) {
    return {
      ...prevState,
      errors: error.flatten().fieldErrors
    }
  }

  try {
    await client.scrap.create({ data })
    revalidatePath('/')
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to create scrap: ${e.message}`)
    } else throw new Error('Failed to create scrap')
  }

  return data
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
