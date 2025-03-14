import { useMutation } from '@tanstack/react-query'
import { deleteScrap } from '@/app/actions/db-scraps'

export function useDeleteScrap() {
  return useMutation({ mutationFn: deleteScrap })
}
