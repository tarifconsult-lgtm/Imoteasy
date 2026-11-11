import { ArrowUpRight, MapPin } from "lucide-react"
import type { Neighborhood } from "../lib/types"

type NeighborhoodsSectionProps = {
  neighborhoods: Neighborhood[]
  propertyCounts: Record<string, number>
  onSelect: (neighborhoodId: string) => void
}

export function NeighborhoodsSection({ neighborhoods, propertyCounts, onSelect }: NeighborhoodsSectionProps) {
  return (
    <section className="neighborhood-section section-wrap" id="neighborhoods" aria-labelledby="neighborhood-heading">
      <div className="section-heading neighborhood-heading">
        <div>
          <p className="eyebrow">МЯСТОТО Е ВАЖНО</p>
          <h2 id="neighborhood-heading">Открий своя <em>квартал</em></h2>
        </div>
        <p>Всеки квартал има свой ритъм. Намери този, който усещаш като свой.</p>
      </div>

      {neighborhoods.length > 0 ? (
        <div className="neighborhood-grid">
          {neighborhoods.map((neighborhood, index) => (
            <button
              className={`neighborhood-card neighborhood-card-${index % 3}`}
              key={neighborhood.id}
              type="button"
              onClick={() => onSelect(neighborhood.id)}
              style={neighborhood.image_url ? { backgroundImage: `linear-gradient(180deg, rgba(20, 38, 31, .05), rgba(20, 38, 31, .76)), url("${neighborhood.image_url}")` } : undefined}
            >
              <span className="neighborhood-pin"><MapPin aria-hidden="true" size={16} /></span>
              <span className="neighborhood-card-bottom">
                <span className="neighborhood-name">{neighborhood.name}</span>
                <span className="neighborhood-count">{propertyCounts[neighborhood.id] ?? 0} {propertyCounts[neighborhood.id] === 1 ? "обява" : "обяви"}</span>
              </span>
              <ArrowUpRight className="neighborhood-arrow" aria-hidden="true" size={18} />
            </button>
          ))}
        </div>
      ) : (
        <div className="neighborhood-empty">
          <span className="neighborhood-empty-mark"><MapPin aria-hidden="true" size={21} /></span>
          <div>
            <h3>Кварталите на Русе</h3>
            <p>Скоро ще откриеш тук подробности за местата, които правят града дом.</p>
          </div>
        </div>
      )}
    </section>
  )
}
