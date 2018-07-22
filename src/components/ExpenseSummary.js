import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const ExpenseSummary = ({expensesCount,expensesTotal}) =>{
    const expenseWord = expensesCount > 1  ? 'expenses' : 'expense';
    const formattedExpensesTotal = numeral(expensesTotal/1000).format('$0,0.00');
    return (    
        <div>    
            Viewing {expensesCount} {expenseWord} totalling {formattedExpensesTotal}
        </div>
)};

const mapStateToProps = (state)=>{
    const visibleExpenses =selectExpenses(state.expenses,state.filters);
    return {
       expensesCount : visibleExpenses.length,
       expensesTotal : selectExpensesTotal(visibleExpenses)
    };
}

export default connect(mapStateToProps)(ExpenseSummary);
