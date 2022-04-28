"use strict";

const AWS = require("aws-sdk");
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TABLE_NAME;

exports.function = async (event) => {
    
    console.log(event)
    const method = event.requestContext.http.method;

    if (method === 'GET') {
       return await getHello(event)
    } else if (method === 'POST') {
       return await save(event);
    } else {
        return {
            statusCode: 400, 
            body: 'Not a valid operation'
        };
    }  
};

async function save(event) {
    const name = event.queryStringParameters.name;
  
    const item = {
      name: name,
      date: Date.now(),
    };
  
    console.log(item);
    const savedItem = await saveItem(item);
  
    return {
      statusCode: 200,
      body: JSON.stringify(savedItem),
    };
  };
  
async function getHello(event) {
    const name = event.queryStringParameters.name;
  
    const item = await getItem(name);
    console.log(item);
  
    if (item !== undefined && item.date) {
      const d = new Date(item.date);

      const message = `Was greeted on ${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()}`;

      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
      
    } else {
 
      const message = "Nobody was greeted with that name";
      return {
        statusCode: 200,
        body: JSON.stringify(message),
      };
    }
  };
  
async function getItem(name) {
    console.log("getItem");
  
    const params = {
      Key: {
        name: name,
      },
      TableName: TABLE_NAME,
    };
  
    console.log(params);
  
    return dynamo
      .get(params)
      .promise()
      .then((result) => {
        console.log(result);
        return result.Item;
      });
}
  
async function saveItem(item) {
    const params = {
      TableName: TABLE_NAME,
      Item: item,
    };
  
    console.log(params);
  
    return dynamo
      .put(params)
      .promise()
      .then(() => {
        return item;
      });
}