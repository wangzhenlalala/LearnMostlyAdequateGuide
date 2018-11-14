/* 
    We've seen how to write programs which pipe data through a series of pure functions. 
    They are declarative specifications of behaviour. 
    But what about 
        control flow, 
        error handling, 
        asynchronous actions, 
        state 
        and, dare I say, effects?!
*/
class Container {
    constructor(x){
        this.$value = x;
    }

    //saves us from having to write that awful new keyword all over the place
    static of(x){
        return new Container(x)
    }
}


//Functor
//Once our value, whatever it may be, is in the container, 
//we'll need a way to run functions on it.

//(a -> b) -> Container a -> Container b
Container.prototype.map = function(f){    //often called Identity
    return Container.of( f( this.$value ) );
}
/**   We can work with our value without ever having to leave the Container **/
/*                      A Functor is a type that implements map and obeys some laws
 *
 * What do we gain from asking our container to apply functions for us? Well, abstraction of function application. 
 * When we map a function, we ask the container type to run it for us. This is a very powerful concept, indeed.
 */

 class Maybe{
     static of(x){
         return new Maybe(x);
     }
     get isNothing(){
         return this.$value === null || this.$value === undefined;
     }
     constructor(x){
         this.$value  = x;
     }
     map(fn){
        return this.isNothing ? this : Maybe.of( fn(this.$value) );
     }
     inspect(){
        //  return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`
         return this.isNothing ? 'Nothing' : `Just(${ this.$value })`
     }
 }




class Either {
    static of(x) {
      return new Right(x);
    }
  
    constructor(x) {
      this.$value = x;
    }
  }
  
  class Left extends Either {
    map(f) {
      return this;
    }
  
    inspect() {
      return `Left(${inspect(this.$value)})`;
    }
  }
  
  class Right extends Either {
    map(f) {
      return Either.of(f(this.$value));
    }
  
    inspect() {
      return `Right(${inspect(this.$value)})`;
    }
  }
  
  const left = x => new Left(x);


// getFromStorage :: String -> (_ -> String)
const getFromStorage = key => () => localStorage[key];

class IO {
    static of(x) {
        return new IO(() => x);
    }

    constructor(fn) {
        this.$value = fn;
    }

    map(fn) {
        return new IO(compose(fn, this.$value));
    }

    inspect() {
        return `IO(${inspect(this.$value)})`;
    }
}
/*
    IO differs from the previous functors in that the $value is always a function. 
    We don't think of its $value as a function, however - that is an implementation detail and we best ignore it. 
    What is happening is exactly what we saw with the getFromStorage example: 
        IO delays the impure action by capturing it in a function wrapper. 
    [[[ --- As such, we think of IO as containing the return value of the wrapped action and not the wrapper itself. --- ]]]
    This is apparent in the of function: we have an IO(x), the IO(() => x) is just necessary to avoid evaluation. 
    Note that, to simplify reading, we'll show the hypothetical value contained in the IO as result; 
    however in practice, you can't tell what this value is until you've actually unleashed the effects!


    Our mapped functions do not run, they get tacked on the end of a computation we're building up, function by function, 
    like carefully placing dominoes that we don't dare tip over. 
    The result is reminiscent of a queue.
*/