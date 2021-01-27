// PROBLEM # 1

// You won some money in a msContentScript, and your winnings are a stack of bills in various denominations. You know you have five bills of one kind, and you want to know which denomination that is. Write a function that will return the denomination within the array which has n occurrences 

// For example say you have a stack of bills that are [10, 20, 20, 5, 5, 5, 20, 10, 2, 20, 100] and you are looking for which bill you have four of, the answer would be 20.

// You can assume that the array contains numbers which will result in only one selection 

function findNumberWithNoRecurrences(numbers, n) {
    // console.log(numbers)
    let counts = {}
    for (let i = 0; i <numbers.length; i++) {
        let num = numbers[i]
        counts[num] = counts[num] ? counts[num] + 1 : 1
        console.log(counts)
    }
    // looking for how many times I have the nomination bill on the array
    // return counts[n]

    // looking for the nomination bill which is present on the array n times
    return Object.keys(counts).find(key => counts[key] === n)
}


let numbers = [10, 20, 20, 5, 5, 5, 20, 10, 2, 20, 100]
// console.log(findNumberWithNoRecurrences(numbers, 4))












































// PROBLEM # 2

// You found directions to hidden treasure only written in words. The possible directions are "NORTH", "SOUTH", "WEST", "EAST".
// "NORTH" and "SOUTH" are opposite directions, as are "EAST" and "WEST". Going one direction and coming back in the opposite direction leads to going nowhere. Someone else also has these directions to the treasure and you need to get there first. Since the directions are long, you decide to write a program to figure out the fastest and more direct route to the treasure. 

// Write a function that will take a list of strings and will return a list of strings with the unneeded directions removed(NORTH <-> SOUTH or EAST<->WEST side by side).

// For example: 
// in ['NORTH', 'EAST' 'WEST', 'SOUTH', 'WEST', 'SOUTH', 'NORTH', 'WEST'], "NORTH" and "SOUTH" are not directly opposite but they become directly opposite after the reduction of "EAST", and 'WEST'. The whole path can be reduce to ['WEST', "WEST"].

// Not all paths are reducible The path ['EAST', 'NORTH', "WEST", "SOUTH"] is not reducible. 'EAST' and 'NORTH', 'NORTH' and 'WEST', 'WEST' and 'SOUTH' are not directly opposite of each other and thus can't be reduced.
// The resulting path has not changed from the original path: ["EAST", "NORTH", "WEST", "SOUTH"]

function directionReduction(directions) {
    let result = [];    
        for (let i = 0; i < directions.length; i++){
            if (directions[i] === 'NORTH' && directions[i + 1] === 'SOUTH' || directions[i] === 'SOUTH' && directions[i + 1] === 'NORTH' || directions[i] === 'EAST' && directions[i + 1 ] === 'WEST' || directions[i] === "WEST" && directions[i + 1] === "EAST"){
                // skip this directions[i]
                i++
            }
            // at this point we can push the directions[i] into the result array
            // For the second iteration, check if result[result.lenght - 1] can be reduced with the direction[i + 1] and so on 

            else if (result[result.length - 1] === "NORTH" && directions[i] === "SOUTH" || result[result.length - 1] === "SOUTH" && directions[i] === "NORTH" || result[result.length - 1] === "EAST" && directions[i] === "WEST" || result[result.length - 1] === "WEST" && directions[i] === "EAST"){

                // if reduction can happen then pop the directions[i]
            result.pop()
            } else {
                result.push(directions[i])
            }
        }
    return result
}
directions = ['NORTH', 'EAST', 'WEST', 'SOUTH', 'WEST', 'SOUTH', 'NORTH', 'WEST']
directions2 = ['EAST', 'NORTH', "WEST", "SOUTH"]

// console.log(directionReduction(directions2))






function directionReduction(directions) {
	let oppositeDirections = {
		NORTH: "SOUTH",
		SOUTH: "NORTH",
		EAST: "WEST",
		WEST: "EAST"
	};
	if (directions.length <= 1) {
        return directions;
    }


	return directions.reduce((dirs, dir) => {
        dirs[dirs.length -1] !== oppositeDirections[dir] ? dirs.push(dir) : dirs.pop();
        console.log(' i am dirs', dirs)
        console.log('I am length' , dirs.length)
        console.log(dirs[dirs.length - 1])

		return dirs;
	}, []);
};
console.log(directionReduction(["NORTH", "EAST", "WEST", "SOUTH", "WEST", "SOUTH", "NORTH", "WEST"]));




function pluralize(...args) {
    const pluralized_nouns = []
    args.forEach((noun) => {
        if(['s', 'x', 'z'].includes(noun.substr(-1))) {
            pluralized_nouns.push(noun + 'es')
        } else if (['ss', 'sh', 'ch'].includes(noun.substr(-2))){
            pluralized_nouns.push(noun + 'es')
        } else {
            pluralized_nouns.push(noun + 's')
        }
    })
    return pluralized_nouns
}

console.log(pluralize(true, false))