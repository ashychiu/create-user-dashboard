import { fetchUserList } from './Helpers.js';

describe('fetchUserList', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch');
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('fetches and sorts user list by username', async () => {
    const mockUserList = [
      { id: 1, username: 'john', email: 'john@example.com', name: 'John' },
      { id: 2, username: 'alice', email: 'alice@example.com', name: 'Alice' },
    ];

    window.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUserList),
    });

    const sortedUserList = await fetchUserList('username');

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

    expect(sortedUserList).toEqual([
      { id: 2, username: 'alice', email: 'alice@example.com', name: 'Alice' },
      { id: 1, username: 'john', email: 'john@example.com', name: 'John' },
    ]);
  });

  it('handles error when fetching user list', async () => {
    const errorMessage = 'Failed to fetch user list';

    window.fetch.mockRejectedValue(new Error(errorMessage));

    const sortedUserList = await fetchUserList('username');

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');

    expect(sortedUserList).toEqual([]);
  });
});
