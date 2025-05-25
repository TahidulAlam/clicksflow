/* eslint-disable react/display-name */
import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface DropdownItem {
  labelHeader?: ReactNode;
  labelHeaderClass?: string;
  label?: ReactNode;
  labelClass?: string;
  content?: ReactNode;
  onClick?: () => void;
  children?: DropdownItem[];
}

interface MultiLevelDropdownProps {
  label?: ReactNode;
  labelHeader?: string;
  labelHeaderClass?: string;
  labelClass?: string;
  menuItems: DropdownItem[];
  position?:
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "top-left"
    | "top-right"
    | "top-center";
  submenuPosition?: "left" | "right";
}

const MAIN_POSITION_CLASSES: Record<string, string> = {
  "bottom-left": "top-full left-0",
  "bottom-right": "top-full right-0",
  "bottom-center": "top-full left-1/2 -translate-x-1/2",
  "top-left": "bottom-full left-0",
  "top-right": "bottom-full right-0",
  "top-center": "bottom-full left-1/2 -translate-x-1/2",
};

const SUBMENU_POSITION_CLASSES: Record<string, string> = {
  right: "left-full top-0",
  left: "right-full top-0",
};

const DROPDOWN_CLASSES = {
  menu: "absolute z-50 bg-white border border-gray-300 rounded-md",
  item: "w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-gray-100",
  header:
    "px-4 pt-2 pb-1 text-sm font-semibold text-gray-700 border-b border-gray-200",
};

