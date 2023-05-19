const listUser = (cabang) => {
  fetch(`http://localhost:3000/api/auth/user/${cabang}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default listUser;
