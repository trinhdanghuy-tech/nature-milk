import { NavLink } from "react-router-dom";

type Props = {
  label: string;
  icon?: string;
  to: string;
};

export default function AdminNavItem({ label, icon, to }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer
        ${
          isActive
            ? "bg-green-100 text-green-700 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon && <span>{icon}</span>}
      {label}
    </NavLink>
  );
}
