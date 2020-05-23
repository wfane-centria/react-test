
const initialState = {isLoading: true};
const countryReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'COUNTRY_LIST':
            return {
                ...state,
                data:action.data
            }

            default:
                return {
                    ...state
                }   
    }
}

export default countryReducer;