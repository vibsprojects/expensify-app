export default (expenses) => {
    return expenses
    .map((expsense) => expsense.amount)
    .reduce((sum, value) => sum + value, 0);
};
