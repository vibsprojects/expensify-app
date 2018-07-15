import  React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import  getVisibleExpenses from './selectors/expenses';
 import './styles/styles.scss';
import AppRouter from './routers/AppRouter';

const store = configureStore();

// const expenseOne = store.dispatch(addExpense({ description: 'Water Bill', amount: 2100}));
// const expenseTwo = store.dispatch(addExpense({ description: 'Gas Bill',createdAt : 1000}));
// const expenseThree = store.dispatch(addExpense({ description: 'Rent Bill', amount: 109500}));

//store.dispatch(setTextFilter('Water'));
// setTimeout(()=>{
//     store.dispatch(setTextFilter('bill'));
// },3000)

//console.log(store.getState());
// const state = store.getState();
// const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
// console.log(visibleExpenses);

console.log('test');

const jsx=(
    <Provider store={store}>
        <AppRouter />    
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('app'));

