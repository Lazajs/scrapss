'use client'
import { Scrap } from '@prisma/client'
import { TrashCan } from './icons/trash-can'
import { useDeleteScrap } from '@/app/hooks/scrap'

export function ScrapCard({ scrap }: { scrap: Scrap }) {
  const { mutate: deleteScrap, isPending } = useDeleteScrap()

  return (
    <div
      key={scrap.id}
      className="card p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {scrap.service}
        </h2>
        <button
          className={`text-red-500 hover:text-red-700 ${
            isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Delete"
          onClick={() => !isPending && deleteScrap(scrap.id)}
          disabled={isPending}
        >
          <TrashCan className={isPending ? 'animate-pulse' : ''} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">URI:</span> {scrap.uri.slice(0, 30)}...
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">XPath:</span> {scrap.xpath}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Ends On:</span>{' '}
          {scrap.endsOn.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Notify Every:</span> {scrap.notifyEvery}{' '}
          hours
        </div>
      </div>
      {isPending && (
        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg">
          <span className="text-sm text-gray-600">Deleting...</span>
        </div>
      )}
    </div>
  )
}
