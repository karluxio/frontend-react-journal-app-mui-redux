import { render, screen, fireEvent } from "@testing-library/react"

import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"

import { LoginPage } from "../../../src/auth/pages"
import { AuthSlice } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixtures/authFixture"

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailAndPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks.js', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailAndPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailAndPassword({ email, password })
  },
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

describe('testing on LoginPage', () => {

  beforeEach(() => jest.clearAllMocks())

  test('should match against snapshot', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    // screen.debug()
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)
  })

  test('google button should call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const button = screen.getByLabelText('google-btn')
    fireEvent.click(button)
    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('submit should call startLoginWithEmailPassword', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    )

    const email = 'lu@email.com'
    const password = '123ABC'

    const emailField = screen.getByRole('textbox', { name: /email/i })
    fireEvent.change(emailField, { target: { name: 'email', value: email } })

    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, { target: { name: 'password', value: password } })

    const loginForm = screen.getByLabelText('submit-form')
    fireEvent.submit(loginForm)

    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({ email, password })
  })

})