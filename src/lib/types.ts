export type PropertyType = "apartment" | "house" | "studio" | "commercial" | "land"

export type Neighborhood = {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
}

export type Property = {
  id: string
  title: string
  description: string | null
  price: number
  area: number
  neighborhood_id: string | null
  property_type: PropertyType
  rooms: number
  bedrooms: number | null
  bathrooms: number | null
  address: string | null
  image_url: string | null
  created_at: string
}

export type MarketplaceData = {
  properties: Property[]
  neighborhoods: Neighborhood[]
}
