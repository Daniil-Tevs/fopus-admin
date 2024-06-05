import { $axios } from '/src/api'
import { TOKEN } from '/src/app.constants'
import Cookies from 'js-cookie'

class AuthService {
	async login(params) {
		try {
			const { data } = await $axios.post(`/auth/login`, params)

			if (data.user.ROLE_ID !== 1) throw new Error('Доступ запрещён')

			if (data.token) Cookies.set(TOKEN, data.token)

			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}
}

export default new AuthService()
