// Helper functions for accessing the Discord API.
console.log("DiscordAuth loading")

var Parse = require('parse/node').Parse;

const httpsRequest = require('./httpsRequest');

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData, options) {
  console.log("discord validateAuthData: " + JSON.stringify(authData))

  return discordApiRequest("users/@me", authData.token).then(
    data => {
      console.log("discord! returnData: " + JSON.stringify(data))
      if (data.response.error != null)
      {
        throw new Parse.Error(
          Parse.Error.OBJECT_NOT_FOUND,
          'Discord returned error ' + data.response.error.errordesc
        );
      }
      returnedID = data.response.id
      if (returnedID == authData.id)
      {
        return Promise.resolve();
      }
      else
      {
        throw new Parse.Error(
          Parse.Error.OBJECT_NOT_FOUND,
          'Discord auth is invalid for this user.'
        );
      }
    }
  );
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

function discordApiRequest(request, token) {
  const options = {
    hostname: 'discordapp.com',
    path: '/api/'+request,
    headers: {
      token: token
    }
  };

  return httpsRequest.get(options);
}

module.exports = {
  validateAppId,
  validateAuthData,
};

console.log("DiscordAuth loaded")