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