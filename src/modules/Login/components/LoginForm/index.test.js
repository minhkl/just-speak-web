import React from 'react';
import {
  render, fireEvent, screen, act,
} from '@testing-library/react';
import { LoginFormBase } from './index';

describe('Test LoginForm', () => {
  fit('should call requestLogin func when click Login button', async (done) => {
    const testUsername = 'testuser';
    const testPassword = 'anypassword';
    const requestLogin = jest.fn();
    render(<LoginFormBase requestLogin={requestLogin} />);

    const usernameInput = screen.getByPlaceholderText('Username');
    expect(usernameInput).toBeInTheDocument();
    fireEvent.change(usernameInput, { target: { value: testUsername } });

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
    fireEvent.change(passwordInput, { target: { value: testPassword } });

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    await act(() => Promise.resolve());

    expect(requestLogin).toHaveBeenCalledTimes(1);
    expect(requestLogin).toHaveBeenCalledWith({
      username: testUsername,
      password: testPassword,
    });
    done();
  });
});
