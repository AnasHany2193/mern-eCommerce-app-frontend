import { Loader2 } from "lucide-react";
import Logo from "./Logo";

/**
 * Loader component
 * @description This component is used to show a loading spinner while the page is loading or the data is being fetched.
 */
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative flex items-center justify-center w-36 h-36">
        {/* Spinner */}
        <Loader2 className="w-full h-full text-gray-500 rounded-full animate-spin" />

        {/* Text inside spinner */}
        <span className="absolute">
          <Logo borderColor="text-gray-500" size={100} paddingSize={4} />
        </span>
      </div>
    </div>
  );
};

export default Loader;
