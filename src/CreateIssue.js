import { useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs
} from "firebase/firestore";

/* -------------------------
   SMART TOKEN GENERATOR
--------------------------*/
const generateTokens = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 3);
};

function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");

  const createIssue = async () => {
   if (!title.trim() || !description.trim()) {
  alert("Title and Description are required");
  return;
}


    try {
      /* -------------------------
         SIMILAR ISSUE CHECK
      --------------------------*/
      const issueTokens = generateTokens(title);
      const snapshot = await getDocs(collection(db, "issues"));

      let similarFound = false;

      snapshot.forEach((doc) => {
        const existingIssue = doc.data();
        const existingTokens = generateTokens(existingIssue.title);

        const commonWords = issueTokens.filter(token =>
          existingTokens.includes(token)
        );

        if (commonWords.length >= 2) {
          similarFound = true;
        }
      });

      if (similarFound) {
        const confirmCreate = window.confirm(
          "A similar issue already exists. Do you want to continue?"
        );
        if (!confirmCreate) return;
      }

      /* -------------------------
         CREATE ISSUE IN FIRESTORE
      --------------------------*/
      await addDoc(collection(db, "issues"), {
        title: title,
        description: description,
        priority: priority,
        status: "Open",
        assignedTo: assignedTo,
        createdBy: auth.currentUser.email,
        createdAt: serverTimestamp()
      });

      alert("Issue created successfully");

      // clear form
      setTitle("");
      setDescription("");
      setPriority("Low");
      setAssignedTo("");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Create Issue</h3>

      <input
        type="text"
        placeholder="Issue Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Issue Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br /><br />

      <label>Priority:</label>
<select
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
      <br /><br />

      <input
        type="text"
        placeholder="Assigned To (email/name)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <br /><br />

      <button onClick={createIssue}>Create Issue</button>
    </div>
  );
}

export default CreateIssue;
