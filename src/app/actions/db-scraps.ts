'use server'
import { Prisma, Scrap } from '@prisma/client'
import client from '@/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  uri: z
    .string()
    .url({ message: 'Please enter a valid URL' })
    .min(1, { message: 'URI is required' }),
  endsOn: z.string().min(1, { message: 'End date is required' }),
  notifyEvery: z
    .number({ message: 'Notify every is required' })
    .min(1, { message: 'Notification interval must be at least 1 hour' }),
  service: z.string().min(1, { message: 'Service name is required' }),
  xpath: z.string().min(1, { message: 'XPath query is required' })
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
    endsOn: formData.get('endsOn') as string,
    notifyEvery: parseInt(formData.get('notifyEvery') as string),
    service: formData.get('service') as string,
    xpath: formData.get('xpath') as string
  })

  if (error) {
    return {
      ...prevState,
      errors: error.flatten().fieldErrors
    }
  }

  const parsedData = {
    ...data,
    endsOn: new Date(data.endsOn).toISOString()
  }

  // do scrapping
  // const value = await doScraping(data.uri, data.xpath)
  try {
    await client.scrap.create({ data: { ...parsedData, value: 'test' } })
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
