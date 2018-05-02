(function(win) {

var docClient;

function connect(){
	AWS.config.region = 'us-west-2';
	AWS.config.credentials.get(function(err) {
        if (err) {
			console.error(err);
		}
	});
}

function setupSingleItemParams(tableId, keyId, value) {
	params = {TableName : tableId}; 
	var a = {}; a[keyId] = value;
	params.Key = a;
	
	return params;
}

function getSingleWriteParams(tableId, info) {
	params = { TableName : tableId };
	params.Item = info;
	return params;
}

function getSingleDelParams(tableId, info) {
	params = { TableName : tableId };
	params.Key = info;
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

function readItems(tableId,filter='',exp={}){
	var params = {
		TableName: tableId,
	};
	if((filter!='')) { 
		params.FilterExpression = filter; 
		params.ExpressionAttributeValues = exp; 
	}

	docClient = new AWS.DynamoDB.DocumentClient();
	
	return new Promise(function(resolve, reject) {
		 docClient.scan(params, function(err,data) {
			if(!err) {
				//console.log("Success",data.Item);
				resolve(data);
			}
			else { 
				//console.log("Unable to find item -" + err);
				reject(err);
			}
		});
	});
}

function writeItem(wParams) {
	docClient = new AWS.DynamoDB.DocumentClient();
	docClient.put(wParams, function(err,data) {
		if(!err) {
			console.log("Success - Write Completed");
		}
		else { 
			console.log("Unable to Write -" + err);
		}
	});
}

function deleteItem(wParams) {
	docClient = new AWS.DynamoDB.DocumentClient();
	docClient.delete(wParams, function(err,data) {
		if(!err) {
			console.log("Success - Delete Completed");
		}
		else { 
			console.log("Unable to Delete -" + err);
		}
	});
}

  window.DBClient = Object.freeze({
	connect: connect,
	readItem: readItem,
	writeItem: writeItem,
	setupSingleItemParams: setupSingleItemParams,
	getSingleWriteParams: getSingleWriteParams,
	readItems: readItems,
	deleteItem: deleteItem,
	getSingleDelParams: getSingleDelParams,
  })
})(window)