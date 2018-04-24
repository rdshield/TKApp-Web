(function(win) {

var docClient; // new AWS.DynamoDB.DocumentClient();

function connect(){
	console.log(AWS.config);
	AWS.config.credentials.get(function(err) {
        if (!err) {
			docClient = new AWS.DynamoDB.DocumentClient();
		}
		else {
			console.log(err);
		}
	})
}

function readItem(table,id) {
	var params = {
		TableName: table,
		Key:{
			"userId": id,
			
		}
	}
	
	docClient.get(params, function(err,data) {
			if(!err) { 
				console.log(data);
				return data;
			}
			else { 
				console.log("Unable to find item -" + err);
				return;
			}
	})	
}

function writeItem(table, id, value)
{
	
}


  window.DynamoDB = Object.freeze({
	connect: connect,
	readItem: readItem,
	writeItem: writeItem,
	
  })
  

		//readItem('user','6eb07c24-15de-43a2-adda-2d1d33c6adc2' );

})(window)