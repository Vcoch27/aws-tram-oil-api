module.exports.getOrders = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'GET /orders success!' }),
    };
};

module.exports.createOrder = async (event) => {
    const body = JSON.parse(event.body || '{}');

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: 'POST /orders created!',
            data: body,
        }),
    };
};
