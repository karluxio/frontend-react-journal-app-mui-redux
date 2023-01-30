import { DeleteOutline } from "@mui/icons-material"
import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"

export const NoteView = () => {

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const { title, body, onInputChange, date, formState } = useForm(note)

  const formDate = useMemo(() => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(newDate);
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved?.length > 0) {
      Swal.fire('updated note', messageSaved, 'success')
    }
  }, [messageSaved])

  // const onSaveNote = useMemo(() => {
  //   dispatch(startSaveNote())
  // }, [])

  // const onSaveNote = useCallback(() => { dispatch(startSaveNote()) }, [])


  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  // const onFileInputChange = useMemo(() => {
  //   console.log('onChange event fired');

  // }, [])

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return

    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  const fileInputRef = useRef()

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{formDate}</Typography>
      </Grid>

      <input
        type="file"
        multiple
        onChange={onFileInputChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <IconButton
        color="primary"
        disabled={isSaving}
        onClick={() => fileInputRef.current.click()}
      >
        <UploadFileOutlined />
      </IconButton>

      <Grid item>
        <Button
          color='primary'
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder="Add a title"
          label="Title"
          sx={{ border: 'none', mb: 1 }}
          onChange={onInputChange}
          name="title"
          value={title}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          onChange={onInputChange}
          name="body"
          value={body}
        />
      </Grid>

      <Grid container justifyContent="flex-end">
        <Button
          onClick={onDelete}
          sx={{ mt: 2 }}
          color="error"
        >
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      {/* Image Gallery */}
      {note.imageUrls && <ImageGallery images={note.imageUrls} />}
    </Grid >
  )
}