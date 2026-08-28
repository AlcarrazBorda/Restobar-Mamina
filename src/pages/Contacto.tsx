import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Contacto() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    nombre: user ? user.name : "",
    email: user ? user.email : "",
    asunto: "",
    mensaje: ""
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: prev.nombre || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };


  return (
    <div style={{ paddingTop: 80, background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ padding: "4rem 2rem 3rem", textAlign: "center", borderBottom: "1px solid #111" }}>
        <p className="section-subheading" style={{ marginBottom: "1rem" }}>— Contáctanos</p>
        <h1 className="section-heading">Estamos aquí para ti</h1>
        <div className="gold-divider" style={{ marginTop: "1.5rem", maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ color: "#c9a84c", fontSize: "0.8rem" }}>✦</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 2rem 5rem" }}>
        {/* Two-column: form + contact info/map */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem", alignItems: "start" }} className="contact-layout">
          {/* Form */}
          <div style={{ background: "#111", border: "1px solid #1f1f1f", padding: "2.5rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#e0c876", fontSize: "1.4rem", marginBottom: "1.75rem" }}>Envíanos un Mensaje</h2>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#c9a84c", fontSize: "3rem", marginBottom: "1rem" }}>✦</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#e0c876", fontSize: "1.3rem", marginBottom: "0.75rem" }}>Mensaje Enviado</h3>
                <p style={{ color: "#6b6b6b", fontSize: "0.9rem", lineHeight: 1.7 }}>Nos pondremos en contacto contigo muy pronto.</p>
                <button onClick={() => setSent(false)} className="btn-gold" style={{ marginTop: "2rem" }}>Nuevo Mensaje</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#6b6b6b", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Nombre *</label>
                    <input name="nombre" className="form-input" placeholder="Tu nombre" value={form.nombre} onChange={handle} required />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#6b6b6b", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Correo *</label>
                    <input name="email" type="email" className="form-input" placeholder="tu@correo.com" value={form.email} onChange={handle} required />
                  </div>
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#6b6b6b", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Asunto</label>
                  <input name="asunto" className="form-input" placeholder="¿Sobre qué nos escribes?" value={form.asunto} onChange={handle} />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.18em", color: "#6b6b6b", textTransform: "uppercase", display: "block", marginBottom: "0.4rem" }}>Mensaje *</label>
                  <textarea name="mensaje" className="form-input" rows={6} placeholder="Escríbenos tu consulta, sugerencia o comentario..." value={form.mensaje} onChange={handle} required style={{ resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-gold-solid" style={{ marginTop: "0.25rem" }}>Enviar Mensaje</button>
              </form>
            )}
          </div>

          {/* Right column: Información de contacto (Dirección, Teléfono, Correo, Horario) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ background: "#111", border: "1px solid #1f1f1f", padding: "2rem" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Estamos aquí para ti
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  {
                    icon: "📍",
                    label: "Dirección",
                    lines: ["Av. La Mar 1234", "Miraflores, Lima"],
                  },
                  {
                    icon: "📞",
                    label: "Teléfono",
                    lines: ["+51 999 123 456", "+51 (01) 234 5678"],
                  },
                  {
                    icon: "✉",
                    label: "Correo",
                    lines: ["hola@maminarestobar.pe", "reservas@maminarestobar.pe"],
                  },
                  {
                    icon: "🕐",
                    label: "Horario",
                    lines: ["Mar – Vie: 6 PM – 2 AM", "Sáb – Dom: 5 PM – 3 AM"],
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.85rem 1rem",
                      border: "1px solid #1a1a1a",
                      background: "#0d0d0d",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#c9a84c33")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a")}
                  >
                    <span style={{ fontSize: "1.25rem", lineHeight: 1, width: 24, textAlign: "center" }}>
                      {item.icon}
                    </span>
                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          color: "#c9a84c",
                          textTransform: "uppercase",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {item.label}
                      </p>
                      {item.lines.map((l) => (
                        <p key={l} style={{ color: "#a0a0a0", fontSize: "0.82rem", lineHeight: 1.4 }}>
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div style={{ background: "#111", border: "1px solid #1f1f1f", height: 200, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#c9a84c08 1px,transparent 1px),linear-gradient(90deg,#c9a84c08 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
              <div style={{ textAlign: "center", position: "relative" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "0.5rem" }}>Ubicación</p>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#6b6b6b", fontSize: "0.9rem", marginBottom: "1.25rem" }}>Miraflores · Lima, Perú</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-gold" style={{ fontSize: "0.62rem" }}>Ver en Google Maps</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
