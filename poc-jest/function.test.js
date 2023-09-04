
const forEach = require('./function');

const listUsers = [
    {name: 'John'},
    {name: 'Peter'},
    {name: 'Mary'},
]
test("testing callbackfunciton", ()=>{
    //Preparacion
    const items = [2,3,4]
    const callback = x => x+2
    const mockCallBack = jest.fn(x => x+2);

    // ejecucion 
    forEach(items, mockCallBack)

    // comprobacion 
    console.log(mockCallBack.mock)
    expect(mockCallBack.mock.calls.length).toBe(items.length);

    expect(mockCallBack.mock.calls[0][0]).toBe(items[0]);

    expect(mockCallBack.mock.results[0].value).toBe(items[0]+2);
    expect(mockCallBack.mock.results[1].value).toBe(items[1]+2);

})
test('testing async', async()=>{
    // preparacion
    const find = jest.fn();
    find.mockResolvedValue(listUsers)

    // ejecucion 
    const result = await find({id:20});

    // comprobacion 
    expect(result).toBe(listUsers);
    expect(result.length).toBe(listUsers.length);
})

test('Testing controller',async ()=>{
    // preparacion
    const getRepository = jest.fn().mockReturnValue({
        find:jest.fn().mockResolvedValue(listUsers)
    });

    // ejecucion
    const userRepository = getRepository("user");
     const users = await userRepository.find()
    // comprobacion
    expect(users).toBe(listUsers);
});