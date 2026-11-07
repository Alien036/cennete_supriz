import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        textAlign: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "linear-gradient(135deg, #FAF5F0 0%, #FDF2EE 50%, #F7EFE8 100%)",
        color: "#2B2127",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.88)",
          padding: "2.25rem 1.75rem",
          borderRadius: "24px",
          maxWidth: "460px",
          width: "100%",
          boxShadow: "0 20px 50px rgba(74, 44, 53, 0.08)",
          border: "1px solid rgba(214, 116, 105, 0.22)",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌷</div>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
          Sayfa Bulunamadı
        </h1>
        <p style={{ color: "#6C5B65", marginBottom: "1.5rem", lineHeight: 1.5 }}>
          Aradığın sayfa taşınmış veya mevcut olmayabilir, Prenses.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #D67469 0%, #BF5C51 100%)",
            color: "#FFFFFF",
            padding: "0.85rem 1.65rem",
            borderRadius: "999px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Ana Sayfaya Dön ✨
        </Link>
      </div>
    </div>
  );
}

