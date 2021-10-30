import { NavLink } from "react-router-dom";

function About() {
  return (
    <>
      <h1>这个是 About Page!</h1>
      <NavLink to={"/"}>
        <p>Back to Main Page</p>
      </NavLink>
      <div className="about">
        <p>
          Welcome to onlyCars, ever thought of owning a car but COE in Singapore
          it's too god damn expensive? Well fret not, onlyCars can help you ease
          the pain (well... part of)
        </p>
        <p>
          In onlyCars, you can choose to rent a car to your liking, or if you
          have your own car you would like to rent out, onlyCars is the solution
          for you as well!
        </p>
      </div>
    </>
  );
}

export default About;