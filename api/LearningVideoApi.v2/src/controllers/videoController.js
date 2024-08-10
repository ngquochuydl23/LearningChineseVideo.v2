
const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');

var models = initModels(sequelize);

exports.getVideos = async (req, res, next) => {
    try {
        const videos = await models.Video.findAll({ where: {}, logging: console.log });
        return res
            .status(201)
            .send({
                statusCode: 201,
                result: {
                    videos
                }
            });
    } catch (error) {
        next(error);
    }
}