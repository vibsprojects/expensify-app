import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import totalExpenses from '../selectors/expenses-total';

const ExpenseSummary = (props) =>(    
    <div>    
      Viewing {props.expenses.length} expenses totalling {numeral(totalExpenses(props.expenses)/1000).format('$0.00')}
    </div>
);

const mapStateToProps = (state)=>{
    return {
       expenses : selectExpenses(state.expenses,state.filters)        
    };
}

export default connect(mapStateToProps)(ExpenseSummary);
