import AdminService from '/src/services/admin.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

export const useFormAdd = ({ table, successModal }) => {
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
		queryKey: ['addElement'],
		mutationFn: params => AdminService.addElement(table, params),
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
		mutate(data)
	}

	return useMemo(
		() => ({
			register,
			handleSubmit,
			errors,
			control,
			isLoading,
			onSubmit
		}),
		[isLoading]
	)
}
