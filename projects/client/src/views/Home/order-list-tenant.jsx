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
            <DetailOrderModal setReload={setReload} reload={reload} data={data} setOpen={setOpen} orderId={orderId} open={open}  />
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                {/* Content area content */}
                <div> <OrderListComponent reload={reload} setOpen={setOpen} setDetail={setData} setOrderId={setOrderId} /> </div>
            </div>
        </div>
    )
}