import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SignUp() {
  const URL = "/api/users/new";

  const [name, setName] = useState("");
  const [inputpassword, setInputPassword] = useState("");
  const [inputdisplayName, setInputDisplayName] = useState("");
  const [status, setStatus] = useState("");

  const typeName = (event) => {
    setName(event.target.value);
    console.log("name is this: ", event.target.value);
  };
  const typePassword = (event) => {
    setInputPassword(event.target.value);
  };
  const typeDisplayName = (event) => {
    setInputDisplayName(event.target.value);
  };

  const CreateUser = async (event) => {
    event.preventDefault();
    // check if username & password is accidentally an empty value.
    const newUser = {
      username: !!name ? name : null,

      password: !!inputpassword ? inputpassword : null,
      displayname: !!inputdisplayName ? inputdisplayName : null,
    };

    // if username OR password is null, alert user and prevent signing up!
    if (!newUser.username || !newUser.password) {
      alert("Oops, username and password CANNOT be null!");
    }
    // else, we will proceed to call backend to set up the new user!
    else {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      setStatus(data);
      // if nothing else is wrong, server will send a success note.
      if (data === "Success") {
        alert(`A new user with username of ${newUser.username} is created!`);
      } else {
        alert(`Sorry, ${data} `);
      }
    }
  };

  // mui related.
  const wordStyle = {
    color: "primary.main",
  };

  if (status === "Success") {
    console.log("This is status: ", status);
    return <Redirect to={"/login"} />;
  } else {
    return (
      <div className="signup-page">
        <Typography variant="h3" sx={{ ...wordStyle }}>
          这个是 Sign Up Page!
        </Typography>
        <NavLink to={"/"}>
          <p>Back to Main Page</p>
        </NavLink>
        <div className="signup">
          <form className="signup-form" onSubmit={CreateUser}>
            <TextField
              name="username"
              size="small"
              label="Enter Username"
              variant="outlined"
              onChange={typeName}
            />
            <TextField
              name="password"
              size="small"
              label="Desired Password"
              variant="outlined"
              onChange={typePassword}
            />
            <TextField
              name="displayname"
              size="small"
              label="Desired Name"
              variant="outlined"
              onChange={typeDisplayName}
            />
            <Button type="submit">Create Account</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;

// function SignUp() {
//   const URL = "/api/users/new";
//   const inputUserDetails = useRef();
//   const inputPasswordDetails = useRef();
//   const inputDisplayNameDetails = useRef();
//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//     displayName: "",
//   });

//   const CreateUser = async (title) => {
//     console.log("argument is this:", title);

//     const res = await fetch(URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(title),
//     });
//     const data = await res.json();
//     // addHolidayFn(data);
//     console.log("WE GOT THIS BACK FROM BACKEND", data);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // const title = event.target.title.value;
//     // console.log("title", title)

//     setUser({
//       username: inputUserDetails.current.value,
//       password: inputPasswordDetails.current.value,
//       displayname: inputDisplayNameDetails.current.value,
//     });
//     CreateUser(user);
//   };
//   return (
//     <>
//       <h1>这个是 Sign Up Page!</h1>
//       <NavLink to={"/"}>
//         <p>Back to Main Page</p>
//       </NavLink>
//       <div className="login">
//         <form onSubmit={handleSubmit}>
//           <input
//             name="username"
//             placeholder="Desired username"
//             ref={inputUserDetails}
//           />
//           <input
//             name="password"
//             placeholder="Desired Password"
//             ref={inputPasswordDetails}
//           />
//           <input
//             name="displayname"
//             placeholder="Display Name"
//             ref={inputDisplayNameDetails}
//           />
//           <button>Create Account!</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default SignUp;
