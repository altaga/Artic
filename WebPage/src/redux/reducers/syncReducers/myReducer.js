import { COUNTER_DOWN, COUNTER_UP } from "../../actions/syncActions/myActions";

const default_state = {
    counter: 10,
    extra_data:"Hello World!"
}

export const my_counter = (state = default_state, action) => {
    switch (action.type) {
        case COUNTER_DOWN: {
            if(state.counter===0)
            {
                return {
                    ...state, // Keep all state and olny modify counter
                    counter: state.counter
                }
            }
            else{
                return {
                    ...state, // Keep all state and olny modify counter
                    counter: state.counter - action.payload
                }
            }
            
        }
        case COUNTER_UP: {
            if(state.counter===20)
            {
                return {
                    ...state, // Keep all state and olny modify counter
                    counter: state.counter
                }
            }
            else{
                return {
                    ...state, // Keep all state and olny modify counter
                    counter: state.counter + action.payload
                }
            }
        }
        default: return state;
    }
}