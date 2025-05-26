Authentication modules for parse-server for Steam and Discord.

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
  "appID": "steam app ID (must be present in server config)"
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
    module: require('@maschinen-mensch/parse-server-gaming-auth').steam,
    webAPIKey: '',  // your steam web API key or publisher key
    appIDs: [''],  // your steam app ID (supports multiple for sharing parse accounts for different apps, eg for demos)
    publisherKey: true  // set to true if you are using a publisher key, or false if you are using a public web API key (optional, default false)
  }
}
```


# Discord

## Authentication Provider Registration:

```
discordAuthProvider = {
  authenticate: (options) => {
    return options.error("discord", new Error("no discord auth data"));
  },
  restoreAuthentication: () => {
    return true;
  },
  getAuthType: () => {
    return 'discord';
  }
};
Parse.User._registerAuthenticationProvider(discordAuthProvider);
```

## Discord Authdata:
```
"discord": {
  "id": "user's discord ID",
  "token": "OAuth2 token from discord.GetApplicationManager().GetOAuth2Token()"
}
```

## Configuring parse-server for discord:

```
auth: {
  discord: {
    module: require('@maschinen-mensch/parse-server-gaming-auth').discord
  }
}
```