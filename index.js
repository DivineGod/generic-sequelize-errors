var errors = require('generic-errors');

function convert(Sequelize, error) {
    if (error instanceof Sequelize.BaseError) {
        return new errors.BaseError({ message: error.message });
    }
    return error;
}

module.exports = function (Sequelize, error) {
    if (!error) {
        return convert.bind(null, Sequelize);
    }
    return convert(Sequelize, error);
};
