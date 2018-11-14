const ioWindow = new IO( () => window );

const winHeight = ioWindow.map(win => win.innerHeight)
ioWindow
  .map(prop('location'))
  .map(prop('href'))
  .map(split('/'));
console.log(winHeight.$value);
//{ $value: [Function] } The result is reminiscent of a queue.