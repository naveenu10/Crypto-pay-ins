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
        default:
            return state
    }
}

export default reducer;