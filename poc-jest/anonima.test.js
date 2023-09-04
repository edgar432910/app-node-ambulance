const edad = require('./anonima')

jest.mock('./anonima.js')

test('Obtener score',()=>{
    // preparacion 
    edad.mockImplementationOnce(()=>300)
    edad.mockImplementation(() =>50);
    
    // ejecucion 
    const resultado = edad()
    const resultado2 = edad();

    // comprobacion 
    expect(resultado).toBe(300)
    expect(resultado2).toBe(50)
})