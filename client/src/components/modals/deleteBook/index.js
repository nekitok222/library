import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllBooksWithoutPagination } from 'api/bookAPI';
import { deleteBok } from 'api/bookAPI';

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

export const BookDelete = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [books, setBooks] = useState([])
  const [id, setId] = useState(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const findBooks = () => {
    fetchAllBooksWithoutPagination().then(data => {
        const book = []
        data.map(data => {
            book.push({
                label: data.name,
                id: data.id
            })
        })
        setBooks(book)
    })
  }

  const deleteBookButton = () => {
    deleteBok(id).then(data => {
        setError(false)
        setErrorMessage('')
        handleClose()
    }).catch(e => {
        setError(true)
        setErrorMessage(e.response.data.message)
    })
  }

  useEffect(() => {
    findBooks()
  }, [])

  return (
    <div>
      <Button onClick={handleOpen} size='large' sx={{ width: "100%", margin: 2 }}>Уалить запись Книги</Button>
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
            Удалить Книгу
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Чтобы удалить запись Книги - выберите необходимую
          </Typography>
          <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={books}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Книга" />}
                onChange={(e, str) => {
                    setId(str.id)
                }}
          />
          <Button onClick={deleteBookButton}>Удалить Запись</Button>
        </Box>
      </Modal>
    </div>
  );
}