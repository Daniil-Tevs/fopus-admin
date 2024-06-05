import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

import Loader from '/src/components/ui/Loader'
import Button from '/src/components/ui/button/Button'
import FormAdd from '/src/components/ui/form/add/FormAdd'
import FormDelete from '/src/components/ui/form/delete/FormDelete'
import FormEdit from '/src/components/ui/form/edit/FormEdit'
import Modal from '/src/components/ui/modal/Modal'

import { useTableData } from '/src/hooks/useTableData'
import { useTableFields } from '/src/hooks/useTableFields'

import Layout from '/src/components/layout/Layout'

import styles from './Table.module.scss'

const Table = () => {
	const [active, setActivity] = useState(false)
	const [modalContent, setModalContent] = useState()

	const table = useLocation().pathname.split('/')[2]

	const { fields, isFieldsLoading } = useTableFields({ table })

	const { data, isLoading } = useTableData({ table })

	const excField = ['IS_ACTIVE', 'PASSWORD']

	if (isLoading || isFieldsLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<Layout>
			<Modal active={active} setActivity={setActivity}>
				{modalContent}
			</Modal>
			<main className={styles.main}>
				<div className={styles.head}>
					<Link to='/'>
						<IoMdArrowRoundBack />
					</Link>
					<p className={styles.title}>
						Таблица <span>{table}</span>
					</p>
				</div>

				<div className={styles.addPanel}>
					<Button
						type='white'
						clickHandler={() => {
							setActivity(true)
							setModalContent(
								<FormAdd
									table={table}
									fields={fields}
									setModalContent={setModalContent}
								/>
							)
						}}
					>
						Добавить
					</Button>
				</div>
				{data && data.length > 0 ? (
					<table className={styles.table}>
						<thead>
							<tr>
								{Object.keys(fields).map(field => {
									if (excField.includes(field)) return ''
									return <th key={field}>{field}</th>
								})}
								<th>*</th>
								<th>*</th>
							</tr>
						</thead>
						<tbody>
							{data.map(element => (
								<tr key={element.ID}>
									{Object.keys(element).map(field => {
										if (field !== 'PASSWORD' && field !== 'IS_ACTIVE')
											return <th key={field}>{element[field]}</th>
									})}
									<th
										className={styles.edit}
										onClick={() => {
											setActivity(true)
											setModalContent(
												<FormEdit
													element={element}
													table={table}
													fields={fields}
													setModalContent={setModalContent}
												/>
											)
										}}
									>
										<FaEdit />
									</th>
									<th
										className={styles.edit}
										onClick={() => {
											setActivity(true)
											setModalContent(
												<FormDelete
													element={element}
													table={table}
													fields={fields}
													setModalContent={setModalContent}
												/>
											)
										}}
									>
										<MdDelete />
									</th>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<>Пока данная таблица пуста</>
				)}
			</main>
		</Layout>
	)
}

export default Table
