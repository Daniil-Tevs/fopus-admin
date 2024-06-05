import AdminService from '/src/services/admin.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useFormDelete = ({ element, table, successModal }) => {
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
		queryKey: ['deleteElement'],
		mutationFn: () => AdminService.deleteElement(element.ID, table),
		onSuccess: () => {
			queryClient.invalidateQueries(['dataTable'])
			reset()
			successModal()
		},
		onError: e => {
			console.log(e)
		}
	})

	const onSubmit = () => {
		mutate()
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
