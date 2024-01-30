//Q1. Hoisting - It refers to the process whereby the interpreter appears to move the declaration of
// functions, variables,classess, or imports to the top of their scope,prior to execution of the code.

function hoistVariables() {
  console.log(a); //undefined - bcz var keyword followed declaration hoisting where it is being able to reference a variable in
  //its scope before the line it is declared

  //   console.log(b, c); // reference error - where the declaration of the variable causes behaviour changes in its scope before the
  // line in which it is declared

  const c = 2;
  let b = 3;
  var a = 10;
}

hoistVariables();

//Q2 - explicit and imlicit binding - call,bind and apply
// call method
var bindingObj = {
  name: "Prabhav",
  display: function () {
    console.log(this.name);
  },
};

var bindingObj1 = {
  name: "Vikas",
};

bindingObj.display();
bindingObj.display.call(bindingObj1);

//polyfill of bind method
let nameObj = {
  name: "Sohgaura",
};

let printName = {
  name: "Vik",
  sayHi: function () {
    console.log(this.name);
  },
};

Object.prototype.MyBind = function (myBindObj) {
  //here the this keyword is assigning to the sayHi fn
  myBindObj.myMethod = this;
  console.log(myBindObj);
  return function () {
    myBindObj.myMethod();
  };
};
let HiFun = printName.sayHi.MyBind(nameObj);
HiFun();

//polyfill of call and apply method will be same
let nameCall = {
  name: "Pra",
};

let printNameCall = {
  name: "Vikasss",
  sayHello: function (age) {
    console.log(this.name + " age is " + age);
  },
};

Object.prototype.myCall = function (callObj, ...args) {
  callObj.myMethod = this;
  callObj.myMethod(...args);
};

printNameCall.sayHello.myCall(nameCall, 29);

//Q3 - Implement a caching/memoization

const myMemoize = (fn, context) => {
  const res = {};
  return function (...args) {
    var argsCache = JSON.stringify(args);
    if (!res[argsCache]) {
      res[argsCache] = fn.call(context || this, ...args);
    }
    return res[argsCache];
  };
};

const clumzyProduct = (num1, num2) => {
  for (let i = 1; i <= 1000000; i++) {}
  return num1 * num2;
};

const memoizedClumzyProduct = myMemoize(clumzyProduct);

console.time("First call");
console.log(memoizedClumzyProduct(9467, 7649));
console.timeEnd("First call");

console.time("Second call");
console.log(memoizedClumzyProduct(9467, 7649));
console.timeEnd("Second call");

//Q4 - output based question on event loop
console.log("a");
setTimeout(() => {
  console.log("set");
}, 0);
Promise.resolve(() => console.log("pro")).then((res) => res());
console.log("b");
//first it will print both console log  then it will print promise as it is in microtask queue (priority queue)
// at last it will print settimeout as it is in a task queue

//Q5 - implement infinite currying
function addCurr(num1) {
  return function (num2) {
    return function (num3) {
      return function (num4) {
        return num1 + num2 + num3 + num4;
      };
    };
  };
}
console.log(addCurr(1)(2)(3)(4));

//so in this fn we are checking whether there is second arg or not, if it is there then we will again call the fn
//with the second arg and then third, fourth like this untill there is no arg left
function optimizedInfiniteCurry(a) {
  return function (b) {
    if (b) return optimizedInfiniteCurry(a + b);
    return a;
  };
}

console.log(optimizedInfiniteCurry(5)(3)(4)(8)());

//Q6 - impement this code

const calc = {
  total: 0,
  add(a) {
    this.total += a;
    return this; // returning this keyword here as we need to access this calc obj with other functions also
  },
  multiply(a) {
    this.total *= a;
    return this;
  },
  subtract(a) {
    this.total -= a;
    return this;
  },
};

const result = calc.add(10).multiply(2).subtract(5).add(5);
console.log(result.total);
