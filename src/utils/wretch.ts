import type { StockResponse } from "@/types/apiResponses";
import wretch from "wretch";

const baseUrl = "http://localhost:8081/api/v1"

let apiInstance = wretch(baseUrl, {
    mode: "cors"
})

const setToken = (token: string | null) => {
    if (!token) {
        apiInstance = apiInstance.auth('')
        return
    }
    apiInstance = apiInstance.auth(`Bearer ${token}`)
}

async function fetchDailyPriceAndChange(symbol: string): Promise<{ price: number; dailyChange: number } | null> {
    try {
        const res = apiInstance.url(`/stock/daily?symbol=${symbol}`).get()
        console.log(res)
        const data: StockResponse = await res.json()
        if (data.bars.length < 1) return null
        const latestBar = data.bars[data.bars.length - 1]
        const oldBar = data.bars[0]
        const dailyChange = ((latestBar.c - oldBar.c) / oldBar.c) * 100
        const price = latestBar.c
        return {price, dailyChange}
    } catch (error) {
        return null;
    }
}

export { apiInstance, setToken, fetchDailyPriceAndChange}