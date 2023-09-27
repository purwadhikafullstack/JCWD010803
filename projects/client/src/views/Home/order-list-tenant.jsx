import { useState } from "react";
import Sidebar from "../../components/tenant/dashboard-tenant/side-bar"
import { OrderListComponent } from "../../components/content/order-list";
import { DetailOrderModal } from "../../components/modal/detail-order-modal";

export const OrderList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [orderId, setOrderId] = useState("")
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null)
    const [reload, setReload] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden">
            <DetailOrderModal setReload={setReload} reload={reload} data={data} setOpen={setOpen} orderId={orderId} open={open} />
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col p-5 flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <button
                    className="text-slate-500 hover:text-slate-600 lg:hidden"
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSidebarOpen(!sidebarOpen);
                    }}
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="16" height="2" />
                        <rect x="4" y="11" width="16" height="2" />
                        <rect x="4" y="17" width="16" height="2" />
                    </svg>
                </button>
                {/* Content area content */}
                <div> <OrderListComponent reload={reload} setOpen={setOpen} setDetail={setData} setOrderId={setOrderId} /> </div>
            </div>
        </div>
    )
}