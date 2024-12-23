import { useState } from "react";
import { Outlet } from "react-router";

import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

/**
 * Admin layout
 * @description This is the layout for the admin panel. It is a wrapper for the admin sidebar and the main content.
 */
const AdminLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex w-full min-h-screen">
      {/* admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-col flex-1">
        {/* admin header */}
        <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />

        <main className="flex flex-1 p-4 bg-muted/40 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
