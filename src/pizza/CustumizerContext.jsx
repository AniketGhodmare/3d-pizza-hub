import { createContext, useReducer } from 'react'
import onion from "/3donion.png"
import olives from "/olives.png"
import chilli from "/chilli.png"
import peas from "/peas.png"

export const PizzaContext = createContext();
export const sizes = [{ size: "S", scale: 1, price: 200 }, { size: "M", scale: 1.3, price: 250 }, { size: "L", scale: 1.6, price: 300 },]
export const ingredients = [{ name: "onion", image: onion, price: 20 }, { name: "olives", image: olives, price: 30 }, { name: "chilli", image: chilli, price: 15 }, { name: "peas", image: peas, price: 25 },]


const CustumizerContext = ({ children }) => {
    const initialState = {
        addedIngredients: [],
        isPacked: false,
        confirmOrder: false,
        selectedSize: sizes[0],
        spinTrigger: false,
    }
    const pizzaReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_SIZE":
                return { ...state, selectedSize: action.payload, spinTrigger: true }
            case "STOP_SPEEN":
                return { ...state, spinTrigger: false }
            case "CHANGE_INGREDIENTS":
                return {
                    ...state,
                    addedIngredients:
                        state.addedIngredients.includes(action.payload) ?
                            state.addedIngredients.filter(item => item != action.payload) :
                            [...state.addedIngredients, action.payload]
                }
            case "TOGGLE_PACKED":
                return { ...state, isPacked: !state.isPacked }
            case "CONFIRM_ORDER":
                return { ...state, confirmOrder: true }
            case "PACK_PIZZA":
                return {
                    ...state, isPacked: !state.isPacked,
                    addedIngredients: state.addedIngredients.filter(item => item != "wood_palate"),
                }
            case "RESET": return initialState

            default:
                return state
        }i
    }

    const [state, dispatch] = useReducer(pizzaReducer, initialState);
    return (
        <PizzaContext.Provider value={{ state, dispatch }}>
            {children}
        </PizzaContext.Provider>
    )
}

export default CustumizerContext
