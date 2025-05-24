function login() {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // yangi saytga uloqtirib yubormaslik un.
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      fetch("http://localhost:3000/api/author/login", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json" /*serverga qanday turdagi malumot yuborilayotgani*/,
        },
        body: JSON.stringify({
          /*serverga yuborilmoqda. (stringify json formatga o'giradi)*/
          email, //foydalanuvchi kiritngan narsalar_
          password,
        }),
      })
        .then((responce) => {
          if (responce.ok) {
            //200-299 oralig'ida
            console.log(responce);
            console.log("Login successfully");
            return responce.json(); // kelgan javobni o'qib beradi
          } else {
            console.log("Login failed");
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.accessToken);
        });
    } catch (error) {
      console.log(error);
    }
  });
}

async function getAuthors() {
  let accessToken = localStorage.getItem("accessToken");
  const container = document.querySelector(".author-container");

  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("accessTokenExpTime:", accessTokenExpTime);
  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("AccessToken vaqti otib keygan ");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan");
  }

  fetch("http://localhost:3000/api/author", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`, //authorization
      "Content-Type": "application/json",
    },
  })
    .then((responce) => {
      if (!responce.ok) {
        throw new Error("Fetch failed responce status: ", responce.status);
      }
      return responce.json();
    })
    .then((data) => {
      displayAuthors(data.authors);
    })
    .catch((error) => {
      console.log("Error fetching authors:", error);
      container.innerHTML = "<p style='color:red;'>Failed to load authors.</p>";
    });
}

function displayAuthors(data) {
  const container = document.querySelector(".author-container");
  container.innerHTML = data
    .map(
      (author) => `
      <div class="card" style="width: 300px; border: 1px solid #ccc; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="padding: 15px;">
          <h3 style="margin: 0 0 10px;">${author.full_name}</h3>
          <p><strong>Nickname:</strong> ${author.nick_name}</p>
          <p><strong>Email:</strong> ${author.email}</p>
          <p><strong>Phone:</strong> ${author.phone}</p>
          <p><strong>Position:</strong> ${author.position}</p>
          <p><strong>Expert:</strong> ${author.is_expert ? "Yes" : "No"}</p>
          <p><strong>Active:</strong> ${author.is_active ? "Yes" : "No"}</p>
          <p><strong>Created:</strong> ${new Date(
            author.createdAt
          ).toLocaleString()}</p>
        </div>
        ${
          author.photo
            ? `<img src="https://i.pinimg.com/736x/63/34/e7/6334e77f90ca8f79b412cd6ebeaf610c.jpg" alt="Author Photo" style="width: 100%; height: 200px; object-fit: cover;">`
            : ""
        }
      </div>
    `
    )
    .join("");
}

function getTokenExpTime(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshToken() {
  const loginUrl = "/login";
  try {
    const responce = await fetch("http://localhost:3000/api/author/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await responce.json();

    if (data.error && data.error == "jwt expired") {
      console.log("Refresh tokenning vaqti chiqib ketgan");
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar refresh token yordamida yangilandi ");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(loginUrl);
  }
}

/*
savoll:

// foydalanuvchi brauzerga qanday qilib tokenni saqlash mumkin ?

localStorage.setItem("accessToken", data.accessToken) qatori nimaga xizmat qiladi?

A) tokenni serverga jo'natadi
B) tokenni o'chiradi
C) tokenni foydalanuvchi brauzeriga saqlaydi
D) tokenni dekodlaydi

✅ To‘g‘ri javob: C
*/
