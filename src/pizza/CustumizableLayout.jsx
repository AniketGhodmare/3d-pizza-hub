import { memo, useCallback, useContext, useMemo } from "react"
import pizzaBg from "/pizzaBg.png"
import PizzaMain from "./PizzaMain"
import ToggleSwitch from "./ToggleSwitch"
import { ingredients, PizzaContext, sizes } from "./CustumizerContext"
import SizeSelector from "./SizeSelector"
import BigButton from "./BigButton"
import IngredientButton from "./IngredientButton"
import { FaCartShopping } from "react-icons/fa6"
import { toast } from "react-toastify"

const CustumizableLayout = () => {
    const { state, dispatch } = useContext(PizzaContext)
    const { addedIngredients, isPacked, confirmOrder, selectedSize } = state

    const totalPrice = useMemo(() => {
        return selectedSize.price + ingredients.reduce((acc, item) => acc + (addedIngredients.includes(item.name) ? item.price : 0), 0);
    }, [selectedSize.price, ingredients, addedIngredients]);

    const ingredientCount = useMemo(() => {
        return addedIngredients.includes("wood_palate") ? addedIngredients.length - 1 : addedIngredients.length;
    }, [addedIngredients]);

    const handleSize = useCallback((item) => {
        if (isPacked) return toast.warn("Unpack your pizza, then choose your perfect size!")
        dispatch({ type: "CHANGE_SIZE", payload: item })
    }, [isPacked])

    const handleIngredient = useCallback((ingredient) => {
        if (isPacked) return toast.warn("Unpack your pizza, then add your floral touch!")
        dispatch({ type: "CHANGE_INGREDIENTS", payload: ingredient })
    }, [isPacked])

    const handlePack = useCallback(() => { dispatch({ type: "PACK_PIZZA" }); }, [])

    const handleConfirm = useCallback(() => {
        if (!isPacked) return toast.warn("Pack your pizza first, then place your order.")
        dispatch({ type: "CONFIRM_ORDER" })
    }, [isPacked])

    const orderAgain = useCallback(() => { dispatch({ type: "RESET" }) }, [])

    return (
        <div className="bg-[#855020] flex w-screen min-h-dvh pt-0.5 md:py-6 px-3 text-[#fbd197]"
            style={{ backgroundImage: `url(${pizzaBg})` }}
        >
            <div  className="flex flex-col w-full mx-auto justify-evenly max-w-7xl"
            // className="flex flex-col w-full h-full mx-auto max-w-7xl justify-evenly"
            >
                <div className="flex items-center justify-between mb-1 text-2xl font-bold text-white capitalize md:mb-8 md:text-4xl">
                    <p className=' drop-shadow-[0_1.2px_1px_#ffffff59]'>Custumize Your pizZa</p>
                    <FaCartShopping />
                </div>
                <div className="relative flex !w-full border-2 shadow-sm md:py-10 border-white rounded-2xl shadow-gray-400 justify-evenly max-md:flex-col max-md:pb-2">
                    <div className="flex-1 aspect-square md:aspect-auto md:max-w-[60%] md:min-h-[65vh] rounded-2xl relative overflow-hidden">
                        <PizzaMain orderConfirm={confirmOrder} />
                        {confirmOrder && <OrderAgain onClick={orderAgain} />}
                    </div>
                    <fieldset disabled={confirmOrder} className="flex flex-col justify-between gap-1.5 px-4 text-center md:gap-4 disabled:cursor-not-allowed rounded-2xl disabled:opacity-50">
                        <p className='text-3xl font-bold  drop-shadow-[0_1.2px_1px_#ffffff59]'>₹{totalPrice}</p>
                        <SizeSelector sizes={sizes} onSelect={handleSize} selectedSize={selectedSize} />
                        <div >
                            <p className="mb-0.5 md:mb-2 md:text-xl font-medium text-center drop-shadow-[0_1.2px_1px_#ffffff59]">Ingrediances added so far : {ingredientCount}</p>
                            <div className="flex items-center justify-center gap-4">
                                {ingredients?.map((item) =>
                                    <IngredientButton key={item.name} {...item}
                                        active={addedIngredients.includes(item.name)}
                                        onClick={() => handleIngredient(item.name)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 my-1.5">
                            <p className=" md:text-lg font-medium text-center drop-shadow-[0_1.2px_1px_#ffffff59]">Show wooden palate</p>
                            <ToggleSwitch
                                show={addedIngredients.includes("wood_palate")}
                                onClick={() => handleIngredient("wood_palate")}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <BigButton onClick={handlePack} >
                                {isPacked ? "unpack" : "pack"}  your Pizza
                            </BigButton>
                        </div>
                        <BigButton onClick={handleConfirm} >place order</BigButton>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}

export default CustumizableLayout

const OrderAgain = memo(({ className = '', onClick }) => {
    return (
        <div className={`absolute bottom-0 md:top-2 left-2 text-base md:text-2xl font-bold  flex flex-col text-white md:text-[#552e0d] select-none ${className}`}>
            <p >Your PizZa in travel Mode</p>
            <p>Eager to meet You!</p>
            <button onClick={onClick} className=" text-base mt-3 md:text-lg px-3  md:mt-3 py-0.5 text-white w-fit bg-[#e16207] rounded-full shadow-inner shadow-[#efbd6a]  animate-bounce" >Order Again</button>
        </div>
    )
})
