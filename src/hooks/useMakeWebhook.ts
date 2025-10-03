import { useState } from 'react';

interface UseMakeWebhookOptions {
  formType: 'newsletter' | 'contact' | 'spirit_idea' | 'vip_list';
  source?: string;
}

interface UseMakeWebhookReturn {
  submitToMake: (data: any) => Promise<boolean>;
  isSubmitting: boolean;
  submitMessage: string;
  submitStatus: 'idle' | 'success' | 'error';
  clearMessage: () => void;
}

export function useMakeWebhook({ formType, source }: UseMakeWebhookOptions): UseMakeWebhookReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const submitToMake = async (formData: any): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('idle');

    try {
      // Preparar datos para Make.com
      const makeData = {
        formType,
        source,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
        ...formData,
      };

      console.log('📤 Enviando a Make.com:', makeData);

      const response = await fetch('/api/debug-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(makeData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(getSuccessMessage(formType));
        return true;
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Error al enviar el formulario');
        return false;
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Error de conexión. Por favor, intenta nuevamente.');
      console.error('Error en useMakeWebhook:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearMessage = () => {
    setSubmitMessage('');
    setSubmitStatus('idle');
  };

  return {
    submitToMake,
    isSubmitting,
    submitMessage,
    submitStatus,
    clearMessage,
  };
}

function getSuccessMessage(formType: string): string {
  switch (formType) {
    case 'newsletter':
      return '¡Gracias! Te has suscrito exitosamente.';
    case 'contact':
      return '¡Gracias! Tu mensaje ha sido enviado. Te responderé pronto.';
    case 'spirit_idea':
      return '¡Excelente idea! Hemos recibido tu propuesta de Spirit.';
    case 'vip_list':
      return '¡Perfecto! Te has unido a la lista VIP. Te notificaremos cuando esté disponible.';
    default:
      return '¡Gracias! Hemos recibido tu información.';
  }
}
