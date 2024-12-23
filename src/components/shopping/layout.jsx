import { Outlet } from "react-router";
import ShoppingHeader from "./header";

/**
 * Shopping Layout component.
 * @description This component is used to render the shopping layout page.
 */
const ShoppingLayout = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common header */}
      <ShoppingHeader />

      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default ShoppingLayout;
