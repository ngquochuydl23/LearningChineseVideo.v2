httpOk = (res, result, msg) => {
    return res
        .status(200)
        .send({
            statusCode: 200,
            result,
            msg
        });
}


httpOkAsCollection = (res, result, total, offset, limit) => {
    return res
        .status(200)
        .send({
            statusCode: 200,
            total,
            offset,
            limit,
            result
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

module.exports = { httpOk, http201, httpOkAsCollection }