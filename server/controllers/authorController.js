const { DateTime } = require("luxon")
const { Author, Books } = require("../models/model")
const seq = require("../db")

class AuthorController {
    async createAuthor(req, res) {
        try {
            const {name, rating, birthdate} = req.body

            if (!name) {
                return res.status(403).json({message: "Отсутствует название автора!"})
            }

            if (!birthdate) {
                return res.status(403).json({message: "Отсутствует дата рождения!"})
            }

            const dateRegexp = new RegExp("^([0-9][1-9])\\.([0-9][1-9])\\.([1-2][0-9]{3})$") // см. 107 строку

            if (!dateRegexp.test(birthdate)) {
                return res.status(403).json({message: "Неверный формат даты!"})
            }


            const response = await Author.create({
                name: name,
                rating: rating ? rating : 0,
                birthday: DateTime.fromFormat(birthdate, 'dd.MM.yyyy').toISO()
            })

            return res.json(true)
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async findAuthor(req, res) {
        try {
            const {id} = req.params

            if (!id) {
                return res.status(403).json({message: "Не указан идентификатор!"})
            }

            const result = await seq.query(`SELECT "id", "name", "rating", "birthday" FROM "authors" AS "author" WHERE "author"."id" = ${id}`)

            return res.json(result[0])
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async findAllAuthors(req, res) {
        try {
            const { page, limit } = req.query 

            let pag = page
            let lim = limit
            if (Number(page) <= 0 || !page) {
                pag = 1
            }

            if (Number(limit) <= 0 || !limit) {
                lim = 10
            }

            const result = await seq.query(`SELECT "id", "name", "rating", "birthday" FROM "authors" AS "author" LIMIT ${lim} OFFSET ${pag - 1}`)
            return res.json(result[0])
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async deleteAuthor(req, res) {
        try {
            const {id} = req.body

            if (!id) {
                return res.status(403).json({message: "Не указан идентификатор!"})
            }

            const result = await Author.findByPk(id)

            if (!result) {
                return res.status(403).json({message: "Данный автор не найден!"})
            }

            const books = await Books.findAll({
                where: {
                    authorId: id
                }
            })

            books.map(async (book) => {
                await book.destroy()
                book.save()
            })

            result.destroy()
            result.save()

            return res.json(true)
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async updateAuthor(req, res) {
        try {
            const {id, name, birthdate, rating} = req.body

            if (!id) {
                return res.status(403).json({message: "Не указан идентификатор!"})
            }

            const result = await Author.findByPk(id)

            if (!result) {
                return res.status(403).json({message: "Данный автор не найден!"})
            }

            if (birthdate) { 
                const dateRegexp = new RegExp("^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{3})$") // Для данного момента лучше сделать функцию, но у меня проблема с vscode поэтому пусть так :)

                if (!dateRegexp.test(birthdate)) {
                    return res.status(403).json({message: "Неверный формат даты!"})
                }
            }

            await result.update({
                name: name ? name : result.name,
                birthday: birthdate ? DateTime.fromFormat(birthdate, 'dd.MM.yyyy').toISO() : result.birthday,
                rating: rating ? rating : result.rating
            })

            return res.json(true)
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async findAllWithoutPagination(req, res) {
        try {
            const result = await seq.query(`SELECT "id", "name", "rating", "birthday" FROM "authors" AS "author"`)

            if (!result) {
                return res.status(403).json({message: "Авторы не найдены!"})
            }

            return res.json(result[0])
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }
}

module.exports = new AuthorController()