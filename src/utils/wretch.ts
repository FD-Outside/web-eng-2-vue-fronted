import wretch from "wretch";

const baseUrl = "http://localhost:8081/api/v1"

const apiInstance = wretch(baseUrl, {
    mode: "cors"
})

const setToken = (token: string) => {
    apiInstance.auth(`Bearer ${token}`)
}

export { apiInstance, setToken }