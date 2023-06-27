import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllAuthorsWithoutPagination } from 'api/AuthorAPI';
import { deleteAuthor } from 'api/AuthorAPI';

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

export const AuthorDelete = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [authors, setAuthors] = useState([])
  const [id, setId] = useState(null)
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

  const deleteAuthorButton = () => {
    deleteAuthor(id).then(data => {
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
      <Button onClick={handleOpen} size='large' sx={{ width: "100%", margin: 2 }}>Уалить запись Автора</Button>
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
            Удалить Автора
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Чтобы удалить запись Автора - выберите необходимого
          </Typography>
          <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={authors}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Автор" />}
                onChange={(e, str) => {
                    setId(str.id)
                }}
          />
          <Button onClick={deleteAuthorButton}>Удалить Запись</Button>
        </Box>
      </Modal>
    </div>
  );
}