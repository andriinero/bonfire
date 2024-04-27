import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { findByRole, screen, waitFor } from '@testing-library/dom';
import { HttpResponse, delay, http } from 'msw';

import { renderWithProviders } from '@/utils/test-utils';
import { serverHandlers, testData } from '@/mocks/serverMock';

import SignInPanel from '../SignInPanel';

const testServerData = testData;

const handlers = [...serverHandlers];

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

it('redirects the user on successful authentication', async () => {
  renderWithProviders(<SignInPanel />);
  const user = userEvent.setup();

  const emailField = screen.getByRole('textbox', { name: 'Email address' });
  const passwordField = screen.getByLabelText('Password');
  const submit = screen.getByRole('button', { name: 'Sign In' });

  await user.type(emailField, 'valid@email.com');
  await user.type(passwordField, 'password');
  await user.click(submit);

  await waitFor(() => {
    expect(submit).not.toBeInTheDocument();
  });
});

it("doesn't redirect user on unsuccessful authentication", async () => {
  server.use(
    http.post('/api/auth/sign-in', async () => {
      await delay(150);
      return HttpResponse.json('Unauthorized', { status: 401 });
    }),
  );
  renderWithProviders(<SignInPanel />);
  const user = userEvent.setup();

  const emailField = screen.getByRole('textbox', { name: 'Email address' });
  const passwordField = screen.getByLabelText('Password');
  const submit = screen.getByRole('button', { name: 'Sign In' });
  await user.type(emailField, 'invalid@email.com');
  await user.type(passwordField, 'invalid pass');
  await user.click(submit);

  expect(submit).toBeInTheDocument();
});
