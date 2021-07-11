function counterReducer(state= 0, action){

    switch(action.type) {
        case 'INCREMENT':
            localStorage.setItem("counter", state + action.payload)
            return Number(state) + Number(action.payload)
        case 'DECREMENT':
            return state - 1
        default:
            return state;
    }
}

function loggedReducer(state= false, action){

    switch(action.type) {
        case 'SIGN_IN':
            return !state;
        default:
            return state;
    }
}

let lastId = 0;
function bugReducer(state= [], action){

    switch(action.type) {
        case 'bugAdded':
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ]
        case 'bugRemoved':
            return state.filter(bug => bug.id != action.payload.id);
        case 'bugResolved':
                return state.map(bug => bug.id != action.payload.id ? bug : {
                    ...bug, resolved: true
                });
        default:
            return state;
    }
}


export {counterReducer, loggedReducer, bugReducer} 
