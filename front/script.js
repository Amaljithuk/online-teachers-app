const API_BASE_URL = "http://localhost:5000/teachers"; // Backend API URL

// Handle form submission for teacher registration
document.getElementById("teacher-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const domain = document.getElementById("domain").value;
  const experience = document.getElementById("experience").value;

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, domain, experience }),
    });

    if (response.ok) {
      alert("Teacher registered successfully!");
      fetchTeachers(); // Refresh the teacher list
    } else {
      alert("Failed to register teacher!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Fetch and display the list of teachers
async function fetchTeachers() {
  try {
    const response = await fetch(API_BASE_URL);
    const teachers = await response.json();

    const teachersList = document.getElementById("teachers-list");
    teachersList.innerHTML = "";

    teachers.forEach((teacher) => {
      const li = document.createElement("li");
      li.textContent = `${teacher.name} - ${teacher.domain} (${teacher.experience} years)`;
      teachersList.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Load teachers on page load
fetchTeachers();
