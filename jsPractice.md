```js
var list = [1, 2, 3, 4];

list.forEach(li => {
  setTimeout(function() {
    console.log("The index of this number is: " + li);
  }, 3000);
});

function mergeArrays(arr1, arr2) {
  var ind1 = 0;
  var ind2 = 0;
}

async function callAsync(number) {
  for (let i = 0; i <= number; i++) {
    var x = await promisify(i);
    console.log(x);
  }
}

function promisify(i) {
  return new Promise((resolve, reject) => {
    asyncFunction(i, x => {
      resolve(x);
    });
  });
}

function asyncFunction(i, callback) {
  setTimeout(function() {
    callback("task = " + i);
  }, Math.floor(Math.random() * 6));
}

callAsync(4);

//should return
// "task = 0"
// "task = 1"
// "task = 2"
// "task = 3"
// task = 4"

function twoArrays(k, A, B) {
  if (A.length === 1 && B.length === 1) {
    if (A[0] + B[0] >= k) {
      console.log("yes");
      return "YES";
    } else {
      return "NO";
    }
  }

  for (let i = 0; i < A.length; i++) {
    var current = A[i];
    for (let j = 0; j < B.length; j++) {
      if (current + B[j] >= k) {
        let firstHalfB = B.slice(0, j);
        let secondHalfB = B.slice(j + 1, B.length);
        let newB = firstHalfB.concat(secondHalfB);
        return twoArrays(k, A.slice(i + 1, A.length), newB);
      }
      if (j === B.length - 1) {
        return "NO";
      }
    }
  }
}

console.log(twoArrays(10, [1, 2, 3], [9, 8, 7]));

function foo1() {
  {
    return {
      bar: "hello"
    };
  }
}

function foo2() {
  {
    return {
      bar: "hello"
    };
  }
}

console.log(foo1());
console.log(foo2());
```

```js
function roomBooking(m, operations) {
  var calculateHash = function(name) {
    var result = 0;
    for (var i = 0; i < name.length; i++) {
      result += name.charCodeAt(i);
    }
    return result;
  };

  var hashMap = [];
  var answer = [];
  for (var i = 0; i < m; i++) {
    hashMap.push(["", -1]);
  }
  for (var i = 0; i < operations.length; i++) {
    var name = operations[i].substr(1);
    var hash = calculateHash(name);
    var pos = hash % m;
    if (operations[i][0] === "+") {
      while (hashMap[pos][1] !== -1) {
        pos = (pos + 1) % m;
      }
      hashMap[pos] = [name, hash];
    } else {
      while (hashMap[pos][1] !== hash && hashMap[pos][0] !== name) {
        pos = (pos + 1) % m;
      }
      hashMap[pos] = ["", -1];
    }
  }
  for (var i = 0; i < m; i++) {
    if (hashMap[i][1] !== -1) {
      answer.push(hashMap[i][0]);
    }
  }
  return answer;
}

roomBooking(200, ["+Ac", "+Bb", "+Ca", "-Bb", "+Ad"]);

var _ = require("underscore");
var request = require("request");

//async function that returns a new promise
function getDistances(locations) {
  let firstCity = locations.shift();
  firstCity = firstCity.split(", ").join("+");
  firstCity = firstCity.split(" ").join("+");
  let url =
    "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" +
    firstCity +
    "&destinations=";

  for (var place = 0; place < locations.length; place++) {
    var currentPlace = locations[place].split(",")[0];
    currentPlace = currentPlace.split(" ").join("+");
    if (place === locations.length - 1) {
      url = url + currentPlace;
    } else {
      url = url + currentPlace + "|";
    }
  }

  url = url + "&key=AIzaSyDN6MBMMQBCJoXgbYSqxvVJ1M0wR9c3KsM";

  console.log(url);

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
}

async function distance(locations) {
  var resp = await getDistances(locations);
  return resp;
}
var body = distance([
  "New York, NY, USA",
  "Toronto, ONT",
  "Los Angeles, CA, USA"
]);

function addDistances(distanceArray) {}

body.then(response => console.log(response)).catch(err => console.log(err));
console.log(body);
```

