const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid')

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'ProductsTable'

module.exports.createProduct = async (event) => {
    const { name, price } = JSON.parse(event.body)
    if (!name || !price) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Name and price are required' }),
        }
    }

    const product = {
        id: uuidv4(),
        name,
        price,
    }

    const params = {
        TableName: TABLE_NAME,
        Item: product,
    }

    try {
        await dynamoDb.put(params).promise()
        return {
            statusCode: 201,
            body: JSON.stringify(product),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        }
    }
}

module.exports.getProducts = async () => {
    const params = {
        TableName: TABLE_NAME,
    }

    try {
        const data = await dynamoDb.scan(params).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        }
    }
}
