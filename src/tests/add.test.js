const add = (a,b)=> a + b;
const generateGreeting =(name = 'Anonymous')=> `Hello ${name}!`;

test('should add two numbers',() => {
    const result=add(3,4);
    expect(result).toBe(7);
});

test('should generate greeting from name',()=>{
    const greetingString=generateGreeting('Vibs');
    expect(greetingString).toBe('Hello Vibs!');
});

test('should generate greeting for no name',()=>{
    const greetingString=generateGreeting();
    expect(greetingString).toBe('Hello Anonymous!');
});