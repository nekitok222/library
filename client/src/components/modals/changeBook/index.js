import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Autocomplete, Input, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllAuthorsWithoutPagination } from 'api/AuthorAPI';
import { fetchAllBooksWithoutPagination } from 'api/bookAPI';
import { updateBook } from 'api/bookAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BookChange = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null)
  const [dateWriting, setDateWriting] = useState('')
  const [idBook, setIdBook] = useState(null)
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [book, setBook] = useState([])
  const [authors, setAuthors] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [authorId, setAuthorId] = useState(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const findAuthor = () => {
    fetchAllAuthorsWithoutPagination().then(data => {
        const authors = []
        data.map(data => {
            authors.push({
                label: data.name,
                id: data.id
            })
        })
        setAuthors(authors)
    })
  }

  const findBook = () => {
    fetchAllBooksWithoutPagination().then(data => {
        const book = []
        data.map(data => {
            book.push({
                label: data.name,
                id: data.id
            })
        })
        setBook(book)
    })
  }

  const changeAuthorButton = () => {
    const req = {
        id: idBook,
    }

    if (name) {
        req.name = name
    }

    if (dateWriting) {
        req.dateWriting = dateWriting
    }

    if (rating) {
        req.rating = rating
    }

    if (price) {
        req.price = price
    }

    if (authorId) {
        req.authorId = authorId
    }
    if (authorId) {}
    updateBook(req).then(data => {
        setName('')
        setRating(null)
        setDateWriting('')
        setError(false)
        setErrorMessage('')
        handleClose()
    }).catch(e => {
        setError(true)
        setErrorMessage(e.response.data.message)
    })
  }

  useEffect(() => {
    findBook()
    findAuthor()
  }, [])

  return (
    <div>
      <Button onClick={handleOpen} size='large' sx={{ width: "100%", margin: 2 }}>Изменить запись Книги</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        { error 
            ? 
                <Alert severity="error">{errorMessage}</Alert>
            : 
                <div></div>
        }
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Изменить запись Книги
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Для изменения записи - выберите сначала книгу, а потом введите необходимые данные
          </Typography>
          <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={book}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Книга" />}
                onChange={(e, str) => {
                    setIdBook(str.id)
                }}
          />
          <Input onChange={e => setName(e.target.value)} placeholder='Название книги' sx={{margin: 2}}/>
          <Input onChange={e => setDateWriting(e.target.value)} placeholder='01.07.2000' sx={{margin: 2}}/>
          <Input onChange={e => setRating(e.target.value)} placeholder='Рейтинг, если имеется в формате 5.0' sx={{margin: 2, width: 250}}/>
          <Input onChange={e => setPrice(e.target.value)} placeholder='Цена' sx={{margin: 2, width: 250}}/>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={authors}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Автор" />}
            onChange={(e, str) => {
                setAuthorId(str.id)
            }}
          />
            <Button onClick={changeAuthorButton}>Изменить запись</Button>
        </Box>
      </Modal>
    </div>
  );
}