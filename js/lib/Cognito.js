(function(win, CognitoUserPool) {

  var CognitoUserPool = window.AmazonCognitoIdentity.CognitoUserPool,
    AWSCognito = window.AWSCognito,
    CognitoIdentityServiceProvider = AWSCognito.CognitoIdentityServiceProvider,CognitoUserAttribute = CognitoIdentityServiceProvider.CognitoUserAttribute,
    CognitoUser = CognitoIdentityServiceProvider.CognitoUser,
    AuthenticationDetails = CognitoIdentityServiceProvider.AuthenticationDetails,
    UserPool = new CognitoUserPool({
      UserPoolId : window.USER_POOL_ID, // Your user pool id here
      ClientId : window.CLIENT_ID, // Your client id here
    }),
    User;

  function signUp(email, password) {
    var attributes = [new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    })]
    return new Promise(function(resolve, reject) {
      UserPool.signUp(
        email,
        password,
        attributes,
        null,
        function(err, result) {
          if (err) {
            reject(err);
            return;
          }
          User = result.user;
          resolve(User);
          return;
        }
      )
    });
  }

  function confirm(username, code) {
    User = new CognitoUser({
      Username : username,
      Pool: UserPool,
    });
    return new Promise(function(resolve, reject) {
      User.confirmRegistration(code, true, function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
        return;
      });
    })
  }

  function resendConfirmationCode() {
    return new Promise(function(resolve, reject) {
      User.resendConfirmationCode(function(err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
  
  function logIn(username, password) {
    var authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    User = new CognitoUser({
      Username: username,
      Pool: UserPool,
    });
    return new Promise(function(resolve, reject) {
      User.authenticateUser(authenticationDetails, {
        onSuccess: resolve,
        onFailure: reject,
      })
    })
  }

  function getSession() {
    User || (User = UserPool.getCurrentUser());
    return new Promise(function(resolve, reject) {
      if (User === null) {
        reject('No current session found.');
        return;
      }
      User.getSession(function(err, session) {
        if (err) {
          reject(err);
          return;
        }
        if (session.isValid() === false){
          reject('Session is invalid');
        }
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: 'us-west-2:1a49aa9f-09bc-4052-9e22-7c3cf3d78fe5',
			Logins: {
				'cognito-idp.us-west-2.amazonaws.com/us-west-2_3isz7XCIF': session.getIdToken().getJwtToken()
			}
		});
        resolve();
        return;
      })
    })
  }

  function isAuthenticated() {
    return getSession();
  }

  function isNotAuthenticated() {
    return new Promise(function(resolve, reject) {
      getSession().then(reject).catch(resolve);
    })
  }

  function getUser() {
    return (
      getSession()
      .then(function() {
        // NOTE: getSession must be called to authenticate user before 
        // calling getUserAttributes
        return new Promise(function(resolve, reject) {
          User.getUserAttributes(function(err, attributes) {
            if (err) {
              reject(err);
              return
            }
            // Reduce the attributes into a simpler object.
            resolve(attributes.reduce(function (acc, attr) {
              var attribute = {};
              attribute[attr.getName()] = attr.getValue();
              return Object.assign(acc, attribute);
            }, {}));
            return;
          });
        })
      })
    )
  }

  function signOut() {
    User || (User = UserPool.getCurrentUser())
    if (!User) {
      return Promise.reject('Current user session not found');
    }
    return Promise.resolve(User.signOut());
  }

  window.Cognito = Object.freeze({
    signUp: signUp,
    confirm: confirm,
    logIn: logIn,
    resendConfirmationCode: resendConfirmationCode,
    getSession: getSession,
    getUser: getUser,
    signOut: signOut,
    isAuthenticated: isAuthenticated,
    isNotAuthenticated: isNotAuthenticated,
  })
})(window)
