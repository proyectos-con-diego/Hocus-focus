// Configuración de Google Tag Manager
export const GTM_ID = 'GTM-NTKQH252';

// Función para enviar eventos a GTM
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_location: url,
      page_title: document.title,
    });
  }
};

// Función para enviar eventos personalizados
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: action,
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Función para enviar eventos personalizados a GTM
export const gtmEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Tipos para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
