import { combineReducers } from "redux"
import {my_counter} from "./syncReducers/myReducer"
import search from "./asyncReducers/searchReducer";

const rootReducers = combineReducers({
    my_counter,
    search
})

export default rootReducers;