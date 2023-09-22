import { useState } from "react";
import Sidebar from "../../components/tenant/dashboard-tenant/side-bar"
import { OrderListComponent } from "../../components/content/order-list";

export const OrderList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                {/* Content area content */}
                <div> <OrderListComponent /> </div>
            </div>
        </div>
    )
}