const request=require("request");
const fetchMyIP = function(callback) {
    request('https://api.ipify.org?format=json', (error, response, body) => {
      if (error) {
      return callback(error, null);
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
        return;
      }
  
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    });
  };
  const ffetchCoordsByIP= function(ip,callback){
    request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
      if (!parsedBody.success) {
        const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
        callback(Error(message), null);
        return;
      }
      const { latitude, longitude } = parsedBody;
      callback(null, {latitude, longitude});
    });
  };

  const fetchISSFlyOverTimes = function(coords, callback) {
    const webisteUrl=`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
    request(webisteUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
      }
      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
        return;
      }
  
      const passes = JSON.parse(body).response;
      callback(null, passes);
  })};

  const nextISSTimesForMyLocation =function(callback){
    fetchMyIP((error,ip)=>{
      if (error) {
        return callback(error, null);
        }
        ffetchCoordsByIP(ip,(error,loc)=>{
           if (error) {
        return callback(error, null);
        }
      
      fetchISSFlyOverTimes(loc,(error,nextPasses)=>{
        if (error) {
          return callback(error, null);
          }
          callback(null,nextPasses)
      });
    });
  })};
  module.exports = { fetchMyIP };
  module.exports= { ffetchCoordsByIP };
  module.exports= { fetchISSFlyOverTimes };
  module.exports= { nextISSTimesForMyLocation  };