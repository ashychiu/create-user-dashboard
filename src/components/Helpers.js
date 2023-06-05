export const fetchUserList = async (sortType) => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const userData = await res.json();
      if (sortType === 'username') {
        userData.sort((a, b) => a.username.localeCompare(b.username));
      } else if (sortType === 'email') {
        userData.sort((a, b) => a.email.localeCompare(b.email));
      } else {
        userData.sort((a, b) => a.name.localeCompare(b.name));
      }
      return userData;
    } catch (err) {
      console.log(err);
      return [];
    }
  };