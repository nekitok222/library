import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Input } from '@mui/material';
import { useState } from 'react';
import { createAuthor } from 'api/AuthorAPI';

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

export const AuthorCreate = () => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(null)
  const [birthday, setBirthday] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createAuthorButton = () => {
    createAuthor({name: name, birthdate: birthday, rating: rating ? rating : 0.0}).then(data => {
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

  return (
    <div>
      <Button onClick={handleOpen} size='large' sx={{ width: "100%", margin: 2 }}>Создать запись автора</Button>
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
            Для создания автора укажите такие записи как ФИО автора, дату рождения и по желанию рейтинг
          </Typography>
          <Input onChange={e => setName(e.target.value)} placeholder='ФИО' sx={{margin: 2}}/>
          <Input onChange={e => setBirthday(e.target.value)} placeholder='01.07.2000' sx={{margin: 2}}/>
          <Input onChange={e => setRating(e.target.value)} placeholder='Рейтинг, если имеется в формате 5.0' sx={{margin: 2, width: 250}}/>
          <Button onClick={createAuthorButton}>Создать запись</Button>
        </Box>
      </Modal>
    </div>
  );
}
