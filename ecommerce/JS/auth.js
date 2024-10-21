const submit = document.querySelector(".submit");
const inputs = document.querySelectorAll(".form-input");
const submitHandler = async (e) => {
  e.preventDefault();
  const username = inputs[0].value;
  const password = inputs[1].value;
  const encodedPassword = btoa(password);
  const role = document.getElementById("role").value;
  console.log(role);

  function generateToken() {
    return (
      "token-" +
      Math.random().toString(36).substr(2) +
      "-" +
      new Date().getTime()
    );
  }
  const token = generateToken();
  const user = {
    username: username,
    password: encodedPassword,
    role: role,
    token: token,
  };
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  localStorage.setItem("loggedIn", true);

  window.location = "../index.html";
};

function checkLogin() {
  if (localStorage.getItem("loggedIn")) {
    window.location = "../index.html";
  }
}

checkLogin();

submit.addEventListener("click", submitHandler);
