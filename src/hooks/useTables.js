import AdminService from '/src/services/admin.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useTables = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['tables'],
		queryFn: () => AdminService.getTableList()
	})

	return useMemo(
		() => ({
			tableList: data,
			isTableListLoading: isLoading
		}),
		[isLoading]
	)
}
