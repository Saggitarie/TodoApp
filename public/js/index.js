const baseURL = "https://localhost:3000";

window.onload = () => {

  // this is a very simple check to see if there's a username stored
  if (!localStorage.getItem('username')) {
    // prompt for one from user if not
    const userInput = window.prompt('Enter your username');

    const getUsername = fetch(`/api/users/${userInput}`).then(res => {
      return res.json();
    }).then(res => console.log(res));

    console.log(getUsername);
    // localStorage.setItem('username', username);
  } else {
    // window.username = localStorage.getItem('username');
  }
};

const deleteButton = document.getElementById("deleteButton");

const deleteSingleEvent = async (e) => {
  const response = await fetch(`/api/event/5`,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, body: JSON.stringify({ id: 5 }) // body data type must match "Content-Type" header
    }
  );
}

deleteButton.addEventListener("click", deleteSingleEvent);