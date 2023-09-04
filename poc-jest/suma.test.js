
const suma = require('./suma');

test('suma de dos numero positivos 3+5 = 8', ()=>{
    expect(suma(3,5)).toBe(8);
})

test('suma de dos numero negativos -8 -12 = -20',()=>{
    expect(suma(-8,-12)).toBe(-20);
})
test('suma de un numero positivo y uno negativo 20-7 = 13',()=>{
    //! PREPARACION
    const sumando01 = 20
    const sumando02 = -7

    //! EJECUCION 
    const resultado = suma(sumando01, sumando02)

    //! COMPROBACION
    expect(resultado).toBe(13);
})