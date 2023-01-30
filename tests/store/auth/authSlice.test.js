import { AuthSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixture"

describe('testing on authSlice', () => {
  test('should return initial state and AuthSlice with name "auth"', () => {

    const state = AuthSlice.reducer(initialState, {})

    expect(state).toEqual(initialState)
    expect(AuthSlice.name).toBe("auth")

  })

  test("should do the authentication", () => {
    // console.log(login(demoUser));

    const state = AuthSlice.reducer(initialState, login(demoUser))

    expect(state).toEqual({
      status: 'authenticated', // 'checking', 'not authenticated' , 'authenticated'
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null
    })
  })

  test('should do the logout without args', () => {
    const state = AuthSlice.reducer(authenticatedState, logout())

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage: undefined })
  })

  test('should do the logout with args', () => {
    const errorMessage = 'wrong credentials'
    const state = AuthSlice.reducer(authenticatedState, logout({ errorMessage }))

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage })
  })

  test('should change status to checking', () => {
    const state = AuthSlice.reducer(authenticatedState, checkingCredentials())

    expect(state.status).toEqual('checking')
  })
})