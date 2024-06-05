import Auth from '/src/components/screens/auth/Auth'
import Main from '/src/components/screens/main/Main.jsx'
import Table from '/src/components/screens/table/Table.jsx'

export const routes = [
	{
		path: '/',
		component: Main,
		isAuth: true
	},
	{
		path: '/',
		component: Auth,
		isAuth: false
	},
	{
		path: '/table/:tableName/',
		component: Table,
		isAuth: true
	}
]