const DropdownItemComponent = React.memo(
  ({
    item,
    submenuPosition,
    depth,
    index,
    openPath,
    setOpenPath,
    closeAllMenus,
  }: {
    item: DropdownItem;
    submenuPosition: "left" | "right";
    depth: number;
    index: number;
    openPath: number[];
    setOpenPath: React.Dispatch<React.SetStateAction<number[]>>;
    closeAllMenus: () => void;
  }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isOpen = openPath[depth] === index;

    const handleMouseEnter = useCallback(() => {
      if (item.children) {
        setOpenPath((prev) => [...prev.slice(0, depth), index]);
      }
    }, [item.children, setOpenPath, depth, index]);

    return (
      <React.Fragment>
        {item.labelHeader && (
          <div
            className={`${DROPDOWN_CLASSES.header} ${
              item.labelHeaderClass || ""
            }`}
          >
            {item.labelHeader}
          </div>
        )}
        <div ref={ref} className="relative" onMouseEnter={handleMouseEnter}>
          <button
            type="button"
            className={`${DROPDOWN_CLASSES.item} ${item.labelClass || ""}`}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick?.();
              closeAllMenus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (item.children) {
                  setOpenPath((prev) => [...prev.slice(0, depth), index]);
                } else {
                  item.onClick?.();
                  closeAllMenus();
                }
              } else if (e.key === "ArrowRight" && item.children) {
                setOpenPath((prev) => [...prev.slice(0, depth), index]);
              } else if (e.key === "Escape") {
                closeAllMenus();
              }
            }}
            role="menuitem"
            aria-haspopup={!!item.children}
            aria-expanded={isOpen}
          >
            <span className="text-nowrap">{item.label}</span>
            {item.children && <span className="ml-2">{">"}</span>}
          </button>
          {item.content && (
            <div className="px-4 pb-2 text-sm text-gray-600">
              {item.content}
            </div>
          )}
          {item.children && isOpen && (
            <div
              className={`${DROPDOWN_CLASSES.menu} transition-all duration-200 ease-in-out ${SUBMENU_POSITION_CLASSES[submenuPosition]}`}
            >
              {item.children.map((child, idx) => (
                <DropdownItemComponent
                  key={idx}
                  item={child}
                  submenuPosition={submenuPosition}
                  depth={depth + 1}
                  index={idx}
                  openPath={openPath}
                  setOpenPath={setOpenPath}
                  closeAllMenus={closeAllMenus}
                />
              ))}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
);

const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = ({
  label,
  labelHeader,
  labelHeaderClass,
  labelClass,
  menuItems,
  position = "bottom-left",
  submenuPosition = "right",
}) => {
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setOpenPath([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllMenus = useCallback(() => {
    setOpen(false);
    setOpenPath([]);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-lg font-medium text-gray-700 text-nowrap rounded-md hover:bg-gray-50 ${
          labelClass || ""
        }`}
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <div
          className={`${
            DROPDOWN_CLASSES.menu
          } mt-2 min-w-[12rem] transition-all duration-200 ease-in-out ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          } ${MAIN_POSITION_CLASSES[position]}`}
        >
          {labelHeader && (
            <div
              className={`${DROPDOWN_CLASSES.header} ${labelHeaderClass || ""}`}
            >
              {labelHeader}
            </div>
          )}
          {menuItems.map((item, idx) => (
            <DropdownItemComponent
              key={idx}
              item={item}
              submenuPosition={submenuPosition}
              depth={0}
              index={idx}
              openPath={openPath}
              setOpenPath={setOpenPath}
              closeAllMenus={closeAllMenus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiLevelDropdown;

// import React, {
//   useState,
//   useRef,
//   useEffect,
//   ReactNode,
//   useCallback,
// } from "react";

// interface DropdownItem {
//   labelHeader?: ReactNode;
//   labelHeaderClass?: string;
//   label: ReactNode;
//   labelClass?: string;
//   content?: ReactNode;
//   onClick?: () => void;
//   children?: DropdownItem[];
// }

// interface MultiLevelDropdownProps {
//   label: ReactNode;
//   labelHeader?: string;
//   labelHeaderClass?: string;
//   labelClass?: string;
//   menuItems: DropdownItem[];
//   position?:
//     | "bottom-left"
//     | "bottom-right"
//     | "bottom-center"
//     | "top-left"
//     | "top-right"
//     | "top-center";
//   submenuPosition?: "left" | "right";
// }

// const MAIN_POSITION_CLASSES: Record<string, string> = {
//   "bottom-left": "top-full left-0 translate-y-1",
//   "bottom-right": "top-full right-0 translate-y-1",
//   "bottom-center": "top-full left-1/2 -translate-x-1/2 translate-y-1",
//   "top-left": "bottom-full left-0 -translate-y-1",
//   "top-right": "bottom-full right-0 -translate-y-1",
//   "top-center": "bottom-full left-1/2 -translate-x-1/2 -translate-y-1",
// };

// const SUBMENU_POSITION_CLASSES: Record<string, string> = {
//   right: "left-full top-0 translate-x-1",
//   left: "right-full top-0 -translate-x-1",
// };

// /** Common Tailwind classes for dropdown elements */
// const DROPDOWN_CLASSES = {
//   menu: "absolute z-50 bg-white border border-gray-300 rounded-md shadow-lg",
//   item: "w-full text-left px-4 py-2 text-sm flex justify-between items-center hover:bg-gray-100 focus:bg-gray-100",
//   header:
//     "px-4 pt-2 pb-1 text-sm font-semibold text-gray-700 border-b border-gray-200",
// };

// const calculateDynamicPosition = (
//   triggerRef: React.RefObject<HTMLDivElement | HTMLButtonElement | null>,
//   menuRef: React.RefObject<HTMLDivElement | null>,
//   defaultPosition: string,
//   isSubmenu: boolean,
//   submenuDefault: "left" | "right" = "right"
// ): string => {
//   if (!triggerRef.current || !menuRef.current) {
//     return isSubmenu
//       ? SUBMENU_POSITION_CLASSES[submenuDefault]
//       : MAIN_POSITION_CLASSES[defaultPosition] ||
//           MAIN_POSITION_CLASSES["bottom-left"];
//   }

//   const triggerRect = triggerRef.current.getBoundingClientRect();
//   const menuRect = menuRef.current.getBoundingClientRect();
//   const { innerHeight: viewportHeight } = window;

//   if (isSubmenu) {
//     const { innerWidth: viewportWidth } = window;
//     const fitsRight = triggerRect.right + menuRect.width <= viewportWidth;
//     const fitsLeft = triggerRect.left - menuRect.width >= 0;
//     return SUBMENU_POSITION_CLASSES[
//       fitsRight ? "right" : fitsLeft ? "left" : submenuDefault
//     ];
//   }

//   const isBottomDefault = defaultPosition.includes("bottom");
//   const fitsBottom = triggerRect.bottom + menuRect.height <= viewportHeight;
//   const fitsTop = triggerRect.top - menuRect.height >= 0;
//   const vertical =
//     isBottomDefault && fitsBottom ? "bottom" : fitsTop ? "top" : "bottom";
//   const horizontal = defaultPosition.split("-")[1] || "left";

//   return (
//     MAIN_POSITION_CLASSES[`${vertical}-${horizontal}`] ||
//     MAIN_POSITION_CLASSES[defaultPosition]
//   );
// };

// /** Memoized component for rendering individual dropdown items */
// const DropdownItemComponent = React.memo(
//   ({
//     item,
//     submenuPosition,
//     depth,
//     index,
//     openPath,
//     setOpenPath,
//     closeAllMenus,
//   }: {
//     item: DropdownItem;
//     submenuPosition: "left" | "right";
//     depth: number;
//     index: number;
//     openPath: number[];
//     setOpenPath: React.Dispatch<React.SetStateAction<number[]>>;
//     closeAllMenus: () => void;
//   }) => {
//     const ref = useRef<HTMLDivElement>(null);
//     const menuRef = useRef<HTMLDivElement>(null);
//     const isOpen = openPath[depth] === index;
//     const [dynamicPosition, setDynamicPosition] = useState(
//       SUBMENU_POSITION_CLASSES[submenuPosition]
//     );

//     useEffect(() => {
//       if (isOpen && ref.current && menuRef.current) {
//         setDynamicPosition(
//           calculateDynamicPosition(ref, menuRef, "", true, submenuPosition)
//         );
//       }
//     }, [isOpen, submenuPosition]);

//     const handleOpenSubmenu = useCallback(() => {
//       if (item.children) {
//         setOpenPath((prev) => [...prev.slice(0, depth), index]);
//       }
//     }, [item.children, setOpenPath, depth, index]);

//     const handleKeyDown = useCallback(
//       (e: React.KeyboardEvent) => {
//         if (e.key === "Enter" || e.key === " ") {
//           e.preventDefault();
//           if (item.children) handleOpenSubmenu();
//           else {
//             item.onClick?.();
//             closeAllMenus();
//           }
//         } else if (e.key === "ArrowRight" && item.children) {
//           handleOpenSubmenu();
//         } else if (e.key === "Escape") {
//           closeAllMenus();
//         }
//       },
//       [item, handleOpenSubmenu, closeAllMenus]
//     );

//     return (
//       <>
//         {item.labelHeader && (
//           <div
//             className={`${DROPDOWN_CLASSES.header} ${
//               item.labelHeaderClass || ""
//             }`}
//           >
//             {item.labelHeader}
//           </div>
//         )}
//         <div ref={ref} className="relative">
//           <button
//             type="button"
//             className={`${DROPDOWN_CLASSES.item} ${item.labelClass || ""}`}
//             onClick={(e) => {
//               e.stopPropagation();
//               if (!item.children) {
//                 item.onClick?.();
//                 closeAllMenus();
//               } else handleOpenSubmenu();
//             }}
//             onMouseEnter={handleOpenSubmenu}
//             onKeyDown={handleKeyDown}
//             role="menuitem"
//             aria-haspopup={!!item.children}
//             aria-expanded={isOpen}
//           >
//             <span className="text-nowrap">{item.label}</span>
//             {item.children && <span className="ml-2"></span>}
//           </button>
//           {item.content && (
//             <div className="px-4 pb-2 text-sm text-gray-600">
//               {item.content}
//             </div>
//           )}
//           {item.children && isOpen && (
//             <div
//               ref={menuRef}
//               className={`${DROPDOWN_CLASSES.menu} transition-all duration-200 ease-in-out ${dynamicPosition}`}
//             >
//               {item.children.map((child, idx) => (
//                 <DropdownItemComponent
//                   key={idx}
//                   item={child}
//                   submenuPosition={submenuPosition}
//                   depth={depth + 1}
//                   index={idx}
//                   openPath={openPath}
//                   setOpenPath={setOpenPath}
//                   closeAllMenus={closeAllMenus}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </>
//     );
//   }
// );

// /** Main dropdown component */
// const MultiLevelDropdown: React.FC<MultiLevelDropdownProps> = ({
//   label,
//   labelHeader,
//   labelHeaderClass,
//   labelClass,
//   menuItems,
//   position = "bottom-left",
//   submenuPosition = "right",
// }) => {
//   const [open, setOpen] = useState(false);
//   const [openPath, setOpenPath] = useState<number[]>([]);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLButtonElement>(null);
//   const [dynamicPosition, setDynamicPosition] = useState(
//     MAIN_POSITION_CLASSES[position]
//   );

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//         setOpenPath([]);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (open && triggerRef.current && menuRef.current) {
//       setDynamicPosition(
//         calculateDynamicPosition(triggerRef, menuRef, position, false)
//       );
//     }
//   }, [open, position]);

//   const closeAllMenus = useCallback(() => {
//     setOpen(false);
//     setOpenPath([]);
//   }, []);

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <button
//         ref={triggerRef}
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         className={`inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-white text-lg font-medium text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
//           labelClass || ""
//         }`}
//         role="button"
//         aria-haspopup="true"
//         aria-expanded={open}
//       >
//         {label}
//       </button>
//       {open && (
//         <div
//           ref={menuRef}
//           className={`${
//             DROPDOWN_CLASSES.menu
//           } mt-2 min-w-[12rem] transition-all duration-200 ease-in-out ${
//             open ? "opacity-100 visible" : "opacity-0 invisible"
//           } ${dynamicPosition}`}
//         >
//           {labelHeader && (
//             <div
//               className={`${DROPDOWN_CLASSES.header} ${labelHeaderClass || ""}`}
//             >
//               {labelHeader}
//             </div>
//           )}
//           {menuItems.map((item, idx) => (
//             <DropdownItemComponent
//               key={idx}
//               item={item}
//               submenuPosition={submenuPosition}
//               depth={0}
//               index={idx}
//               openPath={openPath}
//               setOpenPath={setOpenPath}
//               closeAllMenus={closeAllMenus}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiLevelDropdown;
