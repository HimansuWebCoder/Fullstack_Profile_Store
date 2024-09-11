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

// submitBtn.addEventListener("click", () => {
//     if (profileNameEditor.value !== "" && profilePassionEditor.value !== "") {
//         // Fetch session data to get the user ID
//         fetch("https://fullstack-profile-store-2.onrender.com/debug-session")
//             .then((response) => response.json())
//             .then((sessionData) => {
//                 console.log(sessionData.sessionID);
//                 if (sessionData.sessionID) {
//                     // Use the user ID from session data
//                     fetch(
//                         "https://fullstack-profile-store-2.onrender.com/profile",
//                         {
//                             method: "put",
//                             headers: { "Content-Type": "application/json" },
//                             credentials: "include",
//                             body: JSON.stringify({
//                                 id: sessionData.sessionID, // Use sessionID or adjust as needed
//                                 name: profileNameEditor.value,
//                                 passion: profilePassionEditor.value,
//                             }),
//                         },
//                     );
//                 } else {
//                     console.error("Failed to fetch session ID");
//                 }
//             })
//             .catch((error) => console.error("Error:", error));
//     }
// });

// submitBtn.addEventListener("click", () => {
//     if (profileNameEditor.value !== "" && profilePassionEditor.value !== "") {
//         fetch("https://fullstack-profile-store-2.onrender.com/profile", {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 name: profileNameEditor.value,
//                 passion: profilePassionEditor.value,
//                 // No need to send 'id', it will be used on the server-side
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data); // Check the response
//                 // window.location = "/profile-admin"; // Redirect on success
//             })
//             .catch((err) => console.error("Error:", err));
//     }
// });

submitBtn.addEventListener("click", () => {
    if (profileNameEditor.value !== "" && profilePassionEditor.value !== "") {
        fetch("https://fullstack-profile-store-2.onrender.com/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: profileNameEditor.value,
                passion: profilePassionEditor.value,
                // No need to send 'id', it will be used on the server-side
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text(); // Use text() to handle non-JSON responses
            })
            .then((data) => {
                try {
                    const jsonData = JSON.parse(data); // Try parsing the response as JSON
                    console.log(jsonData); // Check the response
                    // window.location = "/profile-admin"; // Redirect on success
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    console.log("Response data:", data); // Log raw response
                }
            })
            .catch((err) => console.error("Error:", err));
    }
});

// .then(() => {
//                         window.location = "/profile-admin";
//                     });
