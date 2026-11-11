import { ArrowUpRight, BedDouble, MapPin, MoveUpRight } from "lucide-react"
import type { Neighborhood, Property, PropertyType } from "../lib/types"

const fallbackImages: Record<PropertyType, string> = {
  apartment: "/images/property-apartment.png",
  house: "/images/property-house.png",
  studio: "/images/property-modern.png",
  commercial: "/images/property-modern.png",
  land: "/images/property-house.png",
}

const propertyTypeLabels: Record<PropertyType, string> = {
  apartment: "Апартамент",
  house: "Къща",
  studio: "Студио",
  commercial: "Търговски имот",
  land: "Парцел",
}

const priceFormatter = new Intl.NumberFormat("bg-BG", { maximumFractionDigits: 0 })
const areaFormatter = new Intl.NumberFormat("bg-BG", { maximumFractionDigits: 0 })

type PropertyCardProps = {
  property: Property
  neighborhood?: Neighborhood
  onDetails: (property: Property) => void
}

export function PropertyCard({ property, neighborhood, onDetails }: PropertyCardProps) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img
          className="property-image"
          src={property.image_url || fallbackImages[property.property_type]}
          alt={`${propertyTypeLabels[property.property_type]} — ${property.title}`}
          loading="lazy"
        />
        <span className="property-type-tag">{propertyTypeLabels[property.property_type]}</span>
        <button className="property-save" type="button" aria-label={`Виж детайли за ${property.title}`} onClick={() => onDetails(property)}>
          <ArrowUpRight aria-hidden="true" size={18} />
        </button>
      </div>
      <div className="property-card-content">
        <div className="property-location"><MapPin aria-hidden="true" size={14} /> {neighborhood?.name || property.address || "Русе"}</div>
        <h3>{property.title}</h3>
        <div className="property-meta">
          <span><MoveUpRight aria-hidden="true" size={15} /> {areaFormatter.format(property.area)} м²</span>
          <span><BedDouble aria-hidden="true" size={15} /> {property.rooms} {property.rooms === 1 ? "стая" : "стаи"}</span>
        </div>
        <div className="property-card-bottom">
          <p className="property-price">{priceFormatter.format(property.price)} <span>€</span></p>
          <button className="text-link" type="button" onClick={() => onDetails(property)}>
            Виж детайли <ArrowUpRight aria-hidden="true" size={15} />
          </button>
        </div>
      </div>
    </article>
  )
}
