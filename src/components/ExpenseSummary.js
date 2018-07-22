import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import totalExpenses from '../selectors/expenses-total';

const ExpenseSummary = (props) =>(    
    <div>    
      Viewing {props.expenses_count} expenses totalling {numeral(props.total_expenses_amount).format('$0,0.00')}
    </div>
);

const mapStateToProps = (state)=>{
    return {
       expenses_count: selectExpenses(state.expenses,state.filters).length,        
       total_expenses_amount: totalExpenses(state.expenses)        
    };
}

export default connect(mapStateToProps)(ExpenseSummary);
