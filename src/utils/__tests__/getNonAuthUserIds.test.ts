import getNonAuthUserIds from '../getNonAuthUserIds';
import TestData from '../TestData';

it('filters out the auth user id', () => {
  const testUsers = TestData.getMultipleRandomUsers(3);
  const authUserId = testUsers[0]._id;
  const expectedUserIds = testUsers.slice(1, 3).map((u) => u._id);

  const nonAuthUserIds = getNonAuthUserIds(authUserId, testUsers);

  expect(nonAuthUserIds).toEqual(expectedUserIds);
});
