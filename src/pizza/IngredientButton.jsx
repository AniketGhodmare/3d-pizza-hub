import { memo } from 'react'

const IngredientButton = ({ onClick, active, name, image }) => {
    return (
        <button key={name} type="button" onClick={onClick}
            className={`w-12 md:w-16 overflow-hidden bg-orange-400 cursor-pointer rounded-full aspect-square border md:border-2 border-white shadow-md md:shadow-lg hover:border-2  md:hover:border-4 ${active ? " shadow-gray-300 border-2 md:border-4" : ""}`}
        >
            <img src={image} alt={name} className="object-cover w-full h-full" />
        </button>
    )
}
export default memo(IngredientButton)
