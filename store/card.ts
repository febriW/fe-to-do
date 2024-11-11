import { defineStore } from "pinia";

interface DataResponse {
    activities_no?: string
    title: string
    content: string
    author_id?: number | undefined
    marked_status?: string
    marked?: string
    created_at?: string
    updated_at?: string
}

interface Payload {
    page: number,
    size: number
}

export const useCardStore = defineStore('card', {
    state: () => ({
        data: [] as DataResponse[],
        isLoading: false,
        msgSuccess: "",
        msgError: ""
    }),
    
    actions: {
        async getAllCard({page, size}: Payload) {
            const response = await fetch(`http://127.0.0.1:8080/card?author_id=${useCookie('authorID').value}&page=${page}&size=${size}`, {
                method: "get",
                headers: {
                    Authorization: `Bearer `+ useCookie('token').value
                }
            })
            this.isLoading = true
            const data = await response.json()
            console.log("all data card fetch: ", data)
            this.data = data.Data
            this.isLoading = false
        },
        async createCard(data: DataResponse) {
            const response = await fetch("http://127.0.0.1:8080/card",{
                method: "post",
                headers: {
                    Authorization: `Bearer `+ useCookie('token').value
                },
                body: JSON.stringify(data)
            })
            this.isLoading = true
            this.msgSuccess = "Task successfully created"
        },
        async updateCard(data: DataResponse) {
            const response = await fetch("http://127.0.0.1:8080/card", {
                method: "put",
                headers: {
                    Authorization: `Bearer `+ useCookie('token').value
                },
                body: JSON.stringify(data)
            })

            this.isLoading = true
            if(response.status !== 204) {
                const responseData = await response.json()
                this.msgError = responseData.error
            }else{
                this.msgSuccess = "Card sucessfully updated"
            }
            this.isLoading = false
        },
        async deleteCard(id: string) {
            const response = await fetch(`http://127.0.0.1:8080/card/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer `+ useCookie('token').value
                },
            })
            this.isLoading = true
            if(response.status !== 200) {
                const responseData = await response.json()
                this.msgError = responseData.error
            }
            this.isLoading = false
        }
    }
})