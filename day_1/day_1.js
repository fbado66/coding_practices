// Your company built an in-house calendar tool called HiCal. You want to add a feature to see the times in a day when everyone is available.

// To do this, you’ll need to know when any team is having a meeting. In HiCal, a meeting is stored as objects ↴ with integer properties startTime and endTime. These integers represent the number of 30-minute blocks past 9:00am.

// For example:

//   { startTime: 2, endTime: 3 }  // meeting from 10:00 – 10:30 am
// { startTime: 6, endTime: 9 }  // meeting from 12:00 – 1:30 pm

// Write a function mergeRanges() that takes an array of multiple meeting time ranges and returns an array of condensed ranges.

// For example, given:

  let meetings = [
  { startTime: 0,  endTime: 1 },
  { startTime: 3,  endTime: 5 },
  { startTime: 4,  endTime: 8 },
  { startTime: 10, endTime: 12 },
  { startTime: 9,  endTime: 10 },
]

// your function would return:

//   [
//   { startTime: 0, endTime: 1 },
//   { startTime: 3, endTime: 8 },
//   { startTime: 9, endTime: 12 },
// ]

// Do not assume the meetings are in order. The meeting times are coming from multiple teams.

function mergeRanges(meetings) {
    // const meetingsCopy = JSON.parse(JSON.stringify(meetings))
    const sortedMeetings = meetings.sort((a, b) => {
        return a.startTime - b.startTime
    })
    const mergedMeetings = [sortedMeetings[0]]
    for (let i = 1; i < sortedMeetings.length; i++) {
        const currentMeeting = sortedMeetings[i];
        const lastMergedMeeting = mergedMeetings[mergedMeetings.length - 1];

        if (currentMeeting.startTime <= lastMergedMeeting.endTime) {
            lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime)
        } else {
            mergedMeetings.push(currentMeeting)
        }
    }
    return mergedMeetings
}

  console.log(mergeRanges(meetings))





  function bubbleSort(array) {
    var done = false;
    while (!done) {
      done = true;
      for (var i = 1; i < array.length; i += 1) {
        if (array[i - 1] > array[i]) {
          done = false;
          var tmp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = tmp;
        }
      }
    }
  
    return array;
  }
  
  var numbers = [12, 10, 15, 11, 14, 13, 16];
  bubbleSort(numbers);
  console.log(numbers);




  function bruteForceTwoSum(array, sum) {
    let nums = []
             
        for(let x in array){
          for(let y in array){
            
            if (array[x] + array[y] === sum){
                nums.push([array[x], array[y]])
               }
            
            }
        }  	
     return nums

     
  }

  let array = [2, 3, 4, 3, 6, 7]
        let sum = 6

        console.log(bruteForceTwoSum(array, sum))

        let binarySearch = (array, target, start=0, end=array.length-1) => {

            let midPoint = ~~(start + (end - start)/2)
        
            switch(true){
                case array[start] === target:
                    return array[start]
                case array[midPoint] === target:
                    return array[midPoint]
                case array[end] === target:
                    return array[end]
                case end - start === 0:
                    return false
                case array[midPoint] > target:
                    return binarySearch(array, target, start+1, midPoint-1)
                case array[midPoint] < target:
                    return binarySearch(array, target, midPoint+1, end-1)    
            }
            return false
        }

        let binarySearchTwoSum = (array, sum) => {
            let sortedArray = array.sort()
        
            let nums = []
            let prevNums = []
            
            for (let i in sortedArray){
                let addend = binarySearch(sortedArray, sum-sortedArray[i])
                if (!!addend && !prevNums.includes(array[i]) && !prevNums.includes(addend)){
                    nums.push([sortedArray[i], addend])
                    prevNums.push(addend)
                }
            }
            return nums
        }

        console.log(binarySearchTwoSum(array, sum))


        function sorting(array) {
            return array.sort()
        }

        console.log(sorting(array))



        function reverse(str) {
            let r = '';
            console.log(str.length)

            for ( i = str.length -1; i >= 0; i--){
                r += str[i]

            }
            return r
        }

        console.log(reverse('hello'))