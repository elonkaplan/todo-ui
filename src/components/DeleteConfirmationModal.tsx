import React, { FC, useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      }}
    >
      <div
        className={`bg-background4 rounded-lg shadow-lg w-96 max-w-[calc(100%-24px)] p-6 transform transition-transform duration-300 ${
          isAnimating ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <h2 className="text-lg font-semibold">Delete Task</h2>
        <p className="mt-2 text-text2">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            className="px-4 py-2 bg-background3  rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onConfirm();
            }}
            className="px-4 py-2 bg-error  rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
