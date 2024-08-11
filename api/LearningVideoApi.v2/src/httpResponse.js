httpOk = (res, result, msg) => {
    return res
        .status(200)
        .send({
            statusCode: 200,
            result,
            msg
        });
}


module.exports = { httpOk }