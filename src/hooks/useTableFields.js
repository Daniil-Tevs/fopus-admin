import AdminService from '/src/services/admin.service'
import { useQuery } from '@tanstack/react-query'

export const useTableFields = ({ table }) => {
	const { data, isLoading } = useQuery({
		queryKey: ['fieldsTable'],
		queryFn: () => AdminService.getTableField(table)
	})

	return {
		fields: data,
		isFieldsLoading: isLoading
	}
}
