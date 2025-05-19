"use client";
import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";

type UserType = "admin" | "partner" | "advertiser";

interface DashboardLayoutProps {
  userType: UserType;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userType,
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="flex h-screen bg-[#E5EFFA] overflow-hidden">
      {/* <aside className="m-5 z-[100]">
        <Sidebar userType={userType} />
      </aside> */}
      <aside
        className={`z-[100] lg:m-5 m-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
        } fixed lg:static`}
      >
        <Sidebar
          userType={userType}
          isMobileOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onMobileLinkClick={() => setIsSidebarOpen(false)}
        />
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#0000002d] bg-opacity-30 z-[99] lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      {/* Main Content pl-2 */}
      {/* <main className="flex-1 overflow-y-auto bg-[#E5EFFA] py-5 pr-5">
        <div>
          <Navbar toggleSidebar={toggleSidebar} />
        </div>
        {children}
      </main> */}
      <main className="flex-1 overflow-y-auto bg-[#E5EFFA] pr-5">
        {/* Fixed Navbar */}
        <div className="sticky top-5 right-2 z-50">
          <Navbar toggleSidebar={toggleSidebar} />
        </div>
        {/* left-20 */}
        {/* Offset for navbar height */}
        <div className="pt-5">{children}</div>
      </main>
    </div>
  );
};
export default DashboardLayout;
// className="bg-white rounded-xl border border-gray-300"
// "use client";
// import React, { useState } from "react";
// import Sidebar from "./sidebar/Sidebar";
// import Navbar from "./navbar/Navbar";

// type UserType = "admin" | "partner" | "advertiser";

// interface DashboardLayoutProps {
//   userType: UserType;
//   children: React.ReactNode;
// }

// const DashboardLayout: React.FC<DashboardLayoutProps> = ({
//   userType,
//   children,
// }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   return (
//     <div className="h-screen grid bg-[#E5EFFA] overflow-hidden">
//       {/* Fixed Sidebar */}
//       <aside
//         className={`fixed col-span-4 z-[100] lg:m-5 m-0 w-auto h-screen transition-transform duration-300 ease-in-out lg:translate-x-0 ${
//           isSidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-[120%] lg:translate-x-0"
//         }`}
//       >
//         <Sidebar
//           userType={userType}
//           isMobileOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//           onMobileLinkClick={() => setIsSidebarOpen(false)}
//         />
//       </aside>

//       {/* Mobile Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-[99] lg:hidden"
//           onClick={toggleSidebar}
//         />
//       )}

//       {/* Scrollable Main Content */}
//       <main className="h-full col-span-8 lg:ml-80 overflow-y-auto ">
//         <div className="p-5">
//           <Navbar toggleSidebar={toggleSidebar} />
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;
