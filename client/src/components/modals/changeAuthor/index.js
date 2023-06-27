import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Autocomplete, Input, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchAllAuthorsWithoutPagination } from 'api/AuthorAPI';
import { updateAuthor } from 'api/AuthorAPI';

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

export const AuthorChange = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null)
  const [birthday, setBirthday] = useState('')
  const [name, setName] = useState('')
  const [authors, setAuthors] = useState([])
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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

  const changeAuthorButton = () => {
    const req = {
        id: id,
    }

    if (name) {
        req.name = name
    }

    if (birthday) {
        req.birthdate = birthday
    }

    if (rating) {
        req.rating = rating
    }
    updateAuthor(req).then(data => {
        setName('')
        setRating(null)
        setBirthday('')
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
      <Button onClick={handleOpen} size='large' sx={{ width: "100%", margin: 2 }}>Изменить запись Автора</Button>
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
            Создать автора
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Для изменения записи - выберите сначала автора, а потом введите необходимые данные
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
            <Input onChange={e => setName(e.target.value)} placeholder='ФИО' sx={{margin: 2}}/>
            <Input onChange={e => setBirthday(e.target.value)} placeholder='01.07.2000' sx={{margin: 2}}/>
            <Input onChange={e => setRating(e.target.value)} placeholder='Рейтинг, если имеется в формате 5.0' sx={{margin: 2, width: 250}}/>
            <Button onClick={changeAuthorButton}>Изменить запись</Button>
        </Box>
      </Modal>
    </div>
  );
}