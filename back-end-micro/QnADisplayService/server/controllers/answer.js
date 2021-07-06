const models = require('../models');
const Answer = models.Answer;

// create answer using Sequelize ORM after corresponding notification by bus
module.exports = {
    async create(answer) {
        return Answer.create(answer);
    }
};