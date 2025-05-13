// "use client";

// import React, { useEffect, useState, ReactNode } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: ReactNode;
//   size?: "sm" | "md" | "lg" | "xl";
//   showCloseIcon?: boolean;
// }

// const sizeClasses = {
//   sm: "max-w-sm px-1",
//   md: "max-w-md px-2",
//   lg: "max-w-2xl px-2",
//   xl: "max-w-4xl px-2",
// };

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   size = "md",
//   showCloseIcon = true,
// }) => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (isOpen) setShow(true);
//     else setTimeout(() => setShow(false), 300); // match transition duration
//   }, [isOpen]);

//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   if (!isOpen && !show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4 transition-opacity duration-300 overflow-y-scroll ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div
//         className={`relative w-full ${
//           sizeClasses[size]
//         } bg-white rounded-xl shadow-lg transition-all duration-300 transform ${
//           isOpen
//             ? "opacity-100 scale-100 translate-y-0"
//             : "opacity-0 scale-95 -translate-y-10"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b border-gray-300">
//           {title && <h2 className="text-lg font-semibold">{title}</h2>}
//           {showCloseIcon && (
//             <button
//               onClick={onClose}
//               type="button"
//               className="text-white hover:text-gray-50 text-2xl leading-none bg-red-500 p-1"
//               aria-label="Close modal"
//             >
//               &times;
//             </button>
//           )}
//         </div>
//         <div className="p-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

"use client";

import React, { useEffect, useState, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseIcon?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm px-1",
  md: "max-w-md px-2",
  lg: "max-w-2xl px-2",
  xl: "max-w-4xl px-2",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseIcon = true,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
    else setTimeout(() => setShow(false), 400); // match transition duration
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4 transition-opacity duration-400 ease-out ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`relative w-full ${
          sizeClasses[size]
        } bg-white rounded-xl shadow-lg transition-transform duration-400 ease-out max-h-[90vh] flex flex-col ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {showCloseIcon && (
            <button
              onClick={onClose}
              type="button"
              className="text-white hover:text-gray-50 text-2xl leading-none bg-red-500 p-1"
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>
        <div className="p-4 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

// "use client";

// import React, { useEffect, useState, ReactNode } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   title?: string;
//   children: ReactNode;
//   size?: "sm" | "md" | "lg" | "xl";
//   showCloseIcon?: boolean;
// }

// const sizeClasses = {
//   sm: "max-w-sm px-1",
//   md: "max-w-md px-2",
//   lg: "max-w-2xl px-2",
//   xl: "max-w-4xl px-2",
// };

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   title,
//   children,
//   size = "md",
//   showCloseIcon = true,
// }) => {
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     if (isOpen) setShow(true);
//     else setTimeout(() => setShow(false), 300); // match transition duration
//   }, [isOpen]);

//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   if (!isOpen && !show) return null;

//   return (
//     <div
//       className={`fixed inset-0 z-[110] flex items-center justify-center bg-black/50 px-4 transition-opacity duration-300 ${
//         isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div
//         className={`relative w-full ${
//           sizeClasses[size]
//         } bg-white rounded-xl shadow-lg transition-all duration-300 transform max-h-[90vh] flex flex-col ${
//           isOpen
//             ? "opacity-100 scale-100 translate-y-0"
//             : "opacity-0 scale-95 -translate-y-10"
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b border-gray-300">
//           {title && <h2 className="text-lg font-semibold">{title}</h2>}
//           {showCloseIcon && (
//             <button
//               onClick={onClose}
//               type="button"
//               className="text-white hover:text-gray-50 text-2xl leading-none bg-red-500 p-1"
//               aria-label="Close modal"
//             >
//               ×
//             </button>
//           )}
//         </div>
//         <div className="p-4 overflow-y-auto flex-1">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
