import ImgLogo from "../../assets/cart-icon.png";

/**
 * Logo component
 * @description This component renders a logo with a gradient background and a border color and size.
 */
const Logo = ({ borderColor, size, paddingSize, visible }) => {
  return (
    <img
      src={ImgLogo}
      alt="logo"
      className={`${visible} p-${paddingSize} border-2 border-${borderColor} rounded-full bg-gradient-to-tr from-slate-200 to-indigo-600`}
      width={size}
      height={size}
    />
  );
};

export default Logo;
