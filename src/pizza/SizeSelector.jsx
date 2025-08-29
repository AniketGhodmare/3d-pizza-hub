import { memo } from "react"

const SizeSelector = memo(({ sizes, selectedSize, onSelect }) => {
    return (
        <div className="flex items-center justify-center gap-5">
            {sizes.map((item) =>
                <button key={item.size} type="button"
                    className={`flex justify-center items-center cursor-pointer text-lg md:text-3xl font-bold rounded-full w-9  md:w-16 aspect-square bg-[#eccba0] shadow-inner shadow-white hover:border-4 hover:border-white ${selectedSize.size === item.size ? " border-4 border-white text-[#e16207]" : "text-[#552e0d]"}`}
                    onClick={() => onSelect(item)}
                >{item.size}</button>
            )}
        </div>
    )
})

export default SizeSelector
