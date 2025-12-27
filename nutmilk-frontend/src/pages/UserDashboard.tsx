import { useState } from "react";
import Sidebar from "../components/dashboard/SideBar";
import Overview from "../components/dashboard/OverView";
import Orders from "../components/dashboard/Orders";
import Favorites from "../components/dashboard/Favorites";

export default function UserDashboard() {
  const [tab, setTab] = useState<
    "overview" | "orders" | "favorites"
  >("overview");

  return (
    <div className="bg-[#f6faf7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* SIDEBAR */}
        <Sidebar tab={tab} setTab={setTab} />

        {/* CONTENT */}
        <div className="flex-1">
          {tab === "overview" && <Overview />}
          {tab === "orders" && <Orders />}
          {tab === "favorites" && <Favorites />}
        </div>
      </div>
    </div>
  );
}
