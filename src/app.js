import  React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import { startSetExpenses } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import  getVisibleExpenses from './selectors/expenses';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import  AppRouter,{ history } from './routers/AppRouter';
import { firebase } from './firebase/firebase';
// import '../src/playground/promises';

const store = configureStore();

//  const expenseOne = store.dispatch(addExpense({ description: 'Water Bill', amount: 1000}));
//  const expenseTwo = store.dispatch(addExpense({ description: 'Gas Bill',createdAt : 2000}));
//  const expenseThree = store.dispatch(addExpense({ description: 'Rent Bill', amount: 1000.25}));
//  const expenseFour = store.dispatch(addExpense({ description: 'Rent Bill', amount: 2000.25}));

//store.dispatch(setTextFilter('Water'));
// setTimeout(()=>{
//     store.dispatch(setTextFilter('bill'));
// },3000)

//console.log(store.getState());
// const state = store.getState();
// const visibleExpenses=getVisibleExpenses(state.expenses,state.filters);
// console.log(visibleExpenses);

//console.log('test');

const jsx=(
    <Provider store={store}>
        <AppRouter />    
    </Provider>
);

ReactDOM.render(<p>Loading...</p>,document.getElementById('app'));

let hasRendered=false;
const renderApp = () =>{
    if(!hasRendered)
    {
        ReactDOM.render(jsx,document.getElementById('app'));
        hasRendered=true;
    }
};

firebase.auth().onAuthStateChanged((user)=>{
    if(user)
    {
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();    
            if(history.location.pathname === '/'){
                history.push('/dashboard');
            }
        });       
        console.log('log in');

    } else {
        renderApp();    
        console.log('log out');
        history.push('/');
    }
});

