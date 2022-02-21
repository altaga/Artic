export const COUNTER_DOWN = "COUNTER_DOWN"
export const COUNTER_UP = "COUNTER_UP"

export const counter_down_action = (cant) => {
    return {
        type: "COUNTER_DOWN",
        payload: cant
    }
}

export const counter_up_action = (cant) => {
    return {
        type: "COUNTER_UP",
        payload: cant
    }
}
