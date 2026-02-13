import { Routes, Route } from "react-router-dom";

/* ✅ CORRECT PATHS */
import ExecutiveAssignment from "../../BankExecutive/ExecutiveAssignment";
import AssignExecutive from "../../BankExecutive/AssignExecutive";
import AssignmentDetails from "../../BankExecutive/AssignmentDetails";

const FileAssignment = () => {
  return (
    <Routes>
      {/* Default */}
      <Route
        index
        element={
          <div style={{ padding: "20px" }}>
            <h2>File Assignment</h2>
            <p>Select assignment type</p>
          </div>
        }
      />

      {/* Executive Assignment */}
      <Route path="executive-assignment" element={<ExecutiveAssignment />} />
      <Route path="assign-executive" element={<AssignExecutive />} />
      <Route path="assignment/:id" element={<AssignmentDetails />} />
    </Routes>
  );
};

export default FileAssignment;
