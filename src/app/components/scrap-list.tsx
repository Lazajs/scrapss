import { getAllScraps } from '@/app/actions/db-scraps'
import { ScrapCard } from '@/app/components/scrap-card'

export async function ScrapList() {
  const scraps = await getAllScraps()

  return (
    <section className="flex flex-col gap-4 mt-5">
      {scraps.map(scrap => (
        <ScrapCard key={scrap.id} scrap={scrap} />
      ))}
    </section>
  )
}
