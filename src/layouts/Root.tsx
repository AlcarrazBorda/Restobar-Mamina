import { Outlet, NavLink, useLocation } from "react-router";
import { useState, useEffect } from "react";
import logo from "../imports/logo_transparent.png";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Galería", to: "/galeria" },
  { label: "Carta", to: "/carta" },
  { label: "Contáctanos", to: "/contacto" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, openAuthModal } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.35s, border-color 0.35s, backdrop-filter 0.35s, box-shadow 0.35s",
        background: "rgba(8, 8, 8, 0.96)",
        borderBottom: scrolled ? "1px solid #c9a84c33" : "1px solid #c9a84c22",
        backdropFilter: "blur(14px)",
        boxShadow: scrolled ? "0 4px 24px rgba(0, 0, 0, 0.6)" : "0 2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Desktop bar (> 820px) */}
        <div className="nav-desktop-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80 }}>
          {/* Logo y Botón de Cuenta al lado */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <NavLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img
                src={logo}
                alt="Mamina Restobar"
                style={{ height: 56, width: "auto", objectFit: "contain", filter: "brightness(1.05)" }}
              />
            </NavLink>

            {/* Botón de Cuenta (al lado del logo) */}
            <button
              onClick={openAuthModal}
              className="nav-account-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                background: user ? "rgba(201, 168, 76, 0.12)" : "rgba(22, 22, 22, 0.8)",
                border: user ? "1px solid #c9a84c88" : "1px solid #c9a84c44",
                borderRadius: "20px",
                padding: "0.38rem 0.85rem",
                color: user ? "#e0c876" : "#c9a84c",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              title={user ? `Cuenta de ${user.name}` : "Iniciar sesión o registrarse"}
            >
              {user ? (
                <>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #e0c876, #9a7830)",
                      color: "#080808",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.68rem",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span style={{ maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Mi Cuenta</span>
                </>
              )}
            </button>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? "#c9a84c" : undefined,
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/reservas" className="btn-gold" style={{ padding: "0.5rem 1.5rem", textDecoration: "none" }}>
              Reservar
            </NavLink>
          </div>
        </div>

        {/* Mobile bar (<= 820px): Izquierda = Menú, Centro = Logo + Cuenta, Derecha = Reservar */}
        <div className="nav-mobile-row" style={{ display: "none", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Izquierda: Botón Menú / Hamburguesa */}
          <div style={{ flex: "1 0 0", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 4px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "5px",
              }}
              aria-label="Abrir menú"
            >
              <span style={{ display: "block", width: 22, height: 2, background: open ? "#c9a84c" : "#e0c876", transition: "all 0.25s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", width: 15, height: 2, background: open ? "transparent" : "#a0a0a0", transition: "opacity 0.2s", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 2, background: open ? "#c9a84c" : "#e0c876", transition: "all 0.25s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          </div>

          {/* Centro: Logo y Botón Cuenta al lado */}
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem" }}>
            <NavLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <img
                src={logo}
                alt="Mamina Restobar"
                style={{ height: 42, width: "auto", objectFit: "contain", filter: "brightness(1.05)" }}
              />
            </NavLink>

            {/* Botón de Cuenta móvil */}
            <button
              onClick={openAuthModal}
              className="nav-account-btn-mobile"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: user ? "rgba(201, 168, 76, 0.15)" : "rgba(22, 22, 22, 0.9)",
                border: "1px solid #c9a84c55",
                borderRadius: "16px",
                padding: "0.25rem 0.55rem",
                color: user ? "#e0c876" : "#c9a84c",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.62rem",
                cursor: "pointer",
              }}
              aria-label="Mi Cuenta"
            >
              {user ? (
                <>
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "#c9a84c",
                      color: "#080808",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.6rem",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span style={{ maxWidth: 65, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Cuenta</span>
                </>
              )}
            </button>
          </div>

          {/* Derecha: Botón Reservar */}
          <div style={{ flex: "1 0 0", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <NavLink
              to="/reservas"
              className="btn-gold"
              style={{
                padding: "0.4rem 0.85rem",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Reservar
            </NavLink>
          </div>
        </div>

        {/* Despliegue de opciones en móvil */}
        {open && (
          <div
            style={{
              borderTop: "1px solid #1a1a1a",
              padding: "1rem 0.25rem 1.5rem",
              background: "rgba(8,8,8,0.98)",
              animation: "navFade 0.2s ease",
            }}
          >
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className="nav-link"
                style={({ isActive }) => ({
                  display: "block",
                  padding: "0.85rem 0.5rem",
                  borderBottom: "1px solid #141414",
                  color: isActive ? "#c9a84c" : "#d0d0d0",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                })}
              >
                {l.label}
              </NavLink>
            ))}

            {/* Opción adicional para Cuenta en el menú desplegable móvil */}
            <button
              onClick={() => {
                setOpen(false);
                openAuthModal();
              }}
              style={{
                width: "100%",
                textAlign: "left",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #141414",
                padding: "0.85rem 0.5rem",
                color: user ? "#e0c876" : "#c9a84c",
                fontSize: "0.78rem",
                fontFamily: "'DM Mono', monospace",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{user ? `Mi Perfil (${user.name})` : "Iniciar Sesión / Registrarse"}</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        .nav-account-btn:hover {
          background: rgba(201, 168, 76, 0.2) !important;
          border-color: #c9a84c !important;
          transform: translateY(-1px);
          box-shadow: 0 0 12px rgba(201, 168, 76, 0.25);
        }
        .nav-account-btn-mobile:active {
          background: rgba(201, 168, 76, 0.3) !important;
        }
        @media (max-width: 820px) {
          .nav-desktop-row { display: none !important; }
          .nav-mobile-row { display: flex !important; }
        }
        @keyframes navFade {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#050505", borderTop: "1px solid #1a1a1a" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-cols">
          {/* Brand */}
          <div>
            <img
              src={logo}
              alt="Mamina Restobar"
              style={{ height: 52, width: "auto", objectFit: "contain", marginBottom: "1.25rem", filter: "brightness(0.85)" }}
            />
            <p style={{ color: "#3d3d3d", fontSize: "0.85rem", lineHeight: 1.75, maxWidth: 260 }}>
              Restaurante Italo-peruano en el corazón de Las Flores. Una experiencia gastronómica y de mixología única.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {[
                { name: "Facebook", icon: "https://cdn.simpleicons.org/facebook/6b6b6b", url: "#" },
                { name: "Instagram", icon: "https://cdn.simpleicons.org/instagram/6b6b6b", url: "#" },
                { name: "TikTok", icon: "https://cdn.simpleicons.org/tiktok/6b6b6b", url: "#" },
              ].map((social) => (
                <a key={social.name} href={social.url} aria-label={social.name} style={{ width: 32, height: 32, border: "1px solid #1f1f1f", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c44"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1f1f1f"; }}
                >
                  <img src={social.icon} alt="" width="15" height="15" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "1.25rem" }}>Navegación</p>
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} style={{ display: "block", color: "#3d3d3d", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#a0a0a0")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#3d3d3d")}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Horario */}
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "1.25rem" }}>Horario</p>
            {[
              { day: "Lunes", hours: "Cerrado" },
              { day: "Mar – Vie", hours: "6 PM – 2 AM" },
              { day: "Sábado", hours: "5 PM – 3 AM" },
              { day: "Domingo", hours: "5 PM – 1 AM" },
            ].map((h) => (
              <div key={h.day} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", gap: "0.5rem" }}>
                <span style={{ color: "#3d3d3d", fontSize: "0.82rem" }}>{h.day}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: h.hours === "Cerrado" ? "#282828" : "#6b6b6b" }}>{h.hours}</span>
              </div>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#c9a84c", textTransform: "uppercase", marginBottom: "1.25rem" }}>Legal</p>
            {["Términos y Condiciones", "Política de Privacidad", "Libro de Reclamaciones"].map((l) => (
              <a key={l} href="#" style={{ display: "block", color: "#3d3d3d", fontSize: "0.85rem", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#a0a0a0")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#3d3d3d")}
              >
                {l}
              </a>
            ))}
            <div style={{ marginTop: "1rem", padding: "0.75rem", border: "1px solid #1a1a1a", textAlign: "center" }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.12em", color: "#3d3d3d", textTransform: "uppercase", marginBottom: "0.2rem" }}>Libro de</p>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#6b6b6b", fontSize: "0.85rem" }}>Reclamaciones</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #111", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#282828", letterSpacing: "0.1em" }}>
            © 2024 Mamina Restobar · Todos los derechos reservados.
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: "#1f1f1f", letterSpacing: "0.1em" }}>
            by Las Flores · Lima, Perú
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

export default function Root() {
  return (
    <div style={{ minHeight: "100vh", background: "#080808", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
}

