

let container = Container.of(3);
console.log(container)

function double(x){
    return x + x
}

console.log( Maybe.of('wangzhen ').map(double) )


// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0]);

// In the wild, we'll typically see Maybe used in functions which might fail to return a result.
/******************* Pointfree Style not mentioning its data !!!! */
// streetName :: Object -> Maybe String
const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

console.log( streetName({ addresses: [] }) );
// Nothing

console.log( streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }) );
// Just('Shady Ln.')



// If a program has no observable effect, does it even run?