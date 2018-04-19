(function(win, DynamoDB) {

var DynamoDB = window.AWS.DynamoDB,
docClient;


function updateCredentials(){
	AWS.config.region = 'us-west-2';
	AWS.config.credentials.get(function(err) {
        if (!err) {
          var id = AWS.config.credentials.identityId;
          console.log('Cognito Identity ID '+ id);
	}})
}

})(window)