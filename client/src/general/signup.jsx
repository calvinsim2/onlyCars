import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useState } from "react";

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

  const CreateUser = async () => {
    const newUser = {
      username: !!name ? name : null,

      password: !!inputpassword ? inputpassword : null,
      displayname: !!inputdisplayName ? inputdisplayName : null,
    };
    console.log(newUser);

    // console.log("argument is this:", user);
    // const res =  await axios.post(URL, newUser);
    // res.data

    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    // addHolidayFn(data);
    console.log("WE GOT THIS BACK FROM BACKEND", data);
    setStatus(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    // console.log("title", title)

    CreateUser();
  };
  if (status === "Success") {
    console.log("This is status: ", status);
    return <Redirect to={"/login"} />;
  } else {
    return (
      <>
        <h1>这个是 Sign Up Page!</h1>
        <NavLink to={"/"}>
          <p>Back to Main Page</p>
        </NavLink>
        <div className="login">
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Desired username"
              onChange={typeName}
            />
            <input
              name="password"
              placeholder="Desired Password"
              onChange={typePassword}
            />
            <input
              name="displayname"
              placeholder="Display Name"
              onChange={typeDisplayName}
            />
            <button>Create Account!</button>
          </form>
        </div>
      </>
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
