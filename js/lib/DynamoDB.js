(function(win, DynamoDB) {

var DynamoDB = window.DynamoDB,
    docClient= new AWS.DynamoDB.DocumentClient();

function updateCredentials(){
	console.log(AWS.config.credentials);
	AWS.config.credentials.get(function(err) {
        if (!err) {
			readItem();
		}
		else {
			console.log(err);
		}
	})
}

function readItem() {
	var params = {
		TableName: 'users',
		Key:{
			"userId": '6eb07c24-15de-43a2-adda-2d1d33c6adc2' 
		}
	}
	
	docClient.get(params, function(err,data) {
			if(!err) { console.log("Item Found"); }
			else {
				console.log("Unable to find item -" + err); 
			}
	})	

}

  window.DynamoDB = Object.freeze({
	updateCredentials: updateCredentials,
	readItem: readItem,
  })
  


})(window)