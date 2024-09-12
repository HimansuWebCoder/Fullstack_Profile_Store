const profileEditContainer = document.querySelector("#profile-edit-container");
const redirectBtn = document.querySelector("#redirect-arrow-icon");
const profileNameEditor = document.querySelector("#name");
const profilePassionEditor = document.querySelector("#passion");
const submitBtn = document.querySelector("#saveBtn");

redirectBtn.addEventListener("click", () => {
    window.location = "/profile-admin";
});

const id = 31;
submitBtn.addEventListener("click", () => {
    if (profileNameEditor.value !== "" && profilePassionEditor.value !== "") {
        fetch(`https://fullstack-profile-store-2.onrender.com/profile/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                // No need to send 'id', it is managed on the server-side
                name: profileNameEditor.value,
                passion: profilePassionEditor.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Response data:", data);
                // window.location = "/profile-admin"; // Redirect on success
            })
            .catch((err) => console.error("Error:", err));
    }
});
