export default defineNuxtRouteMiddleware((to, from) => {
	if (process.server) {
		const loginData = useLoginData()
		if (!loginData) return navigateTo("/")
	}
})
