import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Loader from "../loader/Loader"
import './style_add.scss'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../navbar/Navbar";

const AddNew = ({ title, inputs }) => {
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
    });
    setTimeout(() => {
      const inputElems = document.querySelectorAll('input, textarea');
      M.updateTextFields(inputElems);
    }, 0);

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const handleInputChange = (e, inputName) => {
    setFormData((prevState) => ({
      ...prevState,
      [inputName]: e.target.value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const projectDocRef = await addDoc(collection(db, 'Projects'), {
          projectsAuthor: user?.uid,
          projectName: formData.projectName,
          projectDescription: formData.projectDescription,
          timeStamp: serverTimestamp()
        });
        console.log("Project added successfully with ID: ", projectDocRef.id);
        navigate("/");
      } catch (err) {
        console.error("Error adding project: ", err);
        M.toast({ html: 'Error adding project', classes: 'red' });
      }
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Navbar />
      <div className="add-new-container">
        <div className="add-new-form-container">
          <div className="add-new-form">
            <h3 className="add-new-title">{title}</h3>
            <form onSubmit={handleAdd}>
              {inputs.map((input) => (
                <div key={input.name} className="input-container">
                  {input.type === 'input' ? (
                    <>
                      <input
                        id={input.name}
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        onChange={(e) => handleInputChange(e, input.name)}
                      />
                    </>
                  ) : (
                    <>
                      <textarea
                        id={input.name}
                        name={input.name}
                        placeholder={input.placeholder}
                        className="materialize-textarea"
                        onChange={(e) => handleInputChange(e, input.name)}
                      />
                    </>
                  )}
                </div>
              ))}
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

export default AddNew;
