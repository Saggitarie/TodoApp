const baseURL = "https://localhost:3000";

const deleteButton = document.getElementById("deleteButton");
console.log(deleteButton);

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