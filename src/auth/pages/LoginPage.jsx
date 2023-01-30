import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { useMemo } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth'
import { AuthLayout } from '../layout/AuthLayout'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispatch = useDispatch()

  const { status, errorMessage } = useSelector(state => state.auth)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const { onInputChange, email, password, formState } = useForm(formData)

  const onSubmit = (e) => {
    e.preventDefault()

    console.log('formState:', formState);
    dispatch(startLoginWithEmailAndPassword(formState))
  }

  const onGoogleSignIn = () => {
    console.log('on Google Sign in');
    dispatch(startGoogleSignIn())
  }

  const onEmailAndPasswordSignIn = () => {
    console.log('formState:', formState);

    dispatch(startLoginWithEmailAndPassword(formState))
  }

  return (
    <AuthLayout title="Login">

      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder='email@gmail.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder='your password here'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            container
            spacing={0}
            display={!!errorMessage ? '' : 'none'}
            sx={{ mt: 1 }}
          >

            <Grid item xs={12} >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>

            <Grid item xs={12} sm={6}>
              <Button
                onClick={onEmailAndPasswordSignIn}
                disabled={isAuthenticating}
                type='submit'
                variant='contained'
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant='contained'
                fullWidth
                onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Create an account
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
