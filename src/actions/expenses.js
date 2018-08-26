import uuid from 'uuid';
import database from '../firebase/firebase';

// // ADD_EXPENSE
// export const addExpense = (
//     {
//       description = '',
//       note = '',
//       amount = 0,
//       createdAt = 0
//     } = {}
//   ) => ({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: uuid(),
//       description,
//       note,
//       amount,
//       createdAt
//     }
//   });

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});
  
  export const startAddExpense = (expenseData = {}) => { 
    return (dispatch,getState)=> { //this function gets called internally by redux with dispatch (gives access to dispatch to use inside)
       const uid = getState().auth.uid;
        const {
          description = '',
          note = '',
          amount = 0,
          createdAt = 0
        } = expenseData;
        const expense = { description,note,amount,createdAt };
        
        //this function runs, take all data, save data to firebase
        //and dispatch the action from up above
        //we dont need Id from uuid as firebase will generate id fo us.
        return database.ref(`user/${uid}/expenses`).push(expense).then((ref)=>{
            dispatch(addExpense({
                    id: ref.key,
                    ...expense                 
            }));
        });
    }
  }

  // REMOVE_EXPENSE
  export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
  });
  
  // EDIT_EXPENSE
  export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });

  export const setExpenses=(expenses)=>({
    type: 'SET_EXPENSES',
    expenses
  });

  export const startEditExpense=(id,updates)=>{
    return (dispatch, getState)=> {
      const uid = getState().auth.uid;
      return database.ref(`user/${uid}/expenses/${id}`)
                    .update(updates)
                    .then(()=> {
                        dispatch(editExpense(id,updates));
                    });

    };
  };

export const startSetExpenses =()=> {
  return (dispatch, getState)=>{
    const uid = getState().auth.uid;
    return database.ref(`user/${uid}/expenses`)
        .once('value')
        .then((snapshot)=>{
          const expenses=[];        
          snapshot.forEach((childSnapshot)=>{
              expenses.push({
                id:childSnapshot.key,
                ...childSnapshot.val()
          });
        }); 

        dispatch(setExpenses(expenses));
      });
  };
}

export const startRemoveExpense = ({ id }) => { 
  return (dispatch, getState)=> { //this function gets called internally by redux with dispatch (gives access to dispatch to use inside)
      const uid = getState().auth.uid;
      return database.ref(`user/${uid}/expenses/${id}`).remove().then(()=>{
          dispatch(removeExpense({id}));
      });
    };
};

  