import { useState, useEffect, useId } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../imports/logo_transparent.png";

type Step = "choose_provider" | "fill_data" | "profile_view" | "edit_profile";
type Provider = "google" | "facebook";

export default function AuthModal() {
  const { user, isAuthModalOpen, closeAuthModal, login, updateProfile, logout } = useAuth();
  const formId = useId();

  const [step, setStep] = useState<Step>("choose_provider");
  const [selectedProvider, setSelectedProvider] = useState<Provider>("google");

  // Form states for login/registration
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  // Edit profile states
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editBirthDate, setEditBirthDate] = useState("");

  // Error messages
  const [errors, setErrors] = useState<{ name?: string; phone?: string; birthDate?: string; email?: string }>({});

  useEffect(() => {
    if (isAuthModalOpen) {
      if (user) {
        setStep("profile_view");
        setEditName(user.name);
        setEditPhone(user.phone);
        setEditBirthDate(user.birthDate);
      } else {
        setStep("choose_provider");
        setName("");
        setPhone("");
        setBirthDate("");
        setEmail("");
        setErrors({});
      }
    }
  }, [isAuthModalOpen, user]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSelectProvider = (provider: Provider) => {
    setSelectedProvider(provider);
    if (provider === "google") {
      setEmail("usuario.google@gmail.com");
    } else {
      setEmail("usuario.facebook@hotmail.com");
    }
    setStep("fill_data");
  };

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; birthDate?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Por favor, ingresa tus apellidos y nombres completos.";
    } else if (name.trim().length < 3) {
      newErrors.name = "El nombre debe contener al menos 3 caracteres.";
    }

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!cleanPhone) {
      newErrors.phone = "El número de celular es obligatorio.";
    } else if (!/^\d{9,12}$/.test(cleanPhone)) {
      newErrors.phone = "Ingresa un número de celular válido (ej. 987654321).";
    }

    if (!birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria.";
    } else {
      const birth = new Date(birthDate);
      const now = new Date();
      if (isNaN(birth.getTime()) || birth > now) {
        newErrors.birthDate = "Ingresa una fecha de nacimiento válida.";
      }
    }

    if (!email.trim() || !email.includes("@")) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    login({
      name: name.trim(),
      phone: phone.trim(),
      birthDate,
      email: email.trim(),
      provider: selectedProvider,
    });

    closeAuthModal();
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) {
      alert("El nombre completo es obligatorio.");
      return;
    }
    if (!editPhone.trim()) {
      alert("El número de celular es obligatorio.");
      return;
    }
    if (!editBirthDate) {
      alert("La fecha de nacimiento es obligatoria.");
      return;
    }

    updateProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      birthDate: editBirthDate,
    });
    setStep("profile_view");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        animation: "modalFadeIn 0.25s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#0d0d0d",
          border: "1px solid #c9a84c44",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(201, 168, 76, 0.1)",
          borderRadius: "8px",
          padding: "2rem",
          color: "#d0d0d0",
          maxHeight: "92vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "none",
            border: "none",
            color: "#6b6b6b",
            cursor: "pointer",
            fontSize: "1.25rem",
            lineHeight: 1,
            padding: "4px 8px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c9a84c")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <img
            src={logo}
            alt="Mamina Restobar"
            style={{
              height: 48,
              width: "auto",
              objectFit: "contain",
              margin: "0 auto 0.75rem",
              filter: "brightness(1.1)",
            }}
          />
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#c9a84c",
              textTransform: "uppercase",
            }}
          >
            {user ? "Panel de Usuario" : "Acceso Exclusivo"}
          </p>
        </div>

        {/* VIEW 1: Choose Provider (Google / Facebook) */}
        {step === "choose_provider" && (
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.45rem",
                color: "#e0c876",
                textAlign: "center",
                marginBottom: "0.5rem",
                fontWeight: 600,
              }}
            >
              Iniciar Sesión o Registrarse
            </h3>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#8a8a8a",
                textAlign: "center",
                lineHeight: 1.5,
                marginBottom: "2rem",
              }}
            >
              Elige tu método preferido para ingresar y completar tus datos personales.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSelectProvider("google")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.85rem",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  background: "#141414",
                  border: "1px solid #2d2d2d",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "'Outfit', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#4285F4";
                  (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(66, 133, 244, 0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2d2d2d";
                  (e.currentTarget as HTMLElement).style.background = "#141414";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>Continuar con Google</span>
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={() => handleSelectProvider("facebook")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.85rem",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  background: "#141414",
                  border: "1px solid #2d2d2d",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "'Outfit', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#1877F2";
                  (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(24, 119, 242, 0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2d2d2d";
                  (e.currentTarget as HTMLElement).style.background = "#141414";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continuar con Facebook</span>
              </button>
            </div>

            <div
              style={{
                marginTop: "2rem",
                paddingTop: "1.25rem",
                borderTop: "1px solid #1f1f1f",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "0.72rem", color: "#555555" }}>
                🔒 Al continuar, aceptas nuestros términos de servicio y políticas de privacidad para la gestión de reservas en Mamina Restobar.
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: Fill Required Data Form */}
        {step === "fill_data" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <button
                type="button"
                onClick={() => setStep("choose_provider")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#c9a84c",
                  fontSize: "0.75rem",
                  fontFamily: "'DM Mono', monospace",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                ← Cambiar proveedor
              </button>

              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "12px",
                  background: selectedProvider === "google" ? "rgba(66, 133, 244, 0.15)" : "rgba(24, 119, 242, 0.15)",
                  color: selectedProvider === "google" ? "#8ab4f8" : "#70a5ff",
                  border: `1px solid ${selectedProvider === "google" ? "#4285F444" : "#1877F244"}`,
                  textTransform: "capitalize",
                }}
              >
                {selectedProvider}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.35rem",
                color: "#e0c876",
                marginBottom: "0.35rem",
              }}
            >
              Completa tus datos obligatorios
            </h3>
            <p style={{ fontSize: "0.8rem", color: "#8a8a8a", marginBottom: "1.5rem" }}>
              Para garantizar tu experiencia y la validación de tus reservas, ingresa la siguiente información requerida:
            </p>

            <form onSubmit={handleSubmitRegister} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {/* Campo 1: Apellidos y Nombres */}
              <div>
                <label
                  htmlFor={`${formId}-name`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Apellidos y Nombres <span style={{ color: "#e07676" }}>*</span>
                </label>
                <input
                  id={`${formId}-name`}
                  type="text"
                  className="form-input"
                  placeholder="Ej. Pérez Gonzales, Carlos Andrés"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    borderColor: errors.name ? "#e07676" : undefined,
                    borderRadius: "4px",
                  }}
                  required
                />
                {errors.name && (
                  <p style={{ color: "#e07676", fontSize: "0.72rem", marginTop: "0.3rem" }}>{errors.name}</p>
                )}
              </div>

              {/* Campo 2: Número de Celular */}
              <div>
                <label
                  htmlFor={`${formId}-phone`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Número de Celular <span style={{ color: "#e07676" }}>*</span>
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  className="form-input"
                  placeholder="Ej. 987654321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    borderColor: errors.phone ? "#e07676" : undefined,
                    borderRadius: "4px",
                  }}
                  required
                />
                {errors.phone && (
                  <p style={{ color: "#e07676", fontSize: "0.72rem", marginTop: "0.3rem" }}>{errors.phone}</p>
                )}
              </div>

              {/* Campo 3: Fecha de Nacimiento */}
              <div>
                <label
                  htmlFor={`${formId}-birthDate`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Fecha de Nacimiento <span style={{ color: "#e07676" }}>*</span>
                </label>
                <input
                  id={`${formId}-birthDate`}
                  type="date"
                  className="form-input"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={{
                    borderColor: errors.birthDate ? "#e07676" : undefined,
                    borderRadius: "4px",
                    colorScheme: "dark",
                  }}
                  required
                />
                {errors.birthDate && (
                  <p style={{ color: "#e07676", fontSize: "0.72rem", marginTop: "0.3rem" }}>{errors.birthDate}</p>
                )}
              </div>

              {/* Email vinculado */}
              <div>
                <label
                  htmlFor={`${formId}-email`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#8a8a8a",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Correo Electrónico (vinculado a {selectedProvider})
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  className="form-input"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderRadius: "4px" }}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-gold-solid"
                style={{
                  marginTop: "0.75rem",
                  width: "100%",
                  padding: "0.85rem",
                  textAlign: "center",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                }}
              >
                Completar Registro e Ingresar
              </button>
            </form>
          </div>
        )}

        {/* VIEW 3: Logged-in Profile View */}
        {step === "profile_view" && user && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #e0c876, #9a7830)",
                  color: "#080808",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.6rem",
                  fontWeight: "bold",
                  margin: "0 auto 0.75rem",
                  border: "2px solid #c9a84c",
                  boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.35rem",
                  color: "#e0c876",
                  marginBottom: "0.25rem",
                }}
              >
                {user.name}
              </h3>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.65rem",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "10px",
                  background: "#1a1a1a",
                  color: "#c9a84c",
                  border: "1px solid #333",
                }}
              >
                <span>Conectado vía</span>
                <strong style={{ textTransform: "capitalize" }}>{user.provider}</strong>
              </span>
            </div>

            {/* Profile Info Grid */}
            <div
              style={{
                backgroundColor: "#121212",
                border: "1px solid #1f1f1f",
                borderRadius: "6px",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#6b6b6b", textTransform: "uppercase" }}>
                  Apellidos y Nombres
                </p>
                <p style={{ fontSize: "0.9rem", color: "#d0d0d0", fontWeight: 500 }}>{user.name}</p>
              </div>

              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "0.75rem" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#6b6b6b", textTransform: "uppercase" }}>
                  Número de Celular
                </p>
                <p style={{ fontSize: "0.9rem", color: "#d0d0d0" }}>{user.phone}</p>
              </div>

              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "0.75rem" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#6b6b6b", textTransform: "uppercase" }}>
                  Fecha de Nacimiento
                </p>
                <p style={{ fontSize: "0.9rem", color: "#d0d0d0" }}>{user.birthDate}</p>
              </div>

              <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "0.75rem" }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#6b6b6b", textTransform: "uppercase" }}>
                  Correo Electrónico
                </p>
                <p style={{ fontSize: "0.9rem", color: "#a0a0a0" }}>{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem", flexDirection: "column" }}>
              <button
                type="button"
                onClick={() => setStep("edit_profile")}
                className="btn-gold"
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: "0.65rem",
                  fontSize: "0.7rem",
                }}
              >
                Editar Mis Datos
              </button>

              <button
                type="button"
                onClick={() => {
                  logout();
                  closeAuthModal();
                }}
                style={{
                  background: "transparent",
                  border: "1px solid #331515",
                  color: "#e07676",
                  padding: "0.65rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(224, 118, 118, 0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e07676";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "#331515";
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}

        {/* VIEW 4: Edit Profile */}
        {step === "edit_profile" && user && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <button
                type="button"
                onClick={() => setStep("profile_view")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#c9a84c",
                  fontSize: "0.75rem",
                  fontFamily: "'DM Mono', monospace",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                ← Volver al Perfil
              </button>
            </div>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.35rem",
                color: "#e0c876",
                marginBottom: "1.25rem",
              }}
            >
              Editar Datos Personales
            </h3>

            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div>
                <label
                  htmlFor={`${formId}-editName`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Apellidos y Nombres *
                </label>
                <input
                  id={`${formId}-editName`}
                  type="text"
                  className="form-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-editPhone`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Número de Celular *
                </label>
                <input
                  id={`${formId}-editPhone`}
                  type="tel"
                  className="form-input"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={`${formId}-editBirthDate`}
                  style={{
                    display: "block",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#c9a84c",
                    textTransform: "uppercase",
                    marginBottom: "0.35rem",
                  }}
                >
                  Fecha de Nacimiento *
                </label>
                <input
                  id={`${formId}-editBirthDate`}
                  type="date"
                  className="form-input"
                  value={editBirthDate}
                  onChange={(e) => setEditBirthDate(e.target.value)}
                  style={{ colorScheme: "dark" }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
                <button
                  type="button"
                  onClick={() => setStep("profile_view")}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "1px solid #282828",
                    color: "#a0a0a0",
                    padding: "0.75rem",
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.7rem",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-gold-solid"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    fontSize: "0.7rem",
                    textAlign: "center",
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
