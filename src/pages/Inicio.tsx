import { Link } from "react-router";

const IMG_HERO = "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1800&h=1000&fit=crop&auto=format";
const IMG_BAR1 = "https://images.unsplash.com/photo-1578911489158-334e5cd2a051?w=800&h=600&fit=crop&auto=format";
const IMG_BAR2 = "https://images.unsplash.com/photo-1656345129661-53a0177189ce?w=800&h=600&fit=crop&auto=format";
const IMG_BAR3 = "https://images.unsplash.com/photo-1756981168649-0e3c3c8a32f3?w=800&h=900&fit=crop&auto=format";
const IMG_CK1  = "https://images.unsplash.com/photo-1774806245018-a2bdd2eb620b?w=700&h=900&fit=crop&auto=format";
const IMG_CK2  = "https://images.unsplash.com/photo-1772466431721-cac7edd3a0b8?w=700&h=900&fit=crop&auto=format";
const IMG_CK3  = "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=700&h=900&fit=crop&auto=format";
const IMG_WINE = "https://images.unsplash.com/photo-1705917892974-d44cdf98ff99?w=700&h=900&fit=crop&auto=format";
const IMG_P1   = "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=700&h=500&fit=crop&auto=format";
const IMG_P2   = "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=700&h=500&fit=crop&auto=format";
const IMG_P3   = "https://images.unsplash.com/photo-1532939624-3af1308db9a5?w=700&h=500&fit=crop&auto=format";
const IMG_PQ1  = "https://images.unsplash.com/photo-1742838930043-e7c8e08dcd2a?w=700&h=500&fit=crop&auto=format";
const IMG_PQ2  = "https://images.unsplash.com/photo-1692708638919-460015333c4f?w=700&h=500&fit=crop&auto=format";
const IMG_TABLE= "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?w=1200&h=600&fit=crop&auto=format";

function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <div style={{ marginBottom: "3.5rem", textAlign: "center" }}>
      <p className="section-subheading" style={{ marginBottom: "1rem" }}>{label}</p>
      <h2 className="section-heading">{title}</h2>
      {subtitle && (
        <p style={{ fontFamily: "'Outfit', sans-serif", color: "#6b6b6b", fontSize: "0.95rem", maxWidth: 480, margin: "1rem auto 0", lineHeight: 1.7 }}>
          {subtitle}
        </p>
      )}
      <div className="gold-divider" style={{ marginTop: "1.5rem", maxWidth: 320, marginLeft: "auto", marginRight: "auto" }}>
        <span style={{ color: "#c9a84c", fontSize: "0.8rem" }}>✦</span>
      </div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <img src={IMG_HERO} alt="Ambiente nocturno de Mamina Restobar" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.45) 60%, rgba(8,8,8,0.8) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "28%", background: "linear-gradient(to top, #080808, transparent)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 2rem", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          <p className="section-subheading" style={{ marginBottom: "1.5rem" }}>— Restaurante Italo-Peruano · by Las Flores</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, marginBottom: "0.4rem" }}>
            Sabores que
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 400, fontStyle: "italic", color: "#c9a84c", lineHeight: 1.05, marginBottom: "2rem" }}>
            enamoran.
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", color: "#a0a0a0", lineHeight: 1.75, maxWidth: 440, marginBottom: "2.5rem" }}>
            La fusión perfecta entre la cocina italiana y la sazón peruana, acompañada de cócteles de autor y vinos seleccionados.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/carta" className="btn-gold-solid">Ver Carta</Link>
            <Link to="/reservas" className="btn-gold">Reservar Mesa</Link>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.45 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #c9a84c, transparent)" }} />
      </div>
    </section>
  );
}

