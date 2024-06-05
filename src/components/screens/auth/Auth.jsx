import { useState } from 'react'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import Field from '/src/components/ui/field/Field'

import Layout from '/src/components/layout/Layout'

import styles from './Auth.module.scss'
import { useAuthForm } from './useAuthForm'

const Auth = () => {
	const [textErrorForm, handlerErrorForm] = useState('')

	const { errors, handleSubmit, isLoading, onSubmit, register } = useAuthForm({
		handlerErrorForm
	})

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<Layout seoKey='auth'>
			<div className={styles.wrapperAuth}>
				<div className={styles.wrapperInner}>
					<div>
						<p className={styles.headline}>Авторизация</p>
						<h1>Войдите в личный кабинет</h1>

						<form onSubmit={handleSubmit(onSubmit)}>
							<Field
								error={errors?.email?.message}
								name='email'
								register={register}
								options={{
									required: 'Введите почту'
								}}
								type='email'
								placeholder='Email'
							/>
							<Field
								error={errors?.password?.message}
								name='password'
								register={register}
								options={{
									required: 'Введите пароль'
								}}
								type='password'
								placeholder='Пароль'
							/>
							<Button size='autoWight'>Войти</Button>

							<div className={styles.formError}>{textErrorForm}</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Auth
