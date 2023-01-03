import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { Google } from "@mui/icons-material"
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder='John Doe'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="email"
              type="email"
              placeholder='email@gmail.com'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder='Your password here'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="password"
              type="password"
              placeholder='Repeat your password'
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>

            <Grid item xs={12}>
              <Button variant='contained' fullWidth>Create Account</Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already has an account?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Sign In
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
