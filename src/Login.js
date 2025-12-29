import { useState } from "react";
import { auth } from "./firebase";
import CreateIssue from "./CreateIssue";
import IssueList from "./IssueList";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  // This runs whenever login/logout happens
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // Signup new user
  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful");
    } catch (error) {
      alert(error.message);
    }
  };

  // Login existing user
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  };

  // Logout user
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Smart Issue Board</h2>

    {user ? (
  <>
    <p>
      Logged in as: <b>{user.email}</b>
    </p>

    <button onClick={logout}>Logout</button>

    <CreateIssue />
    <IssueList />

  </>
) : (

        <>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={signup}>Sign Up</button>
          <button onClick={login} style={{ marginLeft: "10px" }}>
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
