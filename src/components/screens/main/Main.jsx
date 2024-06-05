import { Link } from 'react-router-dom'

import Loader from '/src/components/ui/Loader'

import { useTables } from '/src/hooks/useTables'

import Layout from '/src/components/layout/Layout'

import styles from './Main.module.scss'

const Main = () => {
	const { tableList, isTableListLoading } = useTables()

	if (isTableListLoading) {
		return (
			<div className={styles.preloadBlock}>
				<Loader />
			</div>
		)
	}

	return (
		<Layout>
			<main className={styles.main}>
				<div className={styles.wrapperInner}>
					<p className={styles.headline}>Административная панель</p>

					<div className={styles.panel}>
						{tableList.map(table => (
							<Link to={`/table/${table}`} className={styles.table} key={table}>
								<p>Таблица</p>
								<span>{table}</span>
							</Link>
						))}
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default Main
