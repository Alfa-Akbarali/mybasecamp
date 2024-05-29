import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../navbar/Navbar";
import './style_edit.scss'
const EditProject = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const projectDoc = await getDoc(doc(db, "Projects", projectId));
      if (projectDoc.exists()) {
        setProjectName(projectDoc.data().projectName);
        setProjectDescription(projectDoc.data().projectDescription);
      } else {
        console.log("Project not found");
      }
    };

    fetchProject();
  }, [projectId]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //     if (name === "projectName") {
  //       setProjectName(value);
  //     } else if (name === "projectDescription") {
  //       setProjectDescription(value);
  //     }
  // };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "Projects", projectId), {
        projectName: projectName,
        projectDescription: projectDescription,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="edit-project-container">
        <div className="edit-project-form-container">
          <div className="edit-project-form">
            <h3 className="edit-project-title">Edit</h3>
            <form onSubmit={handleUpdate}>
              <div className="input-field">
                <input
                  type="text"
                  name="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <textarea
                  name="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  className="materialize-textarea"
                />
              </div>
              <button type="submit" value="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
