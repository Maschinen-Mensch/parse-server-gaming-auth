var Parse = require('parse/node').Parse;

const httpsRequest = require('./httpsRequest');

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData, options) {

  return discordApiRequest("users/@me", authData.token).then(
    data => {
      returnedID = data.id
      if (returnedID == authData.id)
      {
        return Promise.resolve();
      }
      else
      {
        throw new Parse.Error(
          Parse.Error.OBJECT_NOT_FOUND,
          'Discord auth is invalid for this user.' + data.message
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
      Authorization: "Bearer " + token
    }
  };

  return httpsRequest.get(options);
}

module.exports = {
  validateAppId,
  validateAuthData,
};

console.log("DiscordAuth loaded")