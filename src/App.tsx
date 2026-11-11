import { useMemo, useState } from "react"
import { ArrowDown, ArrowUpRight, House, ShieldCheck } from "lucide-react"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { NeighborhoodsSection } from "./components/NeighborhoodsSection"
import { PropertyCard } from "./components/PropertyCard"
import { PropertyDetailsDialog } from "./components/PropertyDetailsDialog"
import { SearchFilters, type PropertyFilters } from "./components/SearchFilters"
import { useMarketplaceData } from "./hooks/use-marketplace-data"
import { isSupabaseConfigured } from "./lib/supabase"
import type { Property } from "./lib/types"

const initialFilters: PropertyFilters = {
  search: "",
  neighborhoodId: "all",
  propertyType: "all",
  rooms: "all",
  minPrice: "",
  maxPrice: "",
}

function PropertyLoadingState() {
  return (
    <div className="property-grid" aria-label="Зареждане на обявите" aria-busy="true">
      {[0, 1, 2].map((item) => (
        <div className="property-skeleton" key={item}>
          <div className="skeleton-image" />
          <div className="skeleton-copy"><span /><span /><span /></div>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const { data, error, isLoading } = useMarketplaceData()
  const properties = data?.properties ?? []
  const neighborhoods = data?.neighborhoods ?? []

  const neighborhoodById = useMemo(
    () => new Map(neighborhoods.map((neighborhood) => [neighborhood.id, neighborhood])),
    [neighborhoods],
  )

  const propertyCounts = useMemo(() => {
    return properties.reduce<Record<string, number>>((counts, property) => {
      if (property.neighborhood_id) counts[property.neighborhood_id] = (counts[property.neighborhood_id] ?? 0) + 1
      return counts
    }, {})
  }, [properties])

  const filteredProperties = useMemo(() => {
    const searchTerm = filters.search.trim().toLocaleLowerCase("bg-BG")
    const minPrice = filters.minPrice === "" ? null : Number(filters.minPrice)
    const maxPrice = filters.maxPrice === "" ? null : Number(filters.maxPrice)

    return properties.filter((property) => {
      const neighborhoodName = property.neighborhood_id
        ? neighborhoodById.get(property.neighborhood_id)?.name ?? ""
        : ""
      const searchableText = `${property.title} ${property.description ?? ""} ${property.address ?? ""} ${neighborhoodName}`.toLocaleLowerCase("bg-BG")
      const matchesSearch = !searchTerm || searchableText.includes(searchTerm)
      const matchesNeighborhood = filters.neighborhoodId === "all" || property.neighborhood_id === filters.neighborhoodId
      const matchesType = filters.propertyType === "all" || property.property_type === filters.propertyType
      const matchesRooms = filters.rooms === "all"
        || (filters.rooms === "4" ? property.rooms >= 4 : property.rooms === Number(filters.rooms))
      const matchesMinPrice = minPrice === null || property.price >= minPrice
      const matchesMaxPrice = maxPrice === null || property.price <= maxPrice

      return matchesSearch && matchesNeighborhood && matchesType && matchesRooms && matchesMinPrice && matchesMaxPrice
    })
  }, [filters, neighborhoodById, properties])

  const jumpToListings = () => document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" })

  return (
    <>
      <Header />
      <main id="top">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content section-wrap">
            <p className="hero-kicker"><span /> ДОМЪТ Е ПО-БЛИЗО, ОТКОЛКОТО МИСЛИШ</p>
            <h1 id="hero-heading">Твоето място<br />в <em>Русе.</em></h1>
            <p className="hero-description">Открий имот, който ти пасва. В своя град, в своя ритъм, по своя начин.</p>
            <div className="hero-actions">
              <a className="hero-primary" href="#properties">Разгледай обявите <ArrowUpRight aria-hidden="true" size={17} /></a>
              <a className="hero-secondary" href="#neighborhoods">Запознай се с кварталите <ArrowDown aria-hidden="true" size={16} /></a>
            </div>
            <div className="hero-note"><ShieldCheck aria-hidden="true" size={16} /> Местни обяви. По-лесен избор.</div>
          </div>
          <div className="hero-location"><span>43°50&apos; с.ш. · 25°57&apos; и.д.</span><span>Русе, България</span></div>
        </section>

        <section className="search-section section-wrap" aria-label="Търсене на имоти">
          <div className="search-intro">
            <div>
              <p className="eyebrow">ТЪРСИМ ЗАЕДНО</p>
              <h2>Намери си <em>дом.</em></h2>
            </div>
            <p>Започни с това, което е важно за теб.<br />Останалото ще подреди филтърът.</p>
          </div>
          <SearchFilters filters={filters} neighborhoods={neighborhoods} onChange={setFilters} />
        </section>

        <section className="listing-section section-wrap" id="properties" aria-labelledby="properties-heading">
          <div className="section-heading listing-heading">
            <div>
              <p className="eyebrow">ПОДБРАНИ ЗА ТЕБ</p>
              <h2 id="properties-heading">Имоти в <em>Русе</em></h2>
            </div>
            <p className="listing-count"><House aria-hidden="true" size={17} />
              {isLoading ? "Зареждаме обявите…" : `${filteredProperties.length} ${filteredProperties.length === 1 ? "обява" : "обяви"}`}
            </p>
          </div>

          {isLoading ? (
            <PropertyLoadingState />
          ) : error || !isSupabaseConfigured ? (
            <div className="data-state data-error" role="alert">
              <span className="data-state-icon"><House aria-hidden="true" size={22} /></span>
              <h3>Не успяхме да заредим обявите</h3>
              <p>{error?.message ?? "Проверете VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY."}</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="property-grid">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  neighborhood={property.neighborhood_id ? neighborhoodById.get(property.neighborhood_id) : undefined}
                  onDetails={setSelectedProperty}
                />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="data-state">
              <span className="data-state-icon"><House aria-hidden="true" size={22} /></span>
              <h3>Няма имоти с тези критерии</h3>
              <p>Промени филтрите или започни ново търсене.</p>
              <button className="text-link" type="button" onClick={() => setFilters(initialFilters)}>Изчисти филтрите <ArrowUpRight aria-hidden="true" size={15} /></button>
            </div>
          ) : (
            <div className="data-state">
              <span className="data-state-icon"><House aria-hidden="true" size={22} /></span>
              <h3>Новият ти дом започва оттук</h3>
              <p>В момента подготвяме първите обяви за Русе. Провери отново скоро или ни пиши, за да публикуваш своя имот.</p>
              <a className="text-link" href="mailto:info@imoteasy.bg?subject=Публикуване%20на%20обява">Публикувай обява <ArrowUpRight aria-hidden="true" size={15} /></a>
            </div>
          )}
        </section>

        <NeighborhoodsSection
          neighborhoods={neighborhoods}
          propertyCounts={propertyCounts}
          onSelect={(neighborhoodId) => {
            setFilters({ ...initialFilters, neighborhoodId })
            jumpToListings()
          }}
        />

        <section className="about-section section-wrap" id="about" aria-labelledby="about-heading">
          <div className="about-stamp" aria-hidden="true"><span>РУСЕ</span><span>·</span><span>ДОМ</span></div>
          <div className="about-copy">
            <p className="eyebrow">ЗА IMOTEASY</p>
            <h2 id="about-heading">Градът е познат.<br />Нека <em>домът</em> бъде нов.</h2>
            <p>IMOTEASY е тук, за да направи търсенето на имот в Русе по-ясно, по-близко и по-човешко. Защото намирането на дом трябва да е начало, не сложно търсене.</p>
            <a className="about-link" href="#contact">Научи повече <ArrowUpRight aria-hidden="true" size={16} /></a>
          </div>
          <div className="about-image-wrap"><img src="/images/property-modern.png" alt="Светъл и уютен интериор на модерен дом" loading="lazy" /></div>
        </section>

        <section className="closing-cta" aria-labelledby="closing-heading">
          <div className="section-wrap closing-inner">
            <div><p className="eyebrow">СЛЕДВАЩАТА СТЪПКА Е ТВОЯ</p><h2 id="closing-heading">Имаш имот в Русе?</h2><p>Нека повече хора открият своето място.</p></div>
            <a className="closing-button" href="mailto:info@imoteasy.bg?subject=Публикуване%20на%20обява">Публикувай обява <ArrowUpRight aria-hidden="true" size={17} /></a>
          </div>
        </section>
      </main>
      <Footer />
      {selectedProperty && (
        <PropertyDetailsDialog
          property={selectedProperty}
          neighborhood={selectedProperty.neighborhood_id ? neighborhoodById.get(selectedProperty.neighborhood_id) : undefined}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  )
}
