import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth"
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startCreatingUserWithEmailAndPassword,
  startLogout
} from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal"

import { demoUser } from "../../fixtures/authFixture"

jest.mock('../../../src/firebase/providers') // mock all providers like signInWithGoogle

describe('testing on auth/thunks', () => {

  const dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should invoke checkingCredentials ', async () => {
    await checkingAuthentication()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
  })

  test("startGoogleSignIn should call checkingCredentials - login successful", async () => {
    const loginData = { ok: true, ...demoUser }

    // firebase mock function
    await signInWithGoogle.mockResolvedValue(loginData) // mock going to return loginData

    //thunk
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test("startGoogleSignIn should call checkingCredentials - logout - Error", async () => {
    const loginData = { ok: false, errorMessage: 'error in Google' }

    // firebase mock function
    await signInWithGoogle.mockResolvedValue(loginData) // mock going to return loginData

    //thunk
    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startLoginWithEmailAndPassword should call checkingCredentials - login successful', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }

    await loginWithEmailAndPassword.mockResolvedValue(loginData)

    await startLoginWithEmailAndPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
    expect()
  })

  test('should startLogout should call logoutFirebase, clearNotes and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })

  test('startCreatingUserWithEmailAndPassword should call checkingCredentials - logout - Error', async () => {
    const registerData = { ok: false, errorMessage: 'Login error' }
    const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }

    await registerUserWithEmailAndPassword.mockResolvedValue(registerData)

    await startCreatingUserWithEmailAndPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: registerData.errorMessage }))
  })
})