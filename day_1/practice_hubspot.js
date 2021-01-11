// Problem description:


// You're in charge of implementing a new analytics "sessions" view. You're given a set of data that consists of individual web page visits, along with a visitorId which is generated by a tracking cookie that uniquely identifies each visitor. From this data we need to generate a list of sessions for each visitor.

// You can get the raw event data from the dataset API at REDACTED
// The data set looks like this:

let events = [
    {
      "url": "/pages/a-big-river",
      "visitorId": "d1177368-2310-11e8-9e2a-9b860a0d9039",
      "timestamp": 1512754583000
    },
    {
      "url": "/pages/a-small-dog",
      "visitorId": "d1177368-2310-11e8-9e2a-9b860a0d9039",
      "timestamp": 1512754631000
    },
    {
      "url": "/pages/a-big-talk",
      "visitorId": "f877b96c-9969-4abc-bbe2-54b17d030f8b",
      "timestamp": 1512709065294
    },
    {
      "url": "/pages/a-sad-story",
      "visitorId": "f877b96c-9969-4abc-bbe2-54b17d030f8b",
      "timestamp": 1512711000000
    },
    {
      "url": "/pages/a-big-river",
      "visitorId": "d1177368-2310-11e8-9e2a-9b860a0d9039",
      "timestamp": 1512754436000
    },
    {
      "url": "/pages/a-sad-story",
      "visitorId": "f877b96c-9969-4abc-bbe2-54b17d030f8b",
      "timestamp": 1512709024000
    }
  ]

//   Given this input data, we want to create a set of sessions of the incoming data. A sessions is defined as a group of events from a single visitor with no more than 10 minutes between each event. A visitor can have multiple sessions.

//   So given the example input data above, we would expect output which looks like:

// "sessionsByUser": {
//     "f877b96c-9969-4abc-bbe2-54b17d030f8b": [
//       {
//         "duration": 41294,
//         "pages": [
//           "/pages/a-sad-story",
//           "/pages/a-big-talk"
//         ],
//         "startTime": 1512709024000
//       },
//       {
//         "duration": 0,
//         "pages": [
//           "/pages/a-sad-story"
//         ],
//         "startTime": 1512711000000
//       }
//     ],
//     "d1177368-2310-11e8-9e2a-9b860a0d9039": [
//       {
//         "duration": 195000,
//         "pages": [
//           "/pages/a-big-river",
//           "/pages/a-big-river",
//           "/pages/a-small-dog"
//         ],
//         "startTime": 1512754436000
//       }
//     ]
//   }
//   }

// Once the event data has been transformed into session, you will need to send the result via an http POST to REDACTED

let workingprogress; 


function createVisitorMap(data) {

    let groupedVisitors = new Map();

    // iterate through all elements on the array 
    for (let i = 0; i < data.length; i++){
        let eventData = {
            url: data[i]['url'],
            timestamp: data[i]['timestamp']
        }
        if(!groupedVisitors.has(data[i].visitorId)) {
            groupedVisitors.set(data[i].visitorId, [])
        }
        groupedVisitors.get(data[i].visitorId).push(eventData)
    }
    for (let key of groupedVisitors.keys()) {
        groupedVisitors.get(key).sort((x, y) => x.timestamp - y.timestamp)
    }
    workingprogress = groupedVisitors
    return groupedVisitors

}
// console.log(createVisitorMap(events))



// Creating Sessions 
function createSessions(visitorMap) {
    // let visitorMap = workingprogress

    let result = {} 
    for (let key of visitorMap.keys()) {
        let sessions = [];
        let currVisits = [];
        let visits = visitorMap.get(key);

        currVisits.push(visits[0])

        for(let i = 0; i<visits.length; i++) {
            // console.log(i)
            // console.log(visits[i].timestamp - currVisits[0].timestamp)

            let diff = (visits[i].timestamp - currVisits[0].timestamp) > 600000

            if(diff) {
                
                //create the new session.
                let newSession = {

                    startTime: currVisits[0].timestamp,
                    duration: currVisits[currVisits.length-1].timestamp - currVisits[0].timestamp,
                    pages: []

                };

                for(let visit of currVisits) {
                    newSession.pages.push(visit.url);
                }

                sessions.push(newSession);
                // //reset variables.
                // currVisits = [];
                // currVisits.push(visits[i]);

            } else {
                currVisits.push(visits[i]);
            }

        }

        //there are visits left over in currVisits,
        //so create the last session.
        let newSession = {

            startTime: currVisits[0].timestamp,
            duration: currVisits[currVisits.length-1].timestamp - currVisits[0].timestamp,
            pages: []

        };

        for(let visit of currVisits) {
            newSession.pages.push(visit.url);
            
        }

        sessions.push(newSession);

        result = sessions;

    }
    
    return result;

}

// console.log(createSessions(workingprogress))



// let result = data
    // let sortedVisitors = [data[0]['visitorId']]
    // for (let i = 0; i < data.length; i++) {
    //     if (!sortedVisitors.includes(data[i]['visitorId'])){
    //         sortedVisitors.push(data[i]['visitorId'])
            
    //     }
    // }
    // return sortedVisitors
    
//     let result = events
//     result.sort((a, b) => a.visitorId.localeCompare(b.visitorId))
//    return result
    // result.forEach(element => console.log(element.visitorId))








    var http = require('http');

// Function to compute the session information
function getSessionInfo(req) {
    // var events = req.events;
    let sessionInfoByUserId = {};
    let sessionHolders = {};

    events.forEach(event => {
        
        // grouped by VisitorId.
        let result = sessionHolders[event.visitorId]? sessionHolders[event.visitorId]: []
        var element = {
            url: event.url,
            timestamp: event.timestamp
        }
        result.push(element);
        sessionHolders[event.visitorId] = result;
    });

    // sorted by timestamp
    Object.keys(sessionHolders).forEach(visitor => {
        let visits = sessionHolders[visitor]
        visits.sort(function (a,b) {
            return a.timestamp - b.timestamp
        })

        // placeholder values for the events
        let startingEvent = 0;
        let endingEvent = 0;
        let urls = [];
        for (let i = 0; i < visits.length; i++) {
            if(i == 0) {
                startingEvent = visits[i].timestamp;
            } 
            // Condition
            let diff = (visits[i].timestamp - startingEvent > 600000)
            if(diff) {
                let result = sessionInfoByUserId[visitor] ? sessionInfoByUserId[visitor]: [];
                let element = {
                    duration: endingEvent - startingEvent,
                    pages: urls,
                    startTime: startingEvent
                }
                result.push(element);
                sessionInfoByUserId[visitor] = result;
                startingEvent = visits[i].timestamp;
                urls = [];
            }
            endingEvent = visits[i].timestamp;
            urls.push(visits[i].url);
        }

        let result = sessionInfoByUserId[visitor] ? sessionInfoByUserId[visitor]: [];
        var element = {
            duration: endingEvent - startingEvent,
            pages: urls,
            startTime: startingEvent
        }
    
        result.push(element);
        sessionInfoByUserId[visitor] = result;
    });


    return sessionInfoByUserId;

}

// Http server to handle the POST request that returns the session info.
// http.createServer(function (req, res) {
//     if(req.method == 'POST'){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         var jsonString = '';
//         req.on('data', function (data) {
//             jsonString += data;
//         });

//         req.on('end', function () {
//             jsonString = getSessionInfo(JSON.parse(jsonString));
//             res.write(JSON.stringify(jsonString));
//             res.end();
//         });
//     }
//   }).listen(8080);


console.log(getSessionInfo(events))