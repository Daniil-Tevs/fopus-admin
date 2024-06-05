import { $axios } from '/src/api'

class AdminService {
	async getTableList() {
		try {
			const { data } = await $axios.get(`/admin/table/all`)
			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}
	async getTableField(table) {
		try {
			const { data } = await $axios.get(`/admin/table/f/${table}`)
			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}

	async getTableData(table) {
		try {
			const { data } = await $axios.get(`/admin/table/d/${table}`)
			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}

	async addElement(table, params) {
		try {
			const { data } = await $axios.post(`/admin/table/${table}/add`, params)
			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}

	async editElement(id, table, params) {
		try {
			const { data } = await $axios.put(`/admin/table/${table}/${id}`, params)
			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}

	async deleteElement(id, table) {
		try {
			const { data } = await $axios.delete(`/admin/table/${table}/${id}`)
			return data
		} catch (error) {
			if (error.response) throw new Error(error.response.data.message)
			else throw new Error(error.message)
		}
	}
}

export default new AdminService()
