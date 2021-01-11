// var htpp = require('http')

let partners = [
    {
      "firstName": "Darin",
      "lastName": "Daignault",
      "email": "ddaignault@hubspotpartners.com",
      "country": "United States",
      "availableDates": [
      "2017-05-03",
      "2017-05-06"
      ]
    },
    {
      "firstName": "Crystal",
      "lastName": "Brenna",
      "email": "cbrenna@hubspotpartners.com",
      "country": "Ireland",
      "availableDates": [
      "2017-04-27",
      "2017-04-29",
      "2017-04-30"
      ]
    },
    {
      "firstName": "Janyce",
      "lastName": "Gustison",
      "email": "jgustison@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-29",
      "2017-04-30",
      "2017-05-01"
      ]
    },
    {
      "firstName": "Tifany",
      "lastName": "Mozie",
      "email": "tmozie@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-28",
      "2017-04-29",
      "2017-05-01",
      "2017-05-04"
      ]
    },
    {
      "firstName": "Temple",
      "lastName": "Affelt",
      "email": "taffelt@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-28",
      "2017-04-29",
      "2017-05-02",
      "2017-05-04"
      ]
    },
    {
      "firstName": "Robyn",
      "lastName": "Yarwood",
      "email": "ryarwood@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-29",
      "2017-04-30",
      "2017-05-02",
      "2017-05-03"
      ]
    },
    {
      "firstName": "Shirlene",
      "lastName": "Filipponi",
      "email": "sfilipponi@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-30",
      "2017-05-01"
      ]
    },
    {
      "firstName": "Oliver",
      "lastName": "Majica",
      "email": "omajica@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-28",
      "2017-04-29",
      "2017-05-01",
      "2017-05-03"
      ]
    },
    {
      "firstName": "Wilber",
      "lastName": "Zartman",
      "email": "wzartman@hubspotpartners.com",
      "country": "Spain",
      "availableDates": [
      "2017-04-29",
      "2017-04-30",
      "2017-05-02",
      "2017-05-03"
      ]
    },
    {
      "firstName": "Eugena",
      "lastName": "Auther",
      "email": "eauther@hubspotpartners.com",
      "country": "United States",
      "availableDates": [
      "2017-05-04",
      "2017-05-09"
      ]
    }
      ]


    //   Inital approach while still under the three hrs given

    function getInvitations(req) {

        // final result 
        let invitations = {};

        // working hash while getting the correct format 
        let tempInvitations = {};

        let finalResult;

        partners.forEach(partner => {

            // group by country
            let result = tempInvitations[partner.country]? tempInvitations[partner.country]:[]
            var element = {
                attendeeCount: 0,
                attendees: partner.email,
                name: partner.country,
                startDate: partner.availableDates
            }
            result.push(element);
            tempInvitations[partner.country] = result
            let workedDates = []
            
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result[i]['startDate'].length-1; j++){
                    // console.log(parseInt(result[i]['startDate'][j].split('-').join('')))
                    if ( - parseInt(result[i]['startDate'][j].split('-').join('')) + parseInt(result[i]['startDate'][j+1].split('-').join('')) == 1) {
                        workedDates.push(result[i]['startDate'][j])
                        let result2 = invitations[partner.country] ? invitations[partner.country]: [];
                        let element = {
                            attendeeCount: 0,
                            attendees: partner.email,
                            name: partner.country,
                            startDate: workedDates[i]? workedDates[i]: null
                        }
                        result2.push(element)
                        invitations[partner] = result2
                    
                    }
                    console.log(result)
                }
            }
            startDate = workedDates
            finalResult = result
        })
        
        
        return finalResult
    }


    console.log(getInvitations(partners))



    
