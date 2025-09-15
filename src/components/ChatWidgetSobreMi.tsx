export default function ChatWidgetSobreMi() {
  return (
    <button
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white text-3xl shadow-xl z-50 animate-pulse hover:scale-110 transition"
      onClick={() => alert('¡Hola! Esto abriría un chat o WhatsApp en un sitio real.')}
      aria-label="Abrir chat"
    >
      💬
    </button>
  );
} 