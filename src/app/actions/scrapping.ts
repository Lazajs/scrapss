'use server'
import playwright from 'playwright'
import { Scrap } from '@prisma/client'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import client from '@/prisma'

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
  value?: string
  errors?: CreateScrapActionError
}

export async function getDataFromURI(uri: string, xpath: string) {
  const browser = await playwright.chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  })
  const page = await context.newPage()
  await page.goto(uri)
  const content = await page.content()
  await browser.close()
  return content
}

export async function doScrapping(
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

  try {
    const value = await getDataFromURI(parsedData.uri, parsedData.xpath)
    console.log('on action value', value)
    return {
      ...data,
      value
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to create scrap: ${e.message}`)
    } else throw new Error('Failed to create scrap')
  }
}
