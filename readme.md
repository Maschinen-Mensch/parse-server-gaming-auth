Authentication modules for parse-server for Steam (more platforms coming soon).

See https://docs.parseplatform.org/parse-server/guide/#custom-authentication for more information 

# Steam

## Authentication Provider Registration:

```
steamAuthProvider = {
  authenticate: (options) => {
    return options.error("steam", new Error("no steam auth data"));
  },
  restoreAuthentication: () => {
    return true;
  },
  getAuthType: () => {
    return 'steam';
  }
};
Parse.User._registerAuthenticationProvider(steamAuthProvider);
```

## Steam Authdata:
```
"steam": {
  "id": "user's steam ID",
  "access_token": "access ticket from ISteamUser.GetAuthSessionTicket"
}
```

## Obtaining steam session ticket using greenworks:

Greenworks is a node.js plugin for steam:
https://github.com/greenheartgames/greenworks

```
greenworks.getAuthSessionTicket(async(result) => {  
  var sessionTicket = "";
  for (u = 0; u < result.ticket.length; u++) {
    sessionTicket += ('0' + ref1[u].toString(16)).slice(-2);
  }
```


## Configuring parse-server for steam:

```
auth: {
  steam: {
    module: require('parse-server-gaming-auth').steam,
    webAPIKey: '',  // your steam web API key or publisher key
    appID: '',  // your steam app ID
    publisherKey: true  // set to true if you are using a publisher key, or false if you are using a public web API key (optional, default false)
  }
}
```