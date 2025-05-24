async function getTopics() {
  let accessToken = localStorage.getItem("accessToken");
  const container = document.querySelector(".topics-grid");
  try {
    let response = await fetch("http://localhost:3000/api/topic", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    let { topic } = await response.json();
    let topics = "";
    topic.forEach((val) => {
      topics += `   
          <div class="card" style="
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            
            <img
              src="https://i.pinimg.com/736x/b6/4b/fd/b64bfd9ddcbfd5bed22ae16104b5f5f7.jpg"
              alt="Topic Image"
              style="width: 100%; height: 180px; object-fit: cover;"
            />
            
            <div style="padding: 15px;">
              <p style="margin: 8px 0;"><strong>Created:</strong> ${new Date(
                val.created_date
              ).toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Updated:</strong> ${new Date(
                val.updated_date
              ).toLocaleString()}</p>
              <p style="margin: 8px 0;"><strong>Author ID:</strong> ${
                val.author_id
              }</p>
              <p style="margin: 8px 0;"><strong>Approved:</strong> ${
                val.is_approved ? "Yes" : "No"
              }</p>
              <p style="margin: 8px 0;"><strong>Checked:</strong> ${
                val.is_checked ? "Yes" : "No"
              }</p>
            </div>
          </div>
      `;
    });
    container.innerHTML = topics;
  } catch (error) {
    console.log(error.message);
  }
}
