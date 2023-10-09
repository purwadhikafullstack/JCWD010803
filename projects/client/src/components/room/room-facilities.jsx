import { FaScroll } from "react-icons/fa6";
import { FiWifi } from "react-icons/fi";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { TbSmokingNo } from "react-icons/tb";

export const RoomFacilities = () => {
    return (
        <div className='w-full mt-5 flex gap-10 '>
            <div className=' text-xl text-gray-500'>
                <div className='flex gap-2 items-center'>
                    <div> <FiWifi /> </div>
                    <div>Free Wifi</div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div> <GiForkKnifeSpoon /> </div>
                    <div>Free Breakfast</div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div> <TbSmokingNo /> </div>
                    <div>No Smoking</div>
                </div>
            </div>
            <div className=' text-xl text-gray-500'>
                <div className='flex gap-2 items-center'>
                    <div> <FaScroll /> </div>
                    <div>Non Refundable</div>
                </div>
                <div className='flex gap-2 items-center'>
                    <div> <FaScroll /> </div>
                    <div>Cannot reschedule</div>
                </div>
            </div>
        </div>
    )
}