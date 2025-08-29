import { memo } from "react"
const BigButton = ({ children, onClick }) => {
    return (
        <button type="button" onClick={onClick}
            className="bottom-0 px-2 py-0.5 md:px-4 md:py-2 text-lg md:text-2xl  font-semibold text-white capitalize bg-[#e16207] rounded-full shadow-inner inset-2 border-2 cursor-pointer border-[#e16207] shadow-[#efbd6a] hover:text-white hover:border-[#efbd6a] w-full"
        >
            {children}
        </button>
    )
}

export default memo(BigButton)
