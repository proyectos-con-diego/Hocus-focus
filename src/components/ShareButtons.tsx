"use client";
import React, { useEffect, useState } from "react";

const icons = {
  whatsapp: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#25D366" d="M12 2.04A9.96 9.96 0 0 0 2.04 12c0 1.76.46 3.47 1.33 4.97L2 22l5.13-1.34A9.96 9.96 0 1 0 12 2.04Zm0 18.1c-1.6 0-3.17-.42-4.53-1.22l-.32-.19-3.04.8.81-2.97-.21-.33A8.1 8.1 0 1 1 20.1 12c0 4.47-3.63 8.1-8.1 8.1Zm4.44-6.13c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-0.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.28-.22.22-.84.82-.84 2 0 1.18.86 2.32 2.02 3.16 1.16.84 2.3 1.1 3.14 1.1.64 0 1.16-.1 1.6-.2.48-.12.74-.48.84-.68.1-.2.1-.38.08-.42-.02-.04-.22-.12-.46-.24Z"/></svg>
  ),
  x: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M17.53 3H21.5l-7.06 8.06L22.5 21h-6.98l-5.47-6.23L3.5 21H2.5l7.56-8.64L1.5 3h7.07l5.02 5.72L17.53 3Zm-1.23 16h2.02l-6.44-7.33-2.3 2.64L16.3 19Zm-9.8-1.01l6.44-7.33-2.18-2.48-6.26 7.18 2 2.63Zm2.13-13.01H5.08l6.44 7.33 2.18-2.48L8.63 4.99Z"/></svg>
  ),
  facebook: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#1877F3" d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
  ),
  linkedin: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.37-1.849 3.602 0 4.267 2.369 4.267 5.455v6.285ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124Zm1.777 13.019H3.56V9h3.554v11.452ZM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0Z"/></svg>
  ),
  link: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M17.657 6.343a6 6 0 0 0-8.486 0l-4.242 4.242a6 6 0 0 0 8.486 8.486l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a4 4 0 1 1-5.656-5.656l4.242-4.242a4 4 0 0 1 5.656 5.656l-.586.586a1 1 0 1 0 1.414 1.414l.586-.586a6 6 0 0 0 0-8.486Z"/></svg>
  ),
};

function getShareUrl(network: string, url: string, title: string) {
  switch (network) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    case "x":
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    case "linkedin":
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    default:
      return url;
  }
}

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert("¡Enlace copiado!");
    }
  };

  if (!url) return null;

  return (
    <div className="my-12">
      <div className="text-sm text-gray-400 mb-3 font-semibold tracking-wide uppercase">Compartir este artículo</div>
      <div className="flex flex-wrap gap-3">
        <a
          href={getShareUrl("whatsapp", url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 p-3 transition-colors"
          title="Compartir en WhatsApp"
        >
          {icons.whatsapp}
        </a>
        <a
          href={getShareUrl("x", url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white/10 hover:bg-white/20 p-3 transition-colors"
          title="Compartir en X"
        >
          {icons.x}
        </a>
        <a
          href={getShareUrl("facebook", url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#1877F3]/10 hover:bg-[#1877F3]/20 p-3 transition-colors"
          title="Compartir en Facebook"
        >
          {icons.facebook}
        </a>
        <a
          href={getShareUrl("linkedin", url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 p-3 transition-colors"
          title="Compartir en LinkedIn"
        >
          {icons.linkedin}
        </a>
        <button
          onClick={handleCopy}
          className="rounded-full bg-white/10 hover:bg-white/20 p-3 transition-colors"
          title="Copiar enlace"
        >
          {icons.link}
        </button>
      </div>
    </div>
  );
} 