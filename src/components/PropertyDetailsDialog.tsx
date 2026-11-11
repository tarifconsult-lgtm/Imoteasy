import { useEffect, useRef } from "react"
import { BedDouble, MapPin, MoveUpRight, X } from "lucide-react"
import type { Neighborhood, Property } from "../lib/types"

type PropertyDetailsDialogProps = {
  property: Property
  neighborhood?: Neighborhood
  onClose: () => void
}

const formatter = new Intl.NumberFormat("bg-BG", { maximumFractionDigits: 0 })

export function PropertyDetailsDialog({ property, neighborhood, onClose }: PropertyDetailsDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      className="property-dialog"
      ref={dialogRef}
      aria-labelledby="property-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close()
      }}
    >
      <div className="dialog-content">
        <button className="dialog-close" type="button" aria-label="Затвори детайлите" onClick={() => dialogRef.current?.close()}>
          <X aria-hidden="true" size={19} />
        </button>
        <img className="dialog-image" src={property.image_url || "/images/property-apartment.png"} alt={`Изглед на имот: ${property.title}`} />
        <div className="dialog-copy">
          <p className="eyebrow">{property.property_type === "house" ? "КЪЩА" : "ИМОТ В РУСЕ"}</p>
          <h2 id="property-dialog-title">{property.title}</h2>
          <p className="dialog-location"><MapPin aria-hidden="true" size={16} /> {neighborhood?.name || property.address || "Русе"}</p>
          <p className="dialog-price">{formatter.format(property.price)} €</p>
          <div className="dialog-facts">
            <span><MoveUpRight aria-hidden="true" size={17} /> {formatter.format(property.area)} м²</span>
            <span><BedDouble aria-hidden="true" size={17} /> {property.rooms} {property.rooms === 1 ? "стая" : "стаи"}</span>
          </div>
          {property.description && <p className="dialog-description">{property.description}</p>}
          {property.address && <p className="dialog-address">Адрес: {property.address}</p>}
        </div>
      </div>
    </dialog>
  )
}
