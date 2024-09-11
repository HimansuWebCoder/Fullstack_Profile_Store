const profileEditContainer = document.querySelector("#profile-edit-container");
const redirectBtn = document.querySelector("#redirect-arrow-icon");
const profileNameEditor = document.querySelector("#name");
const profilePassionEditor = document.querySelector("#passion");
const submitBtn = document.querySelector("#saveBtn");

redirectBtn.addEventListener("click", () => {
    window.location = "/profile-admin";
});

// submitBtn.addEventListener("click", () => {
//     if (profileNameEditor.value !== "" && profilePassionEditor.value !== "") {
//         fetch("https://fullstack-profile-store-2.onrender.com/profile", {
//             method: "put",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 id: req.session.user.id,
//                 name: profileNameEditor.value,
//                 passion: profilePassionEditor.value,
//             }),
//         }).then(() => {
//             window.location = "/profile-admin";
//         });
//     }
// });

submitBtn.addEventListener("click", () => {
    if (profileNameEditor.value !== "" && profilePassionEditor.value !== "") {
        // Fetch session data to get the user ID
        fetch("https://fullstack-profile-store-2.onrender.com/debug-session")
            .then((response) => response.json())
            .then((sessionData) => {
                console.log(sessionData.sessionID);
                if (sessionData.sessionID) {
                    // Use the user ID from session data
                    fetch(
                        "https://fullstack-profile-store-2.onrender.com/profile",
                        {
                            method: "put",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify({
                                id: sessionData.sessionID, // Use sessionID or adjust as needed
                                name: profileNameEditor.value,
                                passion: profilePassionEditor.value,
                            }),
                        },
                    );
                } else {
                    console.error("Failed to fetch session ID");
                }
            })
            .catch((error) => console.error("Error:", error));
    }
});

// .then(() => {
//                         window.location = "/profile-admin";
//                     });
