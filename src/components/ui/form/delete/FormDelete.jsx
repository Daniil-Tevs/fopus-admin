import cn from 'clsx'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button.jsx'
import Field from '/src/components/ui/field/Field.jsx'

import styles from './FormDelete.module.scss'
import { useFormDelete } from './useFormDelete.js'

const FormDelete = ({ element, table, fields, setModalContent }) => {
	const successContentModal = (
		<div className={cn(styles.form, styles.success)}>
			<p className={styles.titleSuccess}>Элемент успешно удалён!</p>
		</div>
	)
	const { isLoading, handleSubmit, onSubmit, register, reset } = useFormDelete({
		successModal: () => setModalContent(successContentModal),
		table,
		element: element
	})

	const excField = ['ID', 'IS_ACTIVE', 'PASSWORD']

	if (isLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<div className={styles.form}>
			<p className={styles.title}>
				Удаление элемента с ID#{element.ID} {table}
			</p>

			<form onSubmit={handleSubmit(onSubmit)}>
				{Object.keys(fields).map(field => {
					if (excField.includes(field)) return ''
					return (
						<div key={field}>
							<p>{fields[field].name}</p>
							<Field
								name={fields[field].name}
								register={register}
								type={
									fields[field].typeName === 'Int'
										? 'number'
										: fields[field].typeName === 'Boolean'
											? 'checkbox'
											: 'text'
								}
								value={element[field]}
							/>
						</div>
					)
				})}

				<Button type='danger' size='autoWight'>
					Удалить
				</Button>
			</form>
		</div>
	)
}

export default FormDelete
