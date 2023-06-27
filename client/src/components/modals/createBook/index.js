import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Autocomplete, Input, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { createBook } from 'api/bookAPI';
import { fetchAllAuthorsWithoutPagination } from 'api/AuthorAPI';

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

export const BookCreate = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null)
  const [dateWriting, setDateWriting] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [idAuthor, setIdAuthor] = useState(null)
  const [authors, setAuthors] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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

  const createBookButton = () => {
    createBook({name: name, dateWriting: dateWriting, rating: rating ? rating : 0.0, authorId: idAuthor, price: price}).then(data => {
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
    findAuthor()
  }, [])

  return (
    <div>
      <Button onClick={handleOpen} size='large' sx={{ width: "100%", margin: 2 }}>Создать запись книги</Button>
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
            Создать Книгу
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Для создания книги укажите такие записи как название книги, дату написания и по желанию рейтинг. Так же установите цену и автора книги.
          </Typography>
          <Input onChange={e => setName(e.target.value)} placeholder='Название книги' sx={{margin: 2}}/>
          <Input onChange={e => setDateWriting(e.target.value)} placeholder='01.07.2000' sx={{margin: 2}}/>
          <Input onChange={e => setRating(e.target.value)} placeholder='Рейтинг, если имеется в формате 5.0' sx={{margin: 2, width: 250}}/>
          <Input onChange={e => setPrice(e.target.value)} placeholder='Введите цену' sx={{margin: 2, width: 250, marginBottom: 2}}/>
          <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={authors}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Автор" />}
                onChange={(e, str) => {
                    setIdAuthor(str.id)
                }}
          />
          <Button onClick={createBookButton}>Создать запись</Button>
        </Box>
      </Modal>
    </div>
  );
}