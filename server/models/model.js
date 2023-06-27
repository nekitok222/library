const seq = require('../db')
const {DataTypes} = require('sequelize')

const Books = seq.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.FLOAT(0, 1), validate: {isNumeric: true}},
    date_writing: {type: DataTypes.DATEONLY, allowNull: false}
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

const Author = seq.define('author', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    rating: {type: DataTypes.FLOAT(0, 1), validate: {isNumeric: true}},
    birthday: {type: DataTypes.DATEONLY, allowNull: false}
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

Author.hasMany(Books, {as: 'foreign_key'})
Books.belongsTo(Author)

module.exports = {
    Author,
    Books
}


