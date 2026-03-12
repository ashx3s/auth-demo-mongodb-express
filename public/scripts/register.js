// connect to the form element
const form = document.getElementById("registerForm");
// add event listener to submit (async)
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    // perform a POST fetch on the /api/auth/register route
    const res = await fetch("/api/auth/register", {
      method: "POST",
      // send application/json type header
      headers: { "Content-Type": "application/json" },
      // send the body content as json
      body: JSON.stringify({
        // username
        username: e.target.username.value,
        // password
        password: e.target.password.value,
      }),
    });
    const data = await res.json();
    console.log(data);
    console.log("User Registered!", e.target.username.value);
  } catch (error) {
    console.error("Something went wrong", error);
  }
});
