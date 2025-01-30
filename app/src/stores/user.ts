import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'boot/axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: localStorage.getItem('jwt') || null,
    user: null,
  }),
  getters: { isAuthenticated: (state) => !!state.token },
  actions: {
    async login(credentials: { email: string; password: string }) {
      const response = await api.post(`auth/login`, credentials)

      this.token = response.data.token
      this.user = response.data.user

      if (!this.token) return

      localStorage.setItem('jwt', this.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },

    async logout() {
      this.token = null
      this.user = null

      localStorage.removeItem('jwt')
      delete api.defaults.headers.common['Authorization']

      await api.post(`auth/logout`)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
