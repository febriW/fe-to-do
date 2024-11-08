import { defineStore } from "pinia";

interface DataResponse {
    activities_no: string
    title: string
    content: string
    author_id: number
    marked_status: string
    marked: string
    created_at: string
    updated_at: string
}

interface Payload {
    page: number,
    size: number
}

export const useCardStore = defineStore('card', {
    state: () => ({
        data: [] as DataResponse[],
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

            const data = await response.json()
            console.log("all data card fetch: ", data)
            this.data = data.Data
        }
    }
})