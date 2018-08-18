import  React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component
{
    onSubmit = (expense) =>{
        this.props.startAddExpense(expense);
        this.props.history.push('/');
    }
    render(){
        return (
            <div>
                <h1>Add expense</h1> 
                <ExpenseForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

// const AddExpensePage = (props) => {
//     return (
//         <div>
//             <h1>Add expense</h1> 
//             <ExpenseForm onSubmit={(expense)=>{
//                 props.onSubmit(expense);
//                 props.history.push('/');
//             }}/>
//         </div>
//     )
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onSubmit: (expense) => dispatch(addExpense(expense))
//     };
// }

const mapDispatchToProps = (dispatch) => ({
    startAddExpense: (expense) => dispatch(startAddExpense(expense))
});


export default connect(undefined,mapDispatchToProps)(AddExpensePage);  