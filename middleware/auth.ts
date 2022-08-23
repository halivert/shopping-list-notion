export default defineNuxtRouteMiddleware(() => {
	const loginData = useLoginData()
	if (process.server) {
		if (!loginData?.value) return navigateTo("/")
	}
})
