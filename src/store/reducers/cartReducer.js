import { ADD_TO_CART, INCREASE_PRODUCT_COUNT } from '../actions/actionconstants';
export default (state, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            return [
                ...state, payload
            ]
        case INCREASE_PRODUCT_COUNT:
            return state.map(item =>
                item.product_id === payload.id ? {
                    ...item,
                    product_qty: item.product_qty + payload.qtyAdded
                } : item
            )
        default:
            return state
    }
}
