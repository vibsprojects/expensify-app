import { createStore } from 'redux';


const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy    
});

const decrementCount = ({decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET'  
});

const setCount = ({ setValue = 19 } = {}) => ({
    type: 'SET',
    setValue
});

const countReducer = (state = { count: 0 }, action)=> {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };   
        case 'SET':
        return {
            count: action.setValue
        };  
        case 'RESET':
            return {
                count: 0
            };                  
        default:
            return state;
    }    
}

const store = createStore(countReducer);

// console.log(store.getState());


store.dispatch(incrementCount({ incrementBy: 6 }));

store.dispatch(incrementCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 3 }));

store.dispatch(resetCount());

store.dispatch(setCount());


// store.dispatch(reset({resetValue:0}));

// store.dispatch(set({setvalue:5}));

// store.dispatch({
//     type:'INCREMENT'
// });

// store.dispatch({
//     type:'RESET'
// });

// store.dispatch({
//     type:'DECREMENT'
// });

console.log(store.getState());
