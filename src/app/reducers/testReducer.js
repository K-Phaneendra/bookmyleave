const initialState = {
    abcd: ""
}

export default function testReducer(state = initialState, action) {
    var st = state;
    switch(action.type){
        case 'ErrorType.ERROR_LOG': {
            st = {
                ...state,
                message: action.message
            };
            break;
        }
        case "TESTING": {
            console.log(action.payload);
            st = { ...state, abcd: action.payload }
            break;
        }
        default: {
            return st;
        }
    }
    console.log('testReducer-AFTER:: '+action.type, st);
    return st;
}