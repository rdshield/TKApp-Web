(function(win) {

var docClient;
		
function connect(){
	AWS.config.region = 'us-west-2';
	AWS.config.credentials.get(function(err) {
        if (err) {
			console.error(err);
		}
	});
	docClient = new AWS.DynamoDB.DocumentClient();
}

function readItem(table,id) {
	var params = {
		TableName: table,
		Key:{
			"userId": id,
			
		}
	}
    var a = docClient.get(params, function(err,data) {
			if(!err) {
				console.log("Success",data.Item);
			}
			else { 
				console.log("Unable to find item -" + err);
				
			}
	});
	console.log(a.Item);
}

function writeItem(table, id, value)
{
	
}


  window.DBClient = Object.freeze({
	connect: connect,
	readItem: readItem,
	writeItem: writeItem,
	
  })
  

		//readItem('user','6eb07c24-15de-43a2-adda-2d1d33c6adc2' );

})(window)