```js
function alphabetSoup(arr, str) {
    var returnIndexes = [];
    var matchString = "";
    var strInd = 0;

    for ( let i = 0; i < arr.length; i++) {

        for (let i2 = 0; i2 < arr[i].length; i2++ ) {
            let strLetter = str[strInd];
            let soupLetter = arr[i][i2];

            console.log(strLetter);
            console.log(soupLetter);

            if ( soupLetter === strLetter ) {
                matchString = matchString + soupLetter ;
                console.log(matchString);
                strInd++;
                if (matchString === str) {
                    returnIndexes.push([i, i2]);
                    matchString = "";
                    strInd = 0;
                }

            } else if (soupLetter === str[0]) {
               matchString = soupLetter;
               strInd = 1;

            } else {
                matchString = "";
                strInd = 0;
            }

        }
    }

    return returnIndexes;
}
var soup = [["a", "b", "g", "e", "e", "k", "l"],
            ["a", "q", "w", "g", "e", "e", "g"],
            ["e", "e", "k", "g", "e", "e", "k"]];
var indexes = alphabetSoup(soup, "geek");

console.log(indexes);

//find first parethesis
function findMatchingParenthesis(string, index) {
    var parenthesisStack = [];
    var openingIndex = null;
    for ( let i = 0; i < string.length; i++) {
        if (i === index) {
            openingIndex = parenthesisStack.pop();
            break;
        } else if (string[i] === "(") {
            parenthesisStack.push(i);
        } else if ( string[i] === ")" ) {
            parenthesisStack.pop();
        }
    }
    return openingIndex;
}

var string = "0123(4(6789)f(alsdkgjasdg))";
console.log(findMatchingParenthesis(string, 11));


function twoSum(arr, sum) {
    var alreadySeen = new Set();
    var numArray = [];

    for ( let i = 0; i < arr.length;  i++) {
        let neededNumber = sum - arr[i];
        if ( alreadySeen.has(neededNumber)) {
            numArray.push([neededNumber, arr[i]])
        }
        alreadySeen.add(arr[i]);
    }
    console.log(alreadySeen)
    return numArray;
}

console.log(twoSum([3, 5, 2, -4, 8, 11], 7))

//For example, if the array is [3, 5, 2, -4, 8, 11] and the sum is 7, your program should return [[11, -4], [2, 5]] because 11 + -4 = 7 and 2 + 5 = 7.
//hint: try a fast solution with a hash table that has O(1) look up time


function powerSet(arr) {
    var finalSet = [[]];

    for (let i = 0; i  < arr.length; i++ ) {
        for ( let i2 = 0; i2 < 5; i2++) {
            var subSet = finalSet[i2];
            var newSet = subSet.slice(0);
            newSet.push(arr[i]);
            console.log(newSet);
            finalSet.push([newSet])
        }
    }

   return(finalSet) ;
}

console.log(powerSet([1]));




//input set = [1, 2, 3]
//power set = [[], [1], [2], [3], [1, 2], [2, 3], [1, 3] [1, 2, 3]]

function comboString(string) {
    var returnStrings = [];
    for ( let i = 0; i < string.length; i++ ) {
        let char = string[i];

        if ( char === "?" && returnStrings.length === 0) {
            let newString = string.slice(0, i);
            let option = newString + "0";
            returnStrings.push(option);
            option = newString + "1";
            returnStrings.push(option);
        } else if ( returnStrings.length > 0 && char !== "?" ) {
            for (let j = 0; j < returnStrings.length; j++ ) {
                //on first return string
                let str = returnStrings[j];
                str = str + char;
                //add 0 to end
                returnStrings[j] = str ;
                //duplicate and add 1 to end
            }
        } else if ( char === "?" && returnStrings.length > 0) {
            for (let k = 0; k < returnStrings.length; k++ ) {
                //on first return string
                let str = returnStrings[k]
                let copy = str.slice(0) + "1";
                str = str + "0";
                //add 0 to end
                returnStrings.push(copy);
                //duplicate and add 1 to end
            }
        }
    }
    return returnStrings;
}

console.log(comboString("011?0?"));


//function takes in a string of 0, 1, and ? where ? can either be 0 or 1 and you need to return all outputs!
//ex: 011?0 => ["01100", "01110"]

function parenthesisChecker(str, ind){
    var count = 0;
    var indeces = [];
    var finalIndex ;

    for ( let i = 0; i < str.length; i++ ) {
        let char = str[i];
        console.log
        if ( i === ind ) {
            finalIndex = indeces.pop();
            break;
        }
        if ( char === "(" ) {
           indeces.push(i);
        } else if ( char === ")" ) {
           indeces.pop();
        }
    }
    return  finalIndex
}

var string = "0123(4(6789)f(alsdkgjasdg))";
console.log(parenthesisChecker(string, 11));
//takes a string with parenetheses and an index


//takes in two rectangles and finds the overlap

function rectangleOverlap( rect1, rect2 ) {

}

Class TemperatureTracker{
    construstor(){
        this.mean = null;
        this.mode = null;
        this.max = null;
        this.min = null;
        this.count = 0;
        this.occurancesCounter = Array(111).fill(0);
        this.maxOccurances = 0;
    }

    insert(temp) {
        count++

        //set mean
        if ( this.mean === null ) {
            this.mean = temp;
        } else {
            this.mean = (this.mean + temp)/count;
        }

        if ( this.max === null) {
            this.max = temp;
        } else {
            this.max = ( this.max > temp ) ? this.max : temp ;
        }

        if ( this.min === null) {
            this.min = temp;
        } else {
            this.min = ( this.min < temp ) ? this.min : temp ;
        }

        this.occurancesCounter[temp]++
        if ( this.occurancesCounter[temp] > this.maxOccurances ) {
            this.maxOccurances = this.occurancesCounter[temp];
            this.mode = temp;
        }
    }

    getMax() {
        return this.max;
    }

    getMin() {
        return this.min;
    }

    getMean() {
        return this.mean;
    }

    getMode() {
        return this.mode;
    }
}

//triangular series problems


//find repeat number in a series of numbers 1-n
function arrayRepeat(array) {
    let n = array.length - 1
    let total = ((n*n) + n)/2;
    console.log(total);

    let arraySum = array.reduce((x,y) => x+y, 0)

    return arraySum - total;
}

console.log(arrayRepeat([1,5,2,3,4,5]));

//print matrix in spiral order
//ex: [[1, 2, 3],
 //[4, 5, 6],
 //[7, 8, 9]] becomes
 // [1, 2, 3, 6, 9, 8, 7, 4, 5]

function matrixSpiral(array) {

}


//find the max profit for apple stock
function maxProfit(array) {
    var min = array[0];
    var maxProfit = array[1] - array[0];
    for ( let i = 0; i < array.length; i++ ) {
        let num = array[i];

        if ( num < min ) {
            min = num;
        }

        if ( (num - min) > maxProfit) {
            maxProfit = num - min
        }
    }

    return maxProfit;
}

console.log(maxProfit([7,1,5,3,6,4]));


//in an array find the highest product of three numbers
function highestProductOfThree() {

}

function merge2SortedLinkedLists() {

}

//run in Olg(n) runtime
function binarySearch(sortedArray) {

}

function mergeSort() {

}


//Javascript Closure Questions
//Allow a function that would allow you to do this.. var addSix = createBase(6);
//addSix(10); // returns 16
//addSix(21); // returns 27

function createBase( num ) {
    return function (num2) {
       return num + num2;
    }
}

var addSix = createBase(6);
console.log(addSix(10));
console.log(addSix(21));

//how do you use a closure to create a private counter??

function privateCounter(start) {
    var first = start;
    return{
        add: function(next){
            first += next;
        },
        retrieve: function() {
            return first;
        }
    };
}

let counter1 = privateCounter(1);
counter1.add(3);
counter1.add(5);
console.log(counter1.retrieve());


//create object with private State => todo list

function TodoStore(){
  let todos = [];

  function add(todo){
    todos.push(todo);
  }
  function get(){
        return todos;
    // return todos.filter(isPriorityTodo).map(toTodoViewModel);
  }

//   function isPriorityTodo(todo){
//      return task.type === "RE" && !task.completed;
//   }

//   function toTodoViewModel(todo) {
//      return { id : todo.id, title : todo.title };
//   }

  return Object.freeze({
    add,
    get,
    todos
  });
}

var toady = TodoStore();
toady.add("wake up");
console.log(toady.get());
console.log(toady.todos);

//how to filter a Map 

```
