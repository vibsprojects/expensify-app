import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, 
        addExpense, 
        editExpense,
        removeExpense,
        setExpenses,
        startSetExpenses,
        startRemoveExpense,
        startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

let originalTimeout;
beforeEach(()=>{
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 35000;

  const expensesData = {};
  expenses.forEach(({ id,description,note,amount,createdAt })=>{
      expensesData[id]={ description,note,amount,createdAt };
  });
  database.ref(`user/${uid}/expenses`).set(expensesData);

});

afterEach(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

//--------------
test('should remove expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({id})).then(()=>{      
      const actions = store.getActions();
      expect(actions[0]).toEqual({
          type:'REMOVE_EXPENSE',
          id 
      });
   
    return database.ref(`user/${uid}/expenses/${id}`).once('value');
            }).then((snapshot) => {
              expect(snapshot.val()).toBeFalsy();
              done();
            });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should edit expense from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[0].id;
  const updates = { amount:220,note: 'edit expense from firebase' }
  store.dispatch(startEditExpense(id,updates)).then(()=>{      
      const actions = store.getActions();
      expect(actions[0]).toEqual({ //checked action dispatched correctly
          type:'EDIT_EXPENSE',
          id,
          updates
      });
   
    return database.ref(`user/${uid}/expenses/${id}`).once('value'); //check data is updates correctly
            }).then((snapshot) => {
              expect(snapshot.val().note).toEqual(updates.note);
              expect(snapshot.val().amount).toBe(updates.amount);
              done();
            });
});


test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});


test('should add expense to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`user/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);

  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    console.log(uid);
    return database.ref(`user/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});


test('should set up expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses: expenses
    });
});

test('Should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(()=>{
      const actions = store.getActions();
      expect(actions[0]).toEqual({
          type:'SET_EXPENSES',
          expenses //as we are seeding data in beforeEach so no need to do anything, we will get that data back here
      });
      done();
    })
});


// test('should add expense to database and store', (done) => {
//   const store = createMockStore({});
//   const expenseData = {
//     description: 'Mouse',
//     amount: 3000,
//     note: 'This one is better',
//     createdAt: 1000
//   };

//   store.dispatch(startAddExpense(expenseData)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//         type:'ADD_EXPENSE',
//         expense:{
//             id: expect.any(String),
//             ...expenseData
//         }
//     });

//     database.ref(`expense/${actions[0].expense.id}`).once('value').then((snapshot)=> {
//         expect(snapshot.val()).toEqual(expenseData);
//         done();
//     });
//   });
// });


// test('should add expense with default data to database and store', (done) => {
//     const store = createMockStore({});
//     const expenseData = {
//     description: '',
//     amount: 0,
//     note: '',
//     createdAt: 0
//   };

//   store.dispatch(startAddExpense(expenseData)).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//         type:'ADD_EXPENSE',
//         expense:{
//             id: expect.any(String),
//             ...expenseData
//         }
//     });

//     database.ref(`expense/${actions[0].expense.id}`).once('value').then((snapshot)=> {
//         expect(snapshot.val()).toEqual(expenseData);
//         done();
//     });
//   });
// });

// test('should setup add expense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });


// test('should setup add expsense action object with default values',()=>{    
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//           id: expect.any(String),
//           description:'',
//           note:'',
//           amount:0,
//           createdAt:0
//         }        
//     });
// });