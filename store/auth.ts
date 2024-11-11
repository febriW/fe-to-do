import { defineStore } from "pinia";

interface UserPayload {
    name?: string
    email: string
    password: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        msgError: ""
    }),
    actions: {
        async login({email, password}: UserPayload) {
            const response = await fetch("http://127.0.0.1:8080/auth/login", {
                method: 'post',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            this.loading = true
            const data = await response.json()
            console.log("data from fetch: ", data)

            if(!data.error){
                const token = useCookie('token')
                const authorID = useCookie('authorID')
                token.value = data.token
                authorID.value = data.author_id
                this.authenticated = true
            } else { this.msgError = data.error }
        },
        async register({name,email,password} : UserPayload){
            const response = await fetch("http://127.0.0.1:8080/user/register", {
                method: 'post',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            this.loading = true
            console.log(response.body)
            if(response.status === 200) { navigateTo('/') } else {
                const data = await response.json()
                this.msgError = data.error
            }
        },
        async logout(){
            const token = useCookie('token')
            this.authenticated = false
            token.value = null
            await navigateTo('/')
            window.location.reload()
        }
    }
})