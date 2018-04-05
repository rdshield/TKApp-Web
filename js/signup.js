$('#submit').on('click',function() {
	var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

	AWSCognito.config.region = 'us-west-2';
	
	var poolData = {
		UserPoolId : 'us-west-2_3isz7XCIF', // Your user pool id
		ClientId : '4lpbdb4giq4thfo8c4esqsn9nv' // Your App client id
	};
	
	console.log("Username : " + $("userID").val() );
	console.log("Password : " + $("userPW").val() );
	
	var userPool = new CognitoUserPool(poolData);
	var attributeList = [];
	var dataEmail = {
		Name: 'email',
		Value: ($("userID").val())
	};
		
	var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
	
	attributeList.push(attributeEmail);
/*
	userPool.signUp(tempID, tempPW, attributeList, null, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		console.log(result);
	});
	*/
})  