/* ─── Ambiente ────────────────────────────────────────────────── */
function Ambiente() {
  return (
    <section style={{ padding: "6rem 0", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <SectionHeader label="— Nuestro Espacio" title="El Ambiente" subtitle="Un refugio nocturno donde cada detalle ha sido pensado para una experiencia única." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="amb-grid">
          <div className="gallery-item" style={{ gridRow: "span 2", background: "#111", aspectRatio: "3/4" }}>
            <img src={IMG_BAR1} alt="Barra de Mamina" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="overlay" />
            <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.15em", color: "#c9a84c", textTransform: "uppercase" }}>Nuestra Barra</span>
            </div>
          </div>

          <div className="gallery-item" style={{ background: "#111", aspectRatio: "4/3" }}>
            <img src={IMG_BAR2} alt="Lounge Mamina" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="overlay" />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.15em", color: "#c9a84c", textTransform: "uppercase" }}>Lounge</span>
            </div>
          </div>

          <div className="gallery-item" style={{ background: "#111", aspectRatio: "4/3" }}>
            <img src={IMG_BAR3} alt="Salón Mamina" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="overlay" />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.63rem", letterSpacing: "0.15em", color: "#c9a84c", textTransform: "uppercase" }}>Salón Principal</span>
            </div>
          </div>

          <div style={{ background: "#111111", border: "1px solid #1f1f1f", padding: "2rem", gridColumn: "span 2" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#e0c876", marginBottom: "1rem" }}>Una noche que no olvidarás</h3>
            <p style={{ color: "#6b6b6b", lineHeight: 1.85, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Desde la barra hasta el último rincón, Mamina ha sido diseñado para que cada visita sea un momento especial. Música seleccionada, luces cálidas y una atmósfera que fusiona lo íntimo con lo sofisticado.
            </p>
            <Link to="/reservas" className="btn-gold" style={{ fontSize: "0.65rem" }}>Reservar Mesa</Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .amb-grid { grid-template-columns: 1fr !important; }
          .amb-grid > *:first-child { grid-row: span 1 !important; }
          .amb-grid > *:last-child { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Cócteles ────────────────────────────────────────────────── */
function Cocktails() {
  return (
    <section style={{ padding: "6rem 0", background: "#080808", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60vw", height: "60vw", background: "radial-gradient(circle, #c9a84c07 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", position: "relative" }}>
        <SectionHeader label="— Mixología" title="Cócteles & Bebidas" subtitle="Cada copa es una obra de autor. Ingredientes premium, técnica precisa y creatividad sin límites." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#1a1a1a" }} className="ck-grid">
          {[
            { img: IMG_CK1, name: "Cócteles de Autor", desc: "Creaciones originales de nuestro head bartender" },
            { img: IMG_CK2, name: "Tragos Cortos", desc: "Selección de spirits premium servidos en copa" },
            { img: IMG_WINE, name: "Carta de Vinos", desc: "Vinos de Chile, Argentina, España e Italia" },
            { img: IMG_CK3, name: "Bebidas Especiales", desc: "Maridajes únicos y ediciones de temporada" },
          ].map((item) => (
            <div key={item.name} style={{ background: "#080808" }}>
              <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#111" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid #1a1a1a" }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: "#e0c876", fontSize: "1rem", marginBottom: "0.4rem" }}>{item.name}</h4>
                <p style={{ color: "#6b6b6b", fontSize: "0.82rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link to="/carta" className="btn-gold">Ver Carta Completa</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ck-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ck-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─── Gastronomía ─────────────────────────────────────────────── */
const DISHES = [
  {
    name: "Tagliatelle al Trufo",
    category: "Pastas",
    desc: "Pasta fresca artesanal, crema de parmigiano y trufa negra laminada.",
    price: "S/ 65",
    img: IMG_P1,
  },
  {
    name: "Tabla de Mamina",
    category: "Piqueos",
    desc: "Embutidos finos, quesos maduros, frutos secos y mermeladas caseras.",
    price: "S/ 72",
    img: IMG_PQ1,
  },
  {
    name: "Penne all'Arrabbiata",
    category: "Pastas",
    desc: "Salsa San Marzano, ají rocoto, ajo confitado y albahaca fresca.",
    price: "S/ 48",
    img: IMG_P2,
  },
  {
    name: "Bruschetta Trío",
    category: "Piqueos",
    desc: "Pan rústico tostado, tomate marinado, queso de cabra y tapenade.",
    price: "S/ 45",
    img: IMG_PQ2,
  },
  {
    name: "Fettuccine Carbonara",
    category: "Pastas",
    desc: "Guanciale crujiente, yema de corral, pecorino romano y pimienta.",
    price: "S/ 58",
    img: IMG_P3,
  },
  {
    name: "Risotto al Azafrán",
    category: "Especialidades",
    desc: "Arroz Arborio, fumet de mariscos, azafrán español y parmigiano.",
    price: "S/ 78",
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=700&h=500&fit=crop&auto=format",
  },
  {
    name: "Causa Mamina",
    category: "Piqueos",
    desc: "Papa amarilla cremosa, tartar de atún, palta y crema de ají amarillo.",
    price: "S/ 42",
    img: "https://images.unsplash.com/photo-1619869591528-080e2124de44?w=700&h=500&fit=crop&auto=format",
  },
  {
    name: "Pulpo a la Brasa",
    category: "Especialidades",
    desc: "Tentáculo a la brasa, puré de papa ahumada y chimichurri cítrico.",
    price: "S/ 85",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=700&h=500&fit=crop&auto=format",
  },
];

function Gastronomy() {
  return (
    <section style={{ padding: "6rem 0", background: "#0c0c0c", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        <SectionHeader
          label="— Cocina"
          title="Gastronomía"
          subtitle="Pastas artesanales, piqueos para compartir y especialidades de la casa que elevan cada noche."
        />
      </div>

      {/* Infinite Rotating Carousel Container */}
      <div
        className="carousel-container"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 2rem",
          overflow: "hidden",
        }}
      >
        {/* Track with 2 full sets for seamless endless loop */}
        <div
          className="carousel-track"
          style={{
            display: "flex",
            gap: "1.25rem",
            width: "max-content",
          }}
        >
          {[...DISHES, ...DISHES].map((dish, i) => (
            <div
              key={`${dish.name}-${i}`}
              className="dish-card"
              style={{
                width: 285,
                flexShrink: 0,
                background: "#111111",
                border: "1px solid #1f1f1f",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: 185, overflow: "hidden" }}>
                <img
                  src={dish.img}
                  alt={dish.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s ease",
                  }}
                  className="dish-img"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                    background: "rgba(8, 8, 8, 0.85)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid #c9a84c33",
                    padding: "0.25rem 0.6rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.58rem",
                      letterSpacing: "0.15em",
                      color: "#c9a84c",
                      textTransform: "uppercase",
                    }}
                  >
                    {dish.category}
                  </span>
                </div>
              </div>

              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: "#f0f0f0",
                      fontSize: "1.1rem",
                      marginBottom: "0.4rem",
                      lineHeight: 1.25,
                    }}
                  >
                    {dish.name}
                  </h4>
                  <p
                    style={{
                      color: "#8a8a8a",
                      fontSize: "0.8rem",
                      lineHeight: 1.5,
                      marginBottom: "1rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {dish.desc}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #1a1a1a",
                    paddingTop: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.8rem",
                      color: "#c9a84c",
                      fontWeight: 500,
                    }}
                  >
                    {dish.price}
                  </span>
                  <Link
                    to="/carta"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      color: "#a0a0a0",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a84c")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#a0a0a0")}
                  >
                    Ver en carta →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
        {/* Call to action & indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#6b6b6b", textTransform: "uppercase" }}>
            ✦ Desplazamiento continuo · Pase el cursor para pausar
          </span>
          <Link to="/carta" className="btn-gold" style={{ fontSize: "0.68rem" }}>
            Ver Carta Completa
          </Link>
        </div>

        {/* Feature banner */}
        <div style={{ marginTop: "3.5rem", position: "relative", height: 260, overflow: "hidden", background: "#111" }}>
          <img src={IMG_TABLE} alt="Especialidades de Mamina" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.25) 100%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "3rem", transform: "translateY(-50%)" }}>
            <p className="section-subheading" style={{ marginBottom: "0.5rem" }}>— Especialidades de la Casa</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,2rem)", color: "#fff", margin: 0 }}>
              Cocina con alma, presentación con arte
            </h3>
          </div>
        </div>
      </div>

      <style>{`
        .carousel-track {
          animation: infiniteMarquee 32s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
        .dish-card:hover {
          border-color: #c9a84c55 !important;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
        }
        .dish-card:hover .dish-img {
          transform: scale(1.06);
        }
        @keyframes infiniteMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.625rem));
          }
        }
      `}</style>
    </section>
  );
}

export default function Inicio() {
  return (
    <>
      <Hero />
      <Ambiente />
      <Cocktails />
      <Gastronomy />
    </>
  );
}
