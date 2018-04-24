(function(win) {

var docClient;

function connect(){
	AWS.config.region = 'us-west-2';
	AWS.config.credentials.get(function(err) {
        if (err) {
			console.error(err);
		}
	});
	console.log(AWS.config);
}

function getParams(tableId, keyId, value) {
	params = {TableName : tableId}; 
	var a = {}; a[keyId] = value;
	params.Key = a;
	
	return params;
}

function readItem(params) {
	//console.log(params);
	docClient = new AWS.DynamoDB.DocumentClient();
	return new Promise(function(resolve, reject) {
		 docClient.get(params, function(err,data) {
			if(!err) {
				//console.log("Success",data.Item);
				resolve(data.Item);
			}
			else { 
				//console.log("Unable to find item -" + err);
				reject(err);
			}
		});
	});
}

function writeItem(table, id, value)
{
	
}


  window.DBClient = Object.freeze({
	connect: connect,
	readItem: readItem,
	writeItem: writeItem,
	getParams: getParams,
  })
  

		//readItem('user','6eb07c24-15de-43a2-adda-2d1d33c6adc2' );

})(window)