// write a program to print 

// [ * ] when n=1
// [[ * ]] when n=2
// [[[ * ]]] when n=3
// [[[[ * ]]]] when n=4

function print(n) {
    let firstBracket = ''
    let lastBracket = ''
    let base = ' * '
    let i = 0
    while (i < n){
        firstBracket += '['
        lastBracket += ']'
        i++
    }
    return firstBracket + base + lastBracket
}




console.log(print(4))


function PowerOFNumber(n){
    if (typeof(n) ==='number') {
        return (n)**(1/2)
    } else {
        return 'Given argument is not a number'
    }
    
     
}

console.log(PowerOFNumber('hello'))



function LargestAmongThreeNumbers([x, y, z]){
    // return Math.max(x, y, z)
    if(x > y && x > z){
        return x 
    }else if (y> x && y> z){
        return y
    }else {
        return z
    }

}

console.log(LargestAmongThreeNumbers([50, 45, 100]))





function getSum(a, b){
    while(b !== 0){
      let getSum = a & b  //calculate if is there any carry we need to add
      a = a^b;   // a is used to hold the sum
      b = getSum << 1;  //b is used to hold left shift carry
    }
    return a;
  }
  
  console.log(getSum(0, 1))

  function substract(a, b){
      if(b == 0){
        return a
      }
      return substract(a^b, (~a & b) << 1)

}

  console.log(substract(3, 3))


  function reverseString(str) {
      let result = ''
      for (let i = str.length - 1; i >= 0; i--){
          result += str[i]
      }
      return result
  }

  console.log(reverseString('hello'))


  var a = prompt("Enter first number");
var b = prompt("Enter second number");
console.log(a + b);