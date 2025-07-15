export interface City {
  post_code: number
  sub_municipality: {
    french: string | null
    dutch: string | null
    german: string | null
  }
  municipality: {
    french: string | null
    dutch: string | null
    german: string | null
  }
  region: {
    french: string | null
    dutch: string | null
    german: string | null
  }
  province: {
    french: string | null
    dutch: string | null
    german: string | null
  }
}

export interface CitySearchResult {
  post_code: number
  city_name: string
  region: string
  province: string
} 