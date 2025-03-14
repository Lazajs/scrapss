'use server'
import playwright from 'playwright'
import { Scrap } from '@prisma/client'

export async function doScraping(scrap: Scrap) {
  const browser = await playwright.chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  })
  const page = await context.newPage()
  await page.goto(scrap.uri)
  const content = await page.content()
  await browser.close()
  return content
}
