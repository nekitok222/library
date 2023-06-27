const { DateTime } = require("luxon")
const { Books, Author } = require("../models/model")
const seq = require("../db")

class BookController {
    async createBook(req, res) {
        try {
            const {name, price, rating, dateWriting, authorId} = req.body

            if (!name) {
                return res.status(403).json({message: "Отсутствует название книги!"})
            }

            if (!price) {
                return res.status(403).json({message: "Отсутствует цена!"})
            }

            if (!dateWriting) {
                return res.status(403).json({message: "Отсутствует дата написания!"})
            }

            if (!authorId) {
                return res.status(403).json({message: "Отсутствует автор!"})
            }

            const author = await Author.findByPk(authorId)

            if (!author) {
                return res.status(403).json({message: "Данный автор не найден!"})
            }

            const dateRegexp = new RegExp("^([0-9][1-9])\\.([0-9][1-9])\\.([1-2][0-9]{3})$")

            if (!dateRegexp.test(dateWriting)) {
                return res.status(403).json({message: "Неверный формат даты!"})
            }

            const book = await Books.findOne({
                where: {
                    name: name
                }
            })

            if (book) {
                return res.status(403).json({message: "Книга с таким названием уже существует!"})
            }

            const response = Books.create({
                name: name,
                price: price,
                rating: rating ? rating : 0,
                date_writing: DateTime.fromFormat(dateWriting, 'dd.MM.yyyy').toISO(),
                authorId: authorId
            })

            return res.json(true)
        } catch(e) {
            console.log(e)
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async findBook(req, res) {
        try {
            const {id} = req.params

            if (!id) {
                return res.status(403).json({message: "Не указан идентификатор!"})
            }

            const result = await seq.query(`SELECT "books"."id",
                "books"."name", 
                "books"."price", 
                "books"."rating", 
                "books"."date_writing", 
                "books"."authorId",  
                "author"."name" AS "author"
                FROM "books" AS "books" 
                LEFT OUTER JOIN "authors" AS "author" 
                ON "books"."authorId" = "author"."id" 
                WHERE "books"."id" = ${id}
                `)
            return res.json(result[0])
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async findAllBook(req, res) {
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

            const result = await seq.query(`SELECT 
                "books"."id", 
                "books"."name", 
                "books"."price", 
                "books"."rating", 
                "books"."date_writing", 
                "author"."name" AS "author"
                FROM "books" AS "books" 
                LEFT OUTER JOIN "authors" AS "author"
                ON "books"."authorId" = "author"."id" 
                LIMIT ${lim} OFFSET ${pag - 1}
            `)

            return res.json(result[0])
        } catch(e) {
            console.log(e)
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async deleteBook(req, res) {
        try {
            const {id} = req.body

            if (!id) {
                return res.status(403).json({message: "Не указан идентификатор!"})
            }

            const result = await Books.findByPk(id)

            if (!result) {
                return res.status(403).json({message: "Данная книга не найдена!"})
            }

            result.destroy()
            result.save()

            return res.json(true)
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async updateBook(req, res) {
        try {
            const {id, name, dateWriting, rating, price, authorId} = req.body

            if (!id) {
                return res.status(403).json({message: "Не указан идентификатор!"})
            }

            const result = await Books.findByPk(id)

            if (!result) {
                return res.status(403).json({message: "Данная книга не найдена!"})
            }

            if (dateWriting) { 
                const dateRegexp = new RegExp("^([0-9]{2})\\.([0-9]{2})\\.([1-2][0-9]{3})$")

                if (!dateRegexp.test(dateWriting)) {
                    return res.status(403).json({message: "Неверный формат даты!"})
                }
            }

            await result.update({
                name: name ? name : result.name,
                date_writing: dateWriting ? DateTime.fromFormat(birthdate, 'dd.MM.yyyy').toISO() : result.birthday,
                rating: rating ? rating : result.rating,
                price: price ? price : result.price,
                authorId: authorId ? authorId : result.authorId
            })

            return res.json(true)
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }

    async getBooksWithoutPagination(req, res) {
        try {
            const result = await seq.query(`SELECT "id", "name", "rating", "date_writing", "authorId" FROM "books" AS "book"`)

            if (!result) {
                return res.status(403).json({message: "Книги не найдены!"})
            }

            return res.json(result[0])
        } catch(e) {
            return res.status(500).json({message: "Произошла непредвиденная ошибка!"})
        }
    }
}

module.exports = new BookController()