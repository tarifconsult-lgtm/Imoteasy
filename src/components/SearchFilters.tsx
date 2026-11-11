import { Search, SlidersHorizontal } from "lucide-react"
import type { Neighborhood, PropertyType } from "../lib/types"

export type PropertyFilters = {
  search: string
  neighborhoodId: string
  propertyType: PropertyType | "all"
  rooms: string
  minPrice: string
  maxPrice: string
}

type SearchFiltersProps = {
  filters: PropertyFilters
  neighborhoods: Neighborhood[]
  onChange: (filters: PropertyFilters) => void
}

const propertyTypes: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "Всички типове" },
  { value: "apartment", label: "Апартамент" },
  { value: "house", label: "Къща" },
  { value: "studio", label: "Студио" },
  { value: "commercial", label: "Търговски имот" },
  { value: "land", label: "Парцел" },
]

export function SearchFilters({ filters, neighborhoods, onChange }: SearchFiltersProps) {
  const update = <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <form className="filter-panel" onSubmit={(event) => event.preventDefault()} aria-label="Търсене и филтриране на имоти">
      <div className="filter-search">
        <Search className="filter-search-icon" aria-hidden="true" size={20} />
        <label className="sr-only" htmlFor="property-search">Търсене по адрес или описание</label>
        <input
          id="property-search"
          type="search"
          placeholder="Квартал, улица или ключова дума"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
        <span className="search-city">Русе, България</span>
      </div>

      <div className="filter-fields">
        <label className="filter-control">
          <span>Квартал</span>
          <select value={filters.neighborhoodId} onChange={(event) => update("neighborhoodId", event.target.value)}>
            <option value="all">Всички квартали</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
            ))}
          </select>
        </label>

        <label className="filter-control">
          <span>Тип имот</span>
          <select value={filters.propertyType} onChange={(event) => update("propertyType", event.target.value as PropertyType | "all")}>
            {propertyTypes.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
          </select>
        </label>

        <label className="filter-control">
          <span>Стаи</span>
          <select value={filters.rooms} onChange={(event) => update("rooms", event.target.value)}>
            <option value="all">Без значение</option>
            <option value="1">1 стая</option>
            <option value="2">2 стаи</option>
            <option value="3">3 стаи</option>
            <option value="4">4+ стаи</option>
          </select>
        </label>

        <label className="filter-control">
          <span>Цена от (€)</span>
          <input
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            placeholder="Без минимум"
            value={filters.minPrice}
            onChange={(event) => update("minPrice", event.target.value)}
          />
        </label>

        <label className="filter-control">
          <span>Цена до (€)</span>
          <input
            type="number"
            min="0"
            step="1000"
            inputMode="numeric"
            placeholder="Без максимум"
            value={filters.maxPrice}
            onChange={(event) => update("maxPrice", event.target.value)}
          />
        </label>
      </div>

      <div className="filter-summary">
        <span><SlidersHorizontal aria-hidden="true" size={15} /> Настрой търсенето си</span>
        <button type="button" className="clear-filters" onClick={() => onChange({ search: "", neighborhoodId: "all", propertyType: "all", rooms: "all", minPrice: "", maxPrice: "" })}>
          Изчисти филтрите
        </button>
      </div>
    </form>
  )
}
