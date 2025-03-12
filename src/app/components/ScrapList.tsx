import { getAllScraps } from '../actions/db-scraps'

export async function ScrapList() {
  const scraps = await getAllScraps()
  return (
    <div className="flex flex-col gap-4">
      {scraps.map(scrap => (
        <div key={scrap.id} className="card">
          <h2>{scrap.uri}</h2>
          <p>{scrap.service}</p>
          <p>{scrap.xpath}</p>
          <p>{scrap.endsOn.toLocaleString()}</p>
          <p>{scrap.notifyEvery}</p>
        </div>
      ))}
    </div>
  )
}
