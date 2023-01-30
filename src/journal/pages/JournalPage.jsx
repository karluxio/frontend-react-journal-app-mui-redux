import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal'
import { useMemo } from 'react'

export const JournalPage = () => {

  const { isSaving, active } = useSelector(state => state.journal)
  const dispatch = useDispatch()

  const onClickNewNote = useMemo(() => () => {
    dispatch(startNewNote())
  }, [])

  // const onClickNewNote = () => {
  //   dispatch(startNewNote())
  // }

  return (
    <JournalLayout>

      {
        !!active ? <NoteView /> : <NothingSelectedView />
      }

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        onClick={onClickNewNote}
        disabled={isSaving}
      >
        <AddOutlined />
      </IconButton>

    </JournalLayout>
  )
}