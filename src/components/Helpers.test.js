import { fetchUserList } from './Helpers.js';

describe('fetchUserList', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
          // Add more sample user data here if needed
        ]),
      });
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should fetch user list sorted by username', async () => {
    const result = await fetchUserList('username');
    expect(result).toEqual([
      { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
      // Add more expected user data here if needed
    ]);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('should fetch user list sorted by email', async () => {
    const result = await fetchUserList('email');
    expect(result).toEqual([
      { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
      // Add more expected user data here if needed
    ]);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('should fetch user list sorted by name (default)', async () => {
    const result = await fetchUserList('name');
    expect(result).toEqual([
      { id: 2, name: 'Jane Smith', username: 'janesmith', email: 'jane@example.com' },
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com' },
      // Add more expected user data here if needed
    ]);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('should handle fetch error and return an empty array', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject('Network error'));
    const result = await fetchUserList('username');
    expect(result).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});