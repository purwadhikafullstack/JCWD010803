import { useState } from "react"

export const ProfileSettingSelectTop = ({ choose, value }) => {
  const [click, setClick] = useState("")

  const clickChangePassword = () => {
    setClick("changePassword")
    choose("changePassword")
  }
  return (
    <div className="w-full">
      <div className="flex justify-between w-full  bg-bgPrimary h-14">
        <div className={`
          pt-4
          p-2
          text-sm
					${click || value === "changePassword" ? "bg-bgPrimaryActive" : "bg-bgPrimary"}
          ${click || value === "changePassword" ? "text-white" : "text-white"}
          cursor-pointer		
					`}
          onClick={clickChangePassword}
        >
          Change password
        </div>
        <div className={
        "my-auto"}
        >
          Order history
        </div>
        <div className={
        "my-auto"}
        >
          Profile detail
        </div>
        
      </div>
    </div>
  )
}