import cn from 'clsx'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button.jsx'
import Field from '/src/components/ui/field/Field.jsx'

import styles from './FormAdd.module.scss'
import { useFormAdd } from './useFormAdd.js'

const FormAdd = ({ table, fields, setModalContent }) => {
	const successContentModal = (
		<div className={cn(styles.form, styles.success)}>
			<p className={styles.titleSuccess}>Элемент успешно добавлен!</p>
		</div>
	)
	const { isLoading, handleSubmit, onSubmit, register } = useFormAdd({
		successModal: () => setModalContent(successContentModal),
		table
	})

	const excField = ['ID', 'IS_ACTIVE']

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<div className={styles.form}>
			<p className={styles.title}>Добавление элемента {table}</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				{Object.keys(fields).map(field => {
					if (excField.includes(field)) return ''
					return (
						<div key={field}>
							<p>{fields[field].name}</p>
							<Field
								key={field}
								name={fields[field].name}
								register={register}
								type={
									fields[field].typeName === 'Int'
										? 'number'
										: fields[field].typeName === 'Boolean'
											? 'checkbox'
											: 'text'
								}
								placeholder={fields[field].name}
							/>
						</div>
					)
				})}

				<Button size='autoWight'>Добавить</Button>
			</form>
		</div>
	)
}

export default FormAdd
