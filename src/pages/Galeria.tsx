const photos = [
  { img: "https://images.unsplash.com/photo-1578911489158-334e5cd2a051?w=800&h=600&fit=crop&auto=format", label: "Nuestra Barra", cat: "Ambiente" },
  { img: "https://images.unsplash.com/photo-1774806245018-a2bdd2eb620b?w=700&h=1000&fit=crop&auto=format", label: "Cócteles Signature", cat: "Bebidas" },
  { img: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=700&h=500&fit=crop&auto=format", label: "Tagliatelle al Trufo", cat: "Gastronomía" },
  { img: "https://images.unsplash.com/photo-1569153482031-a3cebdedf294?w=700&h=900&fit=crop&auto=format", label: "Selección de Vinos", cat: "Bebidas" },
  { img: "https://images.unsplash.com/photo-1656345129661-53a0177189ce?w=800&h=600&fit=crop&auto=format", label: "Salón Principal", cat: "Ambiente" },
  { img: "https://images.unsplash.com/photo-1742838930043-e7c8e08dcd2a?w=700&h=500&fit=crop&auto=format", label: "Tabla de Mamina", cat: "Gastronomía" },
  { img: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=700&h=900&fit=crop&auto=format", label: "Martini Clásico", cat: "Bebidas" },
  { img: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?w=1200&h=600&fit=crop&auto=format", label: "Noches Especiales", cat: "Ambiente" },
  { img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=700&h=500&fit=crop&auto=format", label: "Penne all'Arrabbiata", cat: "Gastronomía" },
  { img: "https://images.unsplash.com/photo-1772466431721-cac7edd3a0b8?w=700&h=900&fit=crop&auto=format", label: "Eclipse Noir", cat: "Bebidas" },
  { img: "https://images.unsplash.com/photo-1756981168649-0e3c3c8a32f3?w=800&h=900&fit=crop&auto=format", label: "Lounge Privado", cat: "Ambiente" },
  { img: "https://images.unsplash.com/photo-1692708638919-460015333c4f?w=700&h=500&fit=crop&auto=format", label: "Bruschetta Trío", cat: "Gastronomía" },
];

const CATS = ["Todos", "Ambiente", "Bebidas", "Gastronomía"] as const;
type Cat = (typeof CATS)[number];

import { useState } from "react";

export default function Galeria() {
  const [active, setActive] = useState<Cat>("Todos");
  const filtered = active === "Todos" ? photos : photos.filter((p) => p.cat === active);

  return (
    <div style={{ paddingTop: 80, background: "#080808", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ padding: "4rem 2rem 3rem", textAlign: "center", borderBottom: "1px solid #111" }}>
        <p className="section-subheading" style={{ marginBottom: "1rem" }}>— Fotografía</p>
        <h1 className="section-heading">Galería</h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", color: "#6b6b6b", fontSize: "0.95rem", maxWidth: 440, margin: "1rem auto 0", lineHeight: 1.7 }}>
          Momentos, sabores y experiencias que definen cada noche en Mamina.
        </p>
        <div className="gold-divider" style={{ marginTop: "1.5rem", maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ color: "#c9a84c", fontSize: "0.8rem" }}>✦</span>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "inline-flex", gap: 0, justifyContent: "center", marginTop: "2rem", borderBottom: "1px solid #1f1f1f" }}>
          {CATS.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)} style={{
              background: "none", border: "none",
              borderBottom: active === cat ? "2px solid #c9a84c" : "2px solid transparent",
              color: active === cat ? "#c9a84c" : "#6b6b6b",
              fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em",
              textTransform: "uppercase", padding: "0.75rem 1.5rem", cursor: "pointer",
              transition: "color 0.2s", marginBottom: "-1px",
            }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <div style={{ columns: "3 260px", gap: "1rem" }}>
          {filtered.map((photo, i) => (
            <div key={`${photo.label}-${i}`} className="gallery-item" style={{ breakInside: "avoid", marginBottom: "1rem", background: "#111", cursor: "pointer" }}>
              <img src={photo.img} alt={photo.label} style={{ width: "100%", display: "block" }} />
              <div className="overlay" />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#c9a84c", textTransform: "uppercase", display: "block", marginBottom: "0.1rem" }}>{photo.cat}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "0.85rem" }}>{photo.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
