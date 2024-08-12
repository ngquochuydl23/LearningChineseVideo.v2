httpOk = (res, result, msg) => {
    return res
        .status(200)
        .send({
            statusCode: 200,
            result,
            msg
        });
}

http201 = (res, result, msg) => {
    return res
        .status(201)
        .send({
            statusCode: 201,
            result,
            msg
        });
}

module.exports = { httpOk, http201 }