import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from '../actions/actionconstants';
export default (state, { type, payload }) => {
    switch (type) {
        case ADD_PRODUCT:
            return [
                ...state, payload
            ]
        case DELETE_PRODUCT:
            return state.filter((product) => {
                return product.product_id !== payload;
            })
        case EDIT_PRODUCT:
        default:
            return state.map(product => product.product_id === payload.product_id ?
                {
                    ...product,
                    image_url: payload.image_url,
                    product_name: payload.product_name,
                    product_price: payload.product_price
                } :
                product
            )
    }
}
