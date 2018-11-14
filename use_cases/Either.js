let either_functor = Either.of('rain').map(str => `b${str}`);
let left_functor = left('rain').map(str => `It's gonna ${str}, better bring your umbrella!`);
console.log(either_functor);
console.log(left_functor)

//The power comes from the ability to embed an error message within the Left

// getAge :: Date -> User -> Either(String, Number) which holds a String as its left value and a Number as its Right.
const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed');
});

let right_date = getAge(moment(), { birthDate: '2005-12-12' });
// Right(9)
let left_date = getAge(moment(), { birthDate: 'July 4, 2001' });
// Left('Birth date could not be parsed')

//The difference, is now we have a clue as to why our program has derailed.
// console.log(right_date, 'right_date')
// console.log(left_date, 'left_date');

// fortune :: Number -> String
const fortune = compose(concat('If you survive, you will be '), toString, add(1));

// zoltar :: User -> Either(String, _); We use _ in the right branch's type signature to indicate it's a value that should be ignored
const zoltar = compose( map(console.log), map(fortune), getAge(moment()));
/**
 * for every map in compose, because getAge return a Left, so they will not be invoked,rather they return the input Left,,and so an until the compose return the Left
 */

zoltar({ birthDate: '2005-12-12' });
// 'If you survive, you will be 10'
// Right(undefined)

zoltar({ birthDate: 'balloons!' });
// Left('Birth date could not be parsed')