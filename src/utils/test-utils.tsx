import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../app/store';
import { makeStore } from '../app/store';
import { BrowserRouter } from 'react-router-dom';
import { User } from '@/types/User';
import { ar, faker, fakerEN } from '@faker-js/faker';
import { Message } from '@/types/Message';
import { ChatRoom } from '@/types/ChatRoom';
import { z } from 'zod';
import { MessageType } from '@/types/MessageType';
import { AuthData } from '@/types/AuthData';

/**
 * This type extends the default options for
 * React Testing Library's render function. It allows for
 * additional configuration such as specifying an initial Redux state and
 * a custom store instance.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  /**
   * Defines a specific portion or the entire initial state for the Redux store.
   * This is particularly useful for initializing the state in a
   * controlled manner during testing, allowing components to be rendered
   * with predetermined state conditions.
   */
  preloadedState?: Partial<RootState>;

  /**
   * Allows the use of a specific Redux store instance instead of a
   * default or global store. This flexibility is beneficial when
   * testing components with unique store requirements or when isolating
   * tests from a global store state. The custom store should be configured
   * to match the structure and middleware of the store used by the application.
   *
   * @default makeStore(preloadedState)
   */
  store?: AppStore;
}

/**
 * Renders the given React element with Redux Provider and custom store.
 * This function is useful for testing components that are connected to the Redux store.
 *
 * @param ui - The React component or element to render.
 * @param extendedRenderOptions - Optional configuration options for rendering. This includes `preloadedState` for initial Redux state and `store` for a specific Redux store instance. Any additional properties are passed to React Testing Library's render function.
 * @returns An object containing the Redux store used in the render, User event API for simulating user interactions in tests, and all of React Testing Library's query functions for testing the component.
 */
export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = makeStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export const createRandomUser = (): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet.userName({ firstName, lastName });
  const email = faker.internet.email({ firstName, lastName });

  return {
    _id: faker.string.uuid(),
    username,
    email,
    role: 'user',
    created: faker.date.recent().toISOString(),
    is_online: faker.helpers.arrayElement<boolean>([true, false]),
    profile_image: faker.image.avatar(),
  };
};

export const getAuthDataFromUser = (user: User): AuthData => {
  return {
    sub: user._id,
    username: user.username,
    email: user.email,
    role: 'user',
  };
};

export const createChatRoom = (): ChatRoom => {
  return {
    _id: faker.string.uuid(),
    created: faker.date.recent().toISOString(),
  };
};

export const createRandomUserMessage = (
  chatRoomId: string,
  userId: string,
): Message => {
  return {
    _id: faker.string.uuid(),
    chat_room: chatRoomId,
    user: userId,
    body: faker.lorem.sentence(),
    created: faker.date.recent().toISOString(),
    reply: null,
    type: MessageType.MESSAGE,
  };
};

export const getMultipleRandomMessages = (
  count: number,
  chatRoomId: string,
  userId: string,
) => {
  const result: Message[] = [];
  for (let i = 0; i < count; i++)
    result.push(createRandomUserMessage(chatRoomId, userId));

  return result;
};
