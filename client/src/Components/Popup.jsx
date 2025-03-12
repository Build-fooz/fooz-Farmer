import { useEffect } from 'react';

function Popup({
  show,
  onHide,
  title = '',
  bodyText = '',
  showCloseButton = true,
  showSaveButton = false,
  closeButtonText = 'Close',
  saveButtonText = 'Save Changes',
  onClose,
  onSave,
}) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Box */}
      <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Title */}
        {title && (
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose || onHide}
            >
              ✕
            </button>
          </div>
        )}

        {/* Body */}
        {bodyText && <div className="mb-4">{bodyText}</div>}

        {/* Footer */}
        <div className="flex justify-end space-x-2">
          {showCloseButton && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded border-2 border-red-700 shadow-sm"
              onClick={onClose || onHide}
            >
              {closeButtonText}
            </button>
          )}
          {showSaveButton && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded border-2 border-blue-700 shadow-sm"
              onClick={onSave}
            >
              {saveButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;
