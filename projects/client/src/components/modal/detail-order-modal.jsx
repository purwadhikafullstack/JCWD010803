export const DetailOrderModal = ({ open, setOpen, data, orderId }) => {
    console.log(data);

    const formatRupiah = (number) => {
        return number.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
        });
    }


    return (
        <div className={`z-50 fixed w-full h-screen ${open ? "flex" : "hidden"} justify-center items-center`}>
            <div className="w-full h-full bg-black opacity-60 relative"></div>
            <div className={`w-2/4 h-fit p-10 rounded-lg bg-white absolute shadow-lg`}>
                <div className=" w-full px-20 z-10 justify-end flex absolute">
                    <div onClick={() => setOpen(false)} className="text-2xl text-gray-700 hover:scale-95 cursor-pointer transition-all">X</div>
                </div>
                <div className="text-4xl text-bgPrimary relative">Detail Order</div>
                <div className=" w-full h-full flex">
                    <div className=" w-full h-full mt-10">
                        <div className=" text-3xl text-gray-700 font-semibold">Property</div>
                        <div className="mt-7">
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    Property name
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    {data ? data.room.property.propertyName : 'undefined'}
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    Room Name
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    {data ? data.room.roomName : "undefined"}
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    property location
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    {data ? data.room.property.category.category : "undefined"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pl-10 border-gray-300 border-x h-full mt-10">
                        <div className=" text-3xl text-gray-700 font-semibold">Payment</div>
                        <div className="mt-7">
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    Username
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    {data ? data.user.username : "undefined"}
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    Check In - Check Out
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    <div>
                                        {data ? new Date(new Date(data.checkIn).getTime() - 7 * 60 * 60 * 1000).toLocaleString() : "undefined"} -
                                    </div>
                                    <div>
                                        {data ? new Date(new Date(data.checkOut).getTime() - 7 * 60 * 60 * 1000).toLocaleString() : "undefined"}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    Total Price
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    {data ? formatRupiah(data.userTransaction.totalPayment) : "undefined"}
                                </div>
                            </div>
                            <div className="mb-5">
                                <div className="text-xl text-gray-600">
                                    Payment Methode
                                </div>
                                <div className=" text-gray-600 font-thin">
                                    Transfer {data ? data.userTransaction.paymentMethode.methode : "undefined"}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-gray-300 pl-10 mt-10">
                        <div className="w-full h-full">
                            <div className=" text-3xl w-full  text-gray-700 font-semibold">Invoice</div>
                            <div className="h-full">
                                <div className="p-2 h-3/4 mt-5 w-full border-dashed border-gray-300 rounded-lg border-2 ">
                                    {data.userTransaction.paymentImg !== null ?
                                        <img className="w-full max-h-full rounded" src={`http://localhost:8000/payment/${data.userTransaction.paymentImg}`} alt="" />
                                        :
                                        <div className=" w-full h-full flex text-center justify-center items-center text-gray-500">
                                             payment proof has not been attached.
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-10 justify-end mt-10">
                    {data ?
                        <>
                            {data.userTransaction.statusId === 4 || data.userTransaction.statusId === 5 ? (
                                <div className="font-thin text-gray-700" x>
                                    Order is canceled
                                </div>
                            ) : (
                                <div className="flex items-center gap-5">
                                    {data.userTransaction.statusId === 3 ? (
                                        <div className="p-1 flex justify-center  cursor-pointer transition-all hover:bg-red-700 bg-red-600 rounded-lg text-white font-thin px-2 items-center h-10">
                                            Cancel order
                                        </div>
                                    ) : (
                                        <div
                                            className={`p-1 flex cursor-pointer transition-all hover:bg-red-700 bg-red-600 rounded-lg text-white font-thin px-2 items-center h-10`}
                                        >
                                            Reject order
                                        </div>
                                    )}
                                    <div
                                        className={`${data.userTransaction.statusId === 3
                                            ? "hidden"
                                            : "block"
                                            } p-1 flex cursor-pointer transition-all hover:bg-green-700 bg-green-600 rounded-lg text-white font-thin px-2 items-center h-10`}
                                    >
                                        Confirm order
                                    </div>
                                </div>
                            )}
                        </>
                        :
                        "undefined"
                    }
                </div>
            </div>

        </div>
    )
}