import { addExpense, editExpense, removeExpense} from '../../actions/expenses';

test('should setup remove expense action object',() => {
    const action = removeExpense({ id:'123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id:'123abc'
    });
});

test('should setup edit expsense action object',() => {
    const action = editExpense('123abc', { note:'this is test'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id:'123abc',
        updates:{ note:'this is test'}
    });
});

test('should setup add expsense action object with provided values',()=>{
    const expenseData={      
        description:'Rent',
        note:'This is test',
        amount:'101',
        createdAt:'1000'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
    });
});

test('should setup add expsense action object with default values',()=>{    
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          description:'',
          note:'',
          amount:0,
          createdAt:0
        }        
    });
});