import useSWR from "swr"
import { isSupabaseConfigured, supabase } from "../lib/supabase"
import type { MarketplaceData, Neighborhood, Property } from "../lib/types"

const propertyColumns = "id,title,description,price,area,neighborhood_id,property_type,rooms,bedrooms,bathrooms,address,image_url,created_at"
const neighborhoodColumns = "id,name,slug,description,image_url"

async function fetchMarketplaceData(): Promise<MarketplaceData> {
  if (!supabase) {
    throw new Error("Supabase не е конфигуриран. Проверете VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY.")
  }

  const [propertiesResult, neighborhoodsResult] = await Promise.all([
    supabase
      .from("properties")
      .select(propertyColumns)
      .eq("is_published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("neighborhoods")
      .select(neighborhoodColumns)
      .order("name", { ascending: true }),
  ])

  if (propertiesResult.error) throw propertiesResult.error
  if (neighborhoodsResult.error) throw neighborhoodsResult.error

  return {
    properties: (propertiesResult.data ?? []) as Property[],
    neighborhoods: (neighborhoodsResult.data ?? []) as Neighborhood[],
  }
}

export function useMarketplaceData() {
  return useSWR<MarketplaceData>(isSupabaseConfigured ? "imoteasy-marketplace" : null, fetchMarketplaceData, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  })
}
