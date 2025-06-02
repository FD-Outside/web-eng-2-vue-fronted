
interface BasicStock {
    name: string
    symbol: string
}

interface SymbolResponse {
    assets: BasicStock[]
}

interface Bar {
    t: string
    o: number
    h: number
    l: number
    c: number
    n: number
    v: number
    vw: number
}

interface StockResponse {
    symbol: string
    bars: Bar[]
}

export type 
{
    BasicStock,
    SymbolResponse,
    Bar,
    StockResponse
}