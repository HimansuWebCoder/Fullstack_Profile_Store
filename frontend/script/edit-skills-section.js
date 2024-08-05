const skillsEditContainer = document.querySelector("#skills-edit-container");
    	const redirectBtn = document.querySelector("#redirect-arrow-icon");

         fetch("https://fullstack-profile-store-2.onrender.com/users")
         .then(res => res.json())
         .then((users, i) => {
            users.forEach((user, j) => { 
                 const delContainer = document.createElement("div");
                 skillsEditContainer.appendChild(delContainer);
                 delContainer.classList.add("del-container-style")
        
                 const skillName = document.createElement("h3");
                 delContainer.appendChild(skillName);
                 skillName.textContent = user.name;
                 skillName.classList.add("skills-name");

                 const inputContainer = document.createElement("input");
                 delContainer.appendChild(inputContainer);
                 inputContainer.classList.add("input-container-style");


                 const updateBtn = document.createElement("button");
                 delContainer.appendChild(updateBtn);
                 updateBtn.textContent = "Update";
                 updateBtn.style.display = "inline-block"


                 updateBtn.addEventListener("click", () => {
                    if (inputContainer.value !== "") {  
                    fetch("https://fullstack-profile-store-2.onrender.com/users", {
                        method: "put",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({id: user.id, name: inputContainer.value})
                    })
                    setTimeout(() => {
                        window.location.reload()
                        }, 2000)
                    }
                 })

                        const delBtn = document.createElement("button");
                        delContainer.appendChild(delBtn);
                        delBtn.textContent = "Delete";
                    delBtn.addEventListener("click", () => {
                        fetch("https://fullstack-profile-store-2.onrender.com/users", {
                            method: "delete",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({id : user.id})
                        })
                        .then(res => res.json())
                        .then(x => {
                            console.log(x);
                        })
                        setTimeout(() => {
                        window.location.reload()
                        }, 2000)
                    })
                })
            

         })

        redirectBtn.addEventListener("click", () => {
            window.location = "/";
        })