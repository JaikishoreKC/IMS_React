import { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

function ErrorPopup({ message, onClose }) {
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className="fixed right-6 top-6 z-50 flex w-[calc(100%-3rem)] max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 shadow-xl">
      <AlertCircle size={22} className="mt-0.5 shrink-0 text-red-600" />

      <div className="flex-1">
        <p className="font-semibold text-red-800">Error</p>

        <div className="mt-1 text-sm text-red-700">{message}</div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="shrink-0 text-red-500 transition hover:text-red-700"
        aria-label="Close error"
      >
        <X size={18} />
      </button>
    </div>
  );
}

export default ErrorPopup;
