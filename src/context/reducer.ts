const reducer = (state: any, action: { type: string, payload: any }): any => {
    console.log(action.type, action.payload)
    switch (action.type) {
        case 'IS_TIMER':
            return {
                ...state,
                isTimer: action.payload
            }
        case 'UPDATE_NETWORK':
            return {
                ...state,
                selectedCoin: action.payload
            }
        case 'ORDER_DETAILS':
            return {
                ...state,
                orderDetails: action.payload
            }
        case 'ORDER_ID':
            return {
                ...state,
                orderId: action.payload
            }
        case 'TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'ALL_CRYPTO':
            return {
                ...state,
                allCryptos: action.payload
            }
        default:
            return state
    }
}

export default reducer;