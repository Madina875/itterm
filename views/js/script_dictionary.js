async function getDicts() {
  let accessToken = localStorage.getItem("accessToken");
  const container = document.querySelector(".container");
  try {
    let response = await fetch("http://localhost:3000/api/dict", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    let { dicts } = await response.json();
    let dict = "";

    dicts.forEach((val) => {
      dict += `   
    <div
      class="card"
      style="
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      transition: transform 0.2s;
    "
      onmouseover="this.style.transform='scale(1.02)'"
      onmouseout="this.style.transform='scale(1)'"
    >

      <img
        src="https://i.pinimg.com/736x/26/95/50/269550ded9ce1f717caff55b902db380.jpg"
        alt="Topic Image"
        style="width: 100%; height: 180px; object-fit: cover;"
      />

      <div style="padding: 15px;">
        
        <p class="card-text">${val.term} </p>
        <p class="card-text">${val.letter} </p>
      </div>

    </div>
      
      `;
    });
    container.innerHTML = dict;
    console.log(dict);
  } catch (error) {
    console.log(error.message);
  }
}
