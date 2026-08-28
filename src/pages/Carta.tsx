import { useState } from "react";

const categories = ["Cócteles", "Tragos Cortos", "Vinos", "Pastas", "Piqueos", "Especialidades"] as const;
type Category = (typeof categories)[number];

const items: { category: Category; name: string; desc: string; price: string; img: string }[] = [
  { category: "Cócteles", name: "Noche Dorada", desc: "Pisco macerado, maracuyá, jengibre, espuma de lima y bitters dorados.", price: "S/ 38", img: "https://images.unsplash.com/photo-1774806245018-a2bdd2eb620b?w=700&h=500&fit=crop&auto=format" },
  { category: "Cócteles", name: "Eclipse Noir", desc: "Gin premium, licor de violeta, agua tónica artesanal y lavanda.", price: "S/ 42", img: "https://images.unsplash.com/photo-1772466431721-cac7edd3a0b8?w=700&h=500&fit=crop&auto=format" },
  { category: "Cócteles", name: "Rosa Negra", desc: "Vodka premium, lichi, jugo de remolacha, pétalos de rosa.", price: "S/ 40", img: "https://images.unsplash.com/photo-1761315413023-96ead2bc95e9?w=700&h=500&fit=crop&auto=format" },
  { category: "Cócteles", name: "Pisco Sour Mamina", desc: "Pisco quebranta, limón sutil, jarabe de goma, clara de huevo, angostura.", price: "S/ 35", img: "https://images.unsplash.com/photo-1780019676040-9816a7bd031d?w=700&h=500&fit=crop&auto=format" },
  { category: "Tragos Cortos", name: "Golden Shot", desc: "Whisky single malt 12 años, servido a temperatura perfecta.", price: "S/ 28", img: "https://images.unsplash.com/photo-1598994671512-395d7a6147e0?w=700&h=500&fit=crop&auto=format" },
  { category: "Tragos Cortos", name: "Martini Clásico", desc: "Gin London Dry, vermut seco, aceituna verde. Servido helado.", price: "S/ 35", img: "https://images.unsplash.com/photo-1773188243511-2eb85126f08b?w=700&h=500&fit=crop&auto=format" },
  { category: "Tragos Cortos", name: "Negroni", desc: "Gin, Campari, vermut rosso. Clásico italiano en su máxima expresión.", price: "S/ 32", img: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=700&h=500&fit=crop&auto=format" },
  { category: "Vinos", name: "Malbec Reserva", desc: "Mendoza, Argentina. Notas de ciruela, mora y especias. Cuerpo pleno.", price: "S/ 55 / copa", img: "https://images.unsplash.com/photo-1569153482031-a3cebdedf294?w=700&h=500&fit=crop&auto=format" },
  { category: "Vinos", name: "Chardonnay Gran Selección", desc: "Valle de Casablanca, Chile. Fresco, mineral, con final prolongado.", price: "S/ 48 / copa", img: "https://images.unsplash.com/photo-1575184560884-5f3ece6e636c?w=700&h=500&fit=crop&auto=format" },
  { category: "Vinos", name: "Tempranillo Crianza", desc: "Ribera del Duero, España. Taninos elegantes, notas de vainilla y cuero.", price: "S/ 60 / copa", img: "https://images.unsplash.com/photo-1705917892974-d44cdf98ff99?w=700&h=500&fit=crop&auto=format" },
  { category: "Pastas", name: "Tagliatelle al Trufo", desc: "Pasta fresca artesanal, crema de parmigiano, trufa negra laminada.", price: "S/ 65", img: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=700&h=500&fit=crop&auto=format" },
  { category: "Pastas", name: "Penne all'Arrabbiata", desc: "Salsa de tomate San Marzano, ají rocoto, ajo confitado, albahaca fresca.", price: "S/ 48", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=700&h=500&fit=crop&auto=format" },
  { category: "Pastas", name: "Fettuccine Carbonara", desc: "Guanciale importado, yema de huevo, pecorino romano, pimienta negra molida.", price: "S/ 58", img: "https://images.unsplash.com/photo-1532939624-3af1308db9a5?w=700&h=500&fit=crop&auto=format" },
  { category: "Pastas", name: "Linguine al Pesto Peruano", desc: "Pesto de huacatay, nueces de macadamia, parmigiano y aceite de oliva.", price: "S/ 52", img: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?w=700&h=500&fit=crop&auto=format" },
  { category: "Piqueos", name: "Tabla de Mamina", desc: "Selección de embutidos importados, quesos maduros, frutos secos y mermeladas.", price: "S/ 72", img: "https://images.unsplash.com/photo-1742838930043-e7c8e08dcd2a?w=700&h=500&fit=crop&auto=format" },
  { category: "Piqueos", name: "Bruschetta Trío", desc: "Pan artesanal tostado con tres toppings: tomate, queso de cabra y paté.", price: "S/ 45", img: "https://images.unsplash.com/photo-1692708638919-460015333c4f?w=700&h=500&fit=crop&auto=format" },
  { category: "Piqueos", name: "Causa Mamina", desc: "Causa limeña rellena de atún, palta y mayonesa de ají amarillo.", price: "S/ 42", img: "https://images.unsplash.com/photo-1619869591528-080e2124de44?w=700&h=500&fit=crop&auto=format" },
  { category: "Especialidades", name: "Risotto al Azafrán", desc: "Arroz Arborio, caldo de mariscos, azafrán español, parmigiano reggiano.", price: "S/ 78", img: "https://images.unsplash.com/photo-1532117472055-4d0734b51f31?w=700&h=500&fit=crop&auto=format" },
  { category: "Especialidades", name: "Pulpo a la Brasa", desc: "Pulpo gallego, puré de papa ahumada, chimichurri y aceite de oliva extra virgen.", price: "S/ 85", img: "https://images.unsplash.com/photo-1692708638919-460015333c4f?w=700&h=500&fit=crop&auto=format" },
];

export default function Carta() {
  const [active, setActive] = useState<Category>("Cócteles");
  const filtered = items.filter((m) => m.category === active);

  return (
    <div style={{ paddingTop: 80, background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ padding: "4rem 2rem 0", textAlign: "center" }}>
        <p className="section-subheading" style={{ marginBottom: "1rem" }}>— Menú</p>
        <h1 className="section-heading">Nuestra Carta</h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", color: "#6b6b6b", fontSize: "0.95rem", maxWidth: 460, margin: "1rem auto 0", lineHeight: 1.7 }}>
          Ingredientes seleccionados, preparaciones artesanales y sabores que perduran.
        </p>
        <div className="gold-divider" style={{ marginTop: "1.5rem", maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ color: "#c9a84c", fontSize: "0.8rem" }}>✦</span>
        </div>
      </div>

      {/* Sticky category tabs */}
      <div style={{ position: "sticky", top: 80, zIndex: 10, background: "rgba(10,10,10,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1f1f1f", marginTop: "2.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", justifyContent: "center", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 0, margin: "0 auto", minWidth: "max-content", justifyContent: "center" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                background: "none", border: "none",
                borderBottom: active === cat ? "2px solid #c9a84c" : "2px solid transparent",
                color: active === cat ? "#c9a84c" : "#6b6b6b",
                fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em",
                textTransform: "uppercase", padding: "1rem 1.5rem", cursor: "pointer",
                whiteSpace: "nowrap", transition: "color 0.2s", marginBottom: "-1px",
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((item) => (
            <div key={item.name} className="menu-card" style={{ overflow: "hidden" }}>
              <div style={{ height: 200, overflow: "hidden", background: "#1a1a1a" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#e0c876", fontSize: "1.05rem", flex: 1 }}>{item.name}</h3>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: "#c9a84c", marginLeft: "1rem", whiteSpace: "nowrap" }}>{item.price}</span>
                </div>
                <p style={{ color: "#6b6b6b", fontSize: "0.83rem", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
