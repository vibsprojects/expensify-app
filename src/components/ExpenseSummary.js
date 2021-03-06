import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

const ExpenseSummary = ({expensesCount,expensesTotal}) => {
    const expenseWord = expensesCount > 1  ? 'expenses' : 'expense';
    const formattedExpensesTotal = numeral(expensesTotal/1000).format('$0,0.00');
    return (    
        <div className="page-header">    
            <div className="content-container">    
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
           </div>
        </div>
)};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
       expensesCount: visibleExpenses.length,
       expensesTotal: selectExpensesTotal(visibleExpenses)
    };
}

export default connect(mapStateToProps)(ExpenseSummary);
