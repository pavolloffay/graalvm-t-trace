
agent.on('enter', function(ev) {
    if (ev.name === "handleRequest") {
        print("Entering handleRequest function")
   }
}, {
    roots: true
});
    
//agent.on('return', function(ev) {
//    if (ev.name === "handleRequest") {
//        print("is HandleRequest return")
//    }
 //print(ev)
  // printProps(ev)
//}, {
//    roots: true
//});

//agent.on('source', function(ev) {
//    print(ev)
//    printProps(ev)
//}, {
//    roots: true
//});

//agent.on('close', function(ev) {
//    print(ev)
//}, {
//   roots: true
//});

function printProps(obj) {
    for(var propName in obj) {
        print(`has property: ${propName} = ${obj[propName]}`)
    }
}
