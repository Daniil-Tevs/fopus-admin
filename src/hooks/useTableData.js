import AdminService from '/src/services/admin.service'
import { useQuery } from '@tanstack/react-query'

export const useTableData = ({ table }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['dataTable'],
		queryFn: () => AdminService.getTableData(table)
	})

	return {
		data,
		isLoading
	}
}
