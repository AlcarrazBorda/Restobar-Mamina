import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const salons = [
  ["principal", "Salón Principal", "Ambiente íntimo y animado", "https://images.unsplash.com/photo-1656345129661-53a0177189ce?w=700&h=420&fit=crop&auto=format"],
  ["terraza", "Terraza", "Aire libre bajo las estrellas", "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=700&h=420&fit=crop&auto=format"],
  ["privado", "Salón Privado", "Celebraciones especiales", "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&h=420&fit=crop&auto=format"],
];
const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"];
const valueOf = (date: Date) => date.toISOString().split("T")[0];
const labelOf = (date: Date) => new Intl.DateTimeFormat("es-PE", { weekday: "short", day: "numeric", month: "short" }).format(date).replace(".", "");

export default function Reservas() {
  const { user } = useAuth();
  const calendar = useRef<HTMLInputElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    salon: "principal",
    personas: "2",
    cantidad: "",
    fecha: valueOf(new Date()),
    hora: "",
    nombre: user ? user.name : "",
    telefono: user ? user.phone : "",
    email: user ? user.email : "",
    comentarios: ""
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: prev.nombre || user.name,
        telefono: prev.telefono || user.phone,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const update = (name: string, value: string) => setForm({ ...form, [name]: value });
  const dates = Array.from({ length: 5 }, (_, index) => { const date = new Date(); date.setHours(12, 0, 0, 0); date.setDate(date.getDate() + index); return date; });


  return <div style={{ paddingTop: 80, background: "#080808", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
    <img src="https://images.unsplash.com/photo-1578911489158-334e5cd2a051?w=1400&h=900&fit=crop&auto=format" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.05 }} />
    <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem 5rem" }}>
      <header style={{ textAlign: "center", marginBottom: "3.5rem" }}><p className="section-subheading" style={{ marginBottom: "1rem" }}>— Reserve Su Mesa</p><h1 className="section-heading">Una mesa para compartir</h1><div className="gold-divider" style={{ margin: "1.5rem auto 0", maxWidth: 300 }}><span style={{ color: "#c9a84c" }}>✦</span></div></header>
      <div className="res-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1.55fr", gap: "4rem", alignItems: "start" }}>
        <aside><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#e0c876", marginBottom: "1.25rem" }}>Elige cómo vivir la noche</h2><p style={{ color: "#6b6b6b", lineHeight: 1.85, fontSize: "0.9rem" }}>Selecciona el ambiente que prefieras y cuéntanos cuántas personas nos visitarán. Prepararemos tu mesa con la atención que merece.</p><div style={{ marginTop: "3rem", padding: "1.5rem", border: "1px solid #1f1f1f", background: "#0d0d0d" }}><p className="section-subheading" style={{ marginBottom: "0.5rem" }}>Nota</p><p style={{ color: "#6b6b6b", fontSize: "0.83rem", lineHeight: 1.7 }}>Confirmaremos su reserva en un plazo máximo de 24 horas. Le pedimos llegar con 10 minutos de anticipación.</p></div></aside>
        <div style={{ background: "#111", border: "1px solid #1f1f1f", padding: "2.5rem" }}>
          {sent ? <div style={{ textAlign: "center", padding: "4rem 1rem" }}><div style={{ fontSize: "3.5rem", color: "#c9a84c" }}>✦</div><h3 style={{ fontFamily: "'Playfair Display', serif", color: "#e0c876", fontSize: "1.6rem" }}>Reserva Recibida</h3><p style={{ color: "#6b6b6b", lineHeight: 1.75, margin: "1rem auto 2rem" }}>Le confirmaremos su reserva dentro de las próximas 24 horas. ¡Le esperamos en Mamina!</p><button onClick={() => setSent(false)} className="btn-gold">Nueva Reserva</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <section><p className="section-subheading" style={{ marginBottom: "0.5rem" }}>01 / Ambiente</p><h3 className="booking-title">¿Dónde te gustaría sentarte?</h3><div className="salon-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginTop: "1rem" }}>{salons.map(([id, name, detail, image]) => <button type="button" key={id} onClick={() => update("salon", id)} style={{ padding: 0, textAlign: "left", cursor: "pointer", background: "#1a1a1a", border: form.salon === id ? "1px solid #c9a84c" : "1px solid #282828", color: "#d0d0d0" }}><img src={image} alt={name} style={{ width: "100%", height: 92, objectFit: "cover", display: "block", opacity: form.salon === id ? 1 : 0.65 }} /><span style={{ display: "block", padding: "0.7rem 0.65rem 0.2rem", color: form.salon === id ? "#c9a84c" : "#a0a0a0", fontFamily: "'DM Mono', monospace", fontSize: "0.63rem" }}>{name}</span><span style={{ display: "block", padding: "0 0.65rem 0.7rem", color: "#6b6b6b", fontSize: "0.7rem" }}>{detail}</span></button>)}</div></section>
            <section><p className="section-subheading" style={{ marginBottom: "0.5rem" }}>02 / Tamaño de la mesa</p><h3 className="booking-title">¿Para cuántas personas?</h3><div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "1rem" }}>{["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => <button type="button" key={number} onClick={() => update("personas", number)} style={{ width: 38, height: 38, border: form.personas === number ? "1px solid #c9a84c" : "1px solid #282828", background: form.personas === number ? "#c9a84c" : "#1a1a1a", color: form.personas === number ? "#080808" : "#a0a0a0", cursor: "pointer" }}>{number}</button>)}</div><input name="cantidad" type="number" min="1" max="9" className="form-input" placeholder="Para cuántas personas desea reservar (1–9)" value={form.cantidad} onChange={(event) => update("cantidad", event.target.value)} style={{ marginTop: "1rem" }} /></section>
            <section><p className="section-subheading" style={{ marginBottom: "0.5rem" }}>03 / Fecha</p><div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "1rem" }}><h3 className="booking-title">¿Qué día nos visitas?</h3><button type="button" className="btn-gold" style={{ padding: "0.55rem 0.8rem", fontSize: "0.58rem", whiteSpace: "nowrap" }} onClick={() => calendar.current?.showPicker()}>▣ Calendario</button></div><input ref={calendar} type="date" min={valueOf(new Date())} value={form.fecha} onChange={(event) => update("fecha", event.target.value)} style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1 }} /><div className="date-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem", marginTop: "1rem" }}>{dates.map((date) => <button type="button" key={valueOf(date)} onClick={() => update("fecha", valueOf(date))} style={{ padding: "0.8rem 0.3rem", border: form.fecha === valueOf(date) ? "1px solid #c9a84c" : "1px solid #282828", background: form.fecha === valueOf(date) ? "#c9a84c" : "#1a1a1a", color: form.fecha === valueOf(date) ? "#080808" : "#a0a0a0", cursor: "pointer", fontSize: "0.62rem", textTransform: "capitalize" }}>{labelOf(date)}</button>)}</div></section>
            <section><p className="section-subheading" style={{ marginBottom: "0.5rem" }}>04 / Hora</p><h3 className="booking-title">¿A qué hora?</h3><div className="time-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginTop: "1rem" }}>{times.map((time) => <button type="button" key={time} onClick={() => update("hora", time)} style={{ padding: "0.7rem 0.2rem", border: form.hora === time ? "1px solid #c9a84c" : "1px solid #282828", background: form.hora === time ? "#c9a84c" : "#1a1a1a", color: form.hora === time ? "#080808" : "#a0a0a0", cursor: "pointer" }}>{time}</button>)}</div></section>
            <section style={{ borderTop: "1px solid #282828", paddingTop: "1.8rem" }}><p className="section-subheading" style={{ marginBottom: "1rem" }}>05 / Tus datos</p><div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}><input name="nombre" className="form-input" placeholder="Nombre completo *" required value={form.nombre} onChange={(event) => update("nombre", event.target.value)} /><input name="telefono" className="form-input" placeholder="Teléfono *" required value={form.telefono} onChange={(event) => update("telefono", event.target.value)} /><input name="email" type="email" className="form-input" placeholder="Correo electrónico *" required value={form.email} onChange={(event) => update("email", event.target.value)} /><textarea name="comentarios" className="form-input" rows={3} placeholder="Comentarios o requerimientos especiales" value={form.comentarios} onChange={(event) => update("comentarios", event.target.value)} style={{ resize: "vertical", gridColumn: "1 / -1" }} /></div></section>
            <button type="submit" className="btn-gold-solid">Solicitar Reserva</button>
          </form>}
        </div>
      </div>
    </div>
    <style>{`.booking-title { font-family: 'Playfair Display', serif; color: #e0c876; font-size: 1.35rem; } @media (max-width: 820px) { .res-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; } } @media (max-width: 520px) { .salon-grid { grid-template-columns: 1fr !important; } .contact-grid { grid-template-columns: 1fr !important; } .contact-grid textarea { grid-column: auto !important; } .time-grid { grid-template-columns: repeat(3, 1fr) !important; } }`}</style>
  </div>;
}
