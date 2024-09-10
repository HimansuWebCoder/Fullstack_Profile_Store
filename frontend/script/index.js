const profileContainer = document.querySelector("#profile-container");
const profileImg = document.querySelector("#profile-image");
const profileContentContainer = document.querySelector(
  "#profile-content-container",
);
const profileHeader = document.querySelector("#profile-header");
const profileIntro = document.querySelector("#profile-intro");
const loader = document.querySelector(".loader");

// By Default name, passion is there you can edit this according to your name and passin

function showProfile() {
  // console.log("Loading...");
  // profileContainer.style.display = "none";
  // loader.style.display = "block";

  let isLoaded = false;

  fetch("https://fullstack-profile-store-2.onrender.com/profile")
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      profileHeader.textContent = users.name;
      profileIntro.textContent = users.passion;
    })
    .finally(() => {
      if (isLoaded) {
        profileContainer.style.display = "block";
        loader.style.display = "none";
      }
    });

  fetch("https://fullstack-profile-store-2.onrender.com/view")
    .then((res) => res.json())
    .then((users) => {
      // console.log(users[users.length - 1].image);
      // profileImg.src = users[users.length-1].image;
      // profileImg.src = '/' + users[users.length-1].image;
      profileImg.src = users[users.length - 1].image;
      console.log(users[users.length - 1].image);
      console.log(users[users.length - 1]); // Logs the last user object

      // users.forEach((img, i) => {
      //   console.log(users[users.length-1].image);
      // })
      // if (users.length) {
      //   users.forEach((user, i) => {
      //     // profileHeader.textContent = user.name;
      //     // profileIntro.textContent = user.passion;
      //     profileImg.src = users[users.length-1].image;
      //     isLoaded = true; // Data loaded successfully
      //   });
      // }
    })
    .finally(() => {
      if (isLoaded) {
        profileContainer.style.display = "block";
        loader.style.display = "none";
      }
    });
}

showProfile();

fetch("https://fullstack-profile-store-2.onrender.com/users")
  .then((res) => res.json())
  .then((users, i) => {
    // All skills container box
    const skillDiv = document.createElement("div");
    profileContainer.appendChild(skillDiv);
    skillDiv.textContent = "Skills";
    skillDiv.classList.add("skills-intro-style");

    users.forEach((user, i) => {
      // One skill container box
      const skillContainer = document.createElement("div");
      profileContainer.appendChild(skillContainer);
      skillContainer.textContent = users[i].name;
      skillContainer.classList.add("skills-container");
    });
  });

// fetch('https://fullstack-profile-store-2.onrender.com/view')
