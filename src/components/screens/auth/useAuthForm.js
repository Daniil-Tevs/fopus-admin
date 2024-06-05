import AuthService from '/src/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../../hooks/useAuth'

export const useAuthForm = ({ handlerErrorForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm({
		mode: 'onChange'
	})

	const { setIsAuth } = useAuth()

	const { mutate, isLoading } = useMutation({
		queryKey: ['auth'],
		mutationFn: params => AuthService.login(params),
		onSuccess: () => {
			setIsAuth(true)
			document.location = '/'
			reset()
		},
		onError: e => {
			handlerErrorForm(e.message)
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
			isLoading,
			onSubmit
		}),
		[errors, isLoading]
	)
}
