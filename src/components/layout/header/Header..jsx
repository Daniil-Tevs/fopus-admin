import logo from '/icons/logo.svg'
import { TOKEN } from '/src/app.constants'
import Cookies from 'js-cookie'
import { MdLogout } from 'react-icons/md'
import { Link } from 'react-router-dom'

import { useAuth } from '/src/hooks/useAuth'

import styles from './Header.module.scss'

const Header = () => {
	const { isAuth } = useAuth()

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<Link to='/'>
					<img src={logo} alt='' />
				</Link>

				<div className={styles.nav}>
					{isAuth ? (
						<MdLogout
							onClick={() => {
								Cookies.remove(TOKEN)
								Cookies.remove('role')
								document.location = '/'
							}}
						/>
					) : (
						''
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
