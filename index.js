const request=require("request");
// const { fetchMyIP } = require('./iss');
const { nextISSTimesForMyLocation }=require("./iss")

/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);

});
//const { ffetchCoordsByIP } = require('./iss');

ffetchCoordsByIP('162.245.144.188', (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    console.log('It worked! Returned coordinates:' , coordinates);
  });
const { fetchISSFlyOverTimes } = require('./iss');
const exampleCoords= {latitude: '49.27670', longitude: '-123.13000' };
  fetchISSFlyOverTimes(exampleCoords , (error, passTimes) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned:' , passTimes);
  
  });*/

const passingTimeLap=function(passingTime){
  for(const pass of passingTime){
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}  ;
nextISSTimesForMyLocation((error,passTime)=>{
    if (error) {
      return console.log("It didn't work!", error);
    }
    
    passingTimeLap(passTime);
  });


  
  