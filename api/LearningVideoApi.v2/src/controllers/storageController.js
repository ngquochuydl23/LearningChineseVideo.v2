const { AppException } = require("../exceptions/AppException");
const fs = require("fs");

exports.uploadFile = async (req, res, next) => {
    try {
        const files = req.files;
        if (!files) {
            throw new AppException('Please upload a file');
        }

        var medias = files.map((file) => ({
            size: file.size,
            url: "/storage/" + file.mimetype.split("/")[0] + "/" + file.filename,
            mimetype: file.mimetype,
            filename: file.originalname
        }));

        return res
            .status(201)
            .send({
                statusCode: 201,
                result: {
                    medias
                }
            });

    } catch (error) {
        next(error);
    }
}

exports.serveFile = async (req, res, next) => {
    const filetype = req.params.filetype;

    try {
        if (filetype !== 'video') {

            const videoPath = "./uploads/" + req.params.filename;
            var readStream = fs.createReadStream(videoPath);
            readStream.on('error', function (err) {
                return res
                    .status(404)
                    .send({
                        statusCode: 404,
                        result: {
                            error: 'Image not found'
                        }
                    });
            });

            readStream.pipe(res);
        } else {
            const range = req.headers.range;
            if (!range) {
                return res.status(400).send("Requires Range header");
            }

            const videoPath = "./uploads/" + req.params.filename;
            const videoSize = fs.statSync(videoPath).size;

            const CHUNK_SIZE = 10 ** 6; // 1MB
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };

            res.writeHead(206, headers);

            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            return res
                .status(404)
                .send({
                    statusCode: 404,
                    result: {
                        error: 'Video at ' + error.path + " not found"
                    }
                });
        }

        next(error);
    }
}


