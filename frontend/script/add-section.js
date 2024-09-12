const skillEditorInput = document.querySelector("#skill-input");
const redirectBtn = document.querySelector("#redirect-arrow-icon");
const submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", () => {
        if (skillEditorInput.value !== "") {
                fetch(
                        "https://fullstack-profile-store-2.onrender.com/profile/:profileId/skills",
                        {
                                method: "post",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                        name: skillEditorInput.value,
                                }),
                        },
                )
                        .then((res) => res.json())
                        .then((users) => {
                                skillEditorInput.value = "";
                                skillEditorInput.focus();
                        });
        }
});

submitBtn.addEventListener("click", () => {
        if (skillEditorInput.value !== "") {
                fetch(`https://fullstack-profile-store-2.onrender.com/profile`)
                        .then((res) => res.json())
                        .then((profile) => {
                                fetch(
                                        `https://fullstack-profile-store-2.onrender.com/profile/${profile.id}/skills`,
                                        {
                                                method: "post",
                                                headers: {
                                                        "Content-Type":
                                                                "application/json",
                                                },
                                                body: JSON.stringify({
                                                        skill: skillEditorInput.value,
                                                }),
                                        },
                                ).then(() => {
                                        skillEditorInput.value = "";
                                        skillEditorInput.focus();
                                });
                        });
        }
});

redirectBtn.addEventListener("click", () => {
        window.location = "/profile-admin";
});
