import userEvent from '@testing-library/user-event';
import SignInPanel from '../SignInPanel';
import { renderWithProviders } from '@/utils/test-utils';
import { queryByRole, screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';
import { HttpResponse, delay, http } from 'msw';
import { AuthData } from '@/types/AuthData';

type TSignInBody = {
  email: string;
  password: string;
};

type TSingInResponse =
  | {
      message: string;
      token: string;
    }
  | string;

type TGetAuthDataResponse = AuthData | string;

const dbUser = {
  id: 'userId',
  username: 'username',
  email: 'valid@email.com',
  password: 'password',
  role: 'user' as const,
};

const token = 'newToken';

const handlers = [
  // TODO: unnecessary, reuse in other component
  // http.get<never, never, TGetAuthDataResponse>(
  //   '/api/auth/data',
  //   async ({ request }) => {
  //     await delay(150);
  //     const headersToken = request.headers.get('authorization')?.split(' ')[1];
  //     return headersToken === token
  //       ? HttpResponse.json({
  //           sub: dbUser.id,
  //           username: dbUser.username,
  //           email: dbUser.email,
  //           role: dbUser.role,
  //         })
  //       : HttpResponse.json('Unauthorized', { status: 401 });
  //   },
  // ),
  http.get('/api/auth/data', () => {
    return HttpResponse.json('Unauthorized', { status: 401 });
  }),
  http.post<never, TSignInBody, TSingInResponse>(
    '/api/auth/sign-in',
    async ({ request }) => {
      await delay(150);

      const signInUser = await request.json();

      const signInSuccess =
        dbUser.email === signInUser.email &&
        dbUser.password === signInUser.password;
      return signInSuccess
        ? HttpResponse.json({ message: 'Success', token })
        : HttpResponse.json('Unauthorized', { status: 401 });
    },
  ),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers;
});

afterAll(() => {
  server.close();
});

it('renders valid response based on user email input', async () => {
  renderWithProviders(<SignInPanel />);
  const user = userEvent.setup();

  const emailField = screen.getByRole('textbox', { name: 'Email address' });
  const submit = screen.getByRole('button', { name: 'Sign In' });
  await user.type(emailField, 'foo');
  await user.click(submit);
  const emailErrorLabel = screen.getByText('Invalid email', {
    exact: false,
  });
  expect(emailErrorLabel).toHaveClass('visible');

  await user.clear(emailField);
  await user.type(emailField, 'valid@email.com');
  expect(emailErrorLabel).toHaveClass('invisible');
});

it('submits the form on valid user input and processes the response', async () => {
  renderWithProviders(<SignInPanel />);
  const user = userEvent.setup();

  const emailField = screen.getByRole('textbox', { name: 'Email address' });
  const passwordField = screen.getByLabelText('Password');
  const submit = screen.getByRole('button', { name: 'Sign In' });
  await user.type(emailField, 'invalid email');
  await user.type(passwordField, 'invalid pass');
  await user.click(submit);
  expect(submit).toBeInTheDocument();

  await user.clear(emailField);
  await user.clear(passwordField);
  await user.type(emailField, 'valid@email.com');
  await user.type(passwordField, 'password');
  await user.click(submit);
  await waitFor(() => {
    expect(submit).not.toBeInTheDocument();
  });
});
