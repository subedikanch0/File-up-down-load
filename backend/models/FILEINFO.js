const Sequelize = require("sequelize")
const db = require('../database/db');

module.exports = db.sequelize.define(
    'fileinfo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fileName: {
        type: Sequelize.STRING
    },
    extensionType: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    fileSize: {
        type: Sequelize.STRING
    },
    uploadDate: {
        type: Sequelize.DATEONLY
    }
}, {
    // freezeTableName: true,
    timestamps: false
}
)
