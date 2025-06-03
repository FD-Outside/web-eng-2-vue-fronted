
interface BasicStock {
    name: string
    symbol: string
}

interface Stock {
  symbol: string
  name: string
  price: number
  dailyChange: number
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

interface BackendFavorite {
  id: number
  symbol: string
  name: string
}

interface UserMeResponse {
    username: string
    favorites: BackendFavorite[]
}

interface StockResponse {
    symbol: string
    bars: Bar[]
}

export type 
{
    BasicStock,
    Stock,
    BackendFavorite,
    UserMeResponse,
    SymbolResponse,
    Bar,
    StockResponse
}