import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc
} from "firebase/firestore";

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    const fetchIssues = async () => {
      const q = query(
        collection(db, "issues"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const issueData = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      setIssues(issueData);
    };

    fetchIssues();
  }, []);

  // 🔹 FILTER LOGIC
  const filteredIssues = issues.filter((issue) => {
    return (
      (statusFilter === "All" || issue.status === statusFilter) &&
      (priorityFilter === "All" || issue.priority === priorityFilter)
    );
  });

  // 🔹 STATUS UPDATE WITH BUSINESS RULE
  const updateStatus = async (issueId, currentStatus, newStatus) => {
    // Business rule: Open → Done NOT allowed
    if (currentStatus === "Open" && newStatus === "Done") {
      alert(
        "Please move the issue to 'In Progress' before marking it as 'Done'."
      );
      return;
    }

    const issueRef = doc(db, "issues", issueId);
    await updateDoc(issueRef, { status: newStatus });
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>All Issues</h3>

      {/* FILTER CONTROLS */}
      <label>Status: </label>
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option>All</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <label style={{ marginLeft: "20px" }}>Priority: </label>
      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {/* ISSUE LIST */}
      <ul>
        {filteredIssues.map((issue) => (
          <li key={issue.id} style={{ marginTop: "15px" }}>
            <b>{issue.title}</b>
            <br />
            {issue.description}
            <br />
            Priority: {issue.priority}
            <br />

            Status:
            <select
              value={issue.status}
              onChange={(e) =>
                updateStatus(issue.id, issue.status, e.target.value)
              }
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <br />
            Assigned To: {issue.assignedTo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
