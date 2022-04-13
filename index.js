const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  id: String,
  name: String,
  phone: String,
});

const personModel = dynamoose.model('persons', personSchema);

exports.handler = async (event) => {
  console.log(event.pathParameters, event.queryStringParameters);

  let response = { statusCode: null, body: null };

  try {
  

    let personRecords = await personModel.scan().exec();
    console.log(personRecords);
    response.statusCode = 200;
    response.body = JSON.stringify(personRecords);
  } catch(e) {
    console.error(e);
    response.statusCode = 500;
    response.body = JSON.stringify(new Error('couldnt read from persons'));
  }

  return response;
};