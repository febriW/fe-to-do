export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token').value
    const publicRoutes = ['/', '/register']

    if (token && publicRoutes.includes(to.path)) {
        return navigateTo('/dashboard')
    }

    if (!token && !publicRoutes.includes(to.path)) {
        return navigateTo('/')
    }
})