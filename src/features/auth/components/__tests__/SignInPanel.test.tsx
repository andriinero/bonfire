import userEvent from '@testing-library/user-event';
import SignInPanel from '../SignInPanel';
import { renderWithProviders } from '@/utils/test-utils';
import { screen, waitFor } from '@testing-library/dom';
import { setupServer } from 'msw/node';
import { HttpResponse, delay, http } from 'msw';

type TSignInBody = {
  email: string;
  password: string;
};

type TSingInResponse =
  | {
      message: string;
      token: string;
    }
  | 'Unauthorized';

const dbUser = {
  id: 'userId',
  username: 'username',
  email: 'valid@email.com',
  password: 'password',
  role: 'user' as const,
};

const handlers = [
  http.get('/api/auth/data', () => {
    return HttpResponse.json('Unauthorized', { status: 401 });
  }),
  // most likely an overkill for a mock
  http.post<never, TSignInBody, TSingInResponse>(
    '/api/auth/sign-in',
    async ({ request }) => {
      await delay(150);

      const signInUser = await request.json();

      const signInSuccess =
        dbUser.email === signInUser.email &&
        dbUser.password === signInUser.password;
      return signInSuccess
        ? HttpResponse.json({ message: 'Success', token: 'newToken' })
        : HttpResponse.json('Unauthorized', { status: 401 });
    },
  ),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders email validation errors correctly', async () => {
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

// should be split into two different test cases?
it('redirects the user on successful authentication', async () => {
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
