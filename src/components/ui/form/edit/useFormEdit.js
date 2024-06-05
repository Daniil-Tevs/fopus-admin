import AdminService from '/src/services/admin.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useFormEdit = ({ element, table, successModal }) => {
	const queryClient = useQueryClient()

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { mutate, isLoading } = useMutation({
		queryKey: ['editElement'],
		mutationFn: params => AdminService.editElement(element.ID, table, params),
		onSuccess: () => {
			queryClient.invalidateQueries(['dataTable'])
			reset()
			successModal()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = data => {
		Object.keys(element).forEach(key => {
			if (!data[key]) data[key] = element[key]
		})
		mutate(data)
	}

	return {
		register,
		handleSubmit,
		errors,
		control,
		isLoading,
		onSubmit,
		reset
	}
}
