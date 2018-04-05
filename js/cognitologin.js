import "amazon-cognito-identity.min.js";

AWSCognito.config.region = 'us-west-2';

var poolData = v
	UserPoolId: 'us-west-2_3isz7XCIF',
	ClientId: '3n5vmotfkv1oei5uubq7at99f2'
};

var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(pooldata);

var userData = {
	Username: 'rdshield@uci.edu',
	Pool: userPool
}

var attributeList = [];

var dataEmail = {
	Name : 'email',
	Value: '...'
};

var dataPhoneNumber = {
    Name : 'phone_number',
    Value : '...' // your phone number here with +country code and no delimiters in front
};
var attributeEmail = 
new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
var attributePhoneNumber = 
new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);
 
attributeList.push(attributeEmail);
attributeList.push(attributePhoneNumber);
 
var cognitoUser;
userPool.signUp('username', 'password', attributeList, null, function(err, result){
    if (err) {
        alert(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
});

