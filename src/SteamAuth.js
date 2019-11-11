// Helper functions for accessing the steam API.
var Parse = require('parse/node').Parse;

const httpsRequest = require('./httpsRequest');

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData, options) {
  if (!options) {
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      'steam auth configuration missing'
    );
  }

  return steamApiRequest(options.publisherKey, 
    "ISteamUserAuth/AuthenticateUserTicket/v1/"
    +"?key="+options.webAPIKey
    +"&appid="+options.appID
    +"&ticket="+authData.sessionTicket
  ).then(data => {
    if (data.response.error != null)
    {
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
        'Steam returned error ' + data.response.error.errordesc
      );
    }
    returnedID = data.response.params.steamid 
    if (returnedID == authData.id)
    {
      return Promise.resolve();
    }
    else
    {
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
        'steam auth is invalid for this user.'
      );
    }
  });
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

function steamApiRequest(publisherKey, path) {
  url = (publisherKey) ? "https://partner.steam-api.com/" : "https://api.steampowered.com/"
  return httpsRequest.get(url + path);
}

module.exports = {
  validateAppId,
  validateAuthData,
};