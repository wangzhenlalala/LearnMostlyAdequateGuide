// compose :: ((a -> b), (b -> c),  ..., (y -> z)) -> a -> z
const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
const curry = (fn) => {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    return fn.call(null, ...args);
  };
};

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((fn, f) => f.map(fn));

// prop :: String -> Object -> a
const prop = curry((p, obj) => obj[p]);


// maybe :: b -> (a -> b) -> Maybe a -> b
const maybe = curry((v, f, m) => {
  if (m.isNothing) {
    return v;
  }

  return f(m.$value);
});

// toString :: a -> String
const toString = String;

// add :: Number -> Number -> Number
const add = curry((a, b) => a + b);

// concat :: String -> String -> String
const concat = curry((a, b) => a.concat(b));







