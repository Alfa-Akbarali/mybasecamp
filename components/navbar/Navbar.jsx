import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { deleteDoc, doc, collection, getDocs, getDoc, query, where } from "firebase/firestore";
import AdminIcon from "../../assets/admin_icon";
import './style_navbar.scss'
const Navbar = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        const userDocRef = doc(db, 'Users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        setIsAdmin(userDocSnap.data().Admin || false);
      }
    });

    const dropdownElems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownElems);

    const sidenavElems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavElems);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((err) => {
        console.error("Error signing out:", err);
      });
  };

  const handleDeleteUser = async () => {
    if (!authUser) {
      console.error("User object is invalid or null.");
      return;
    }

    try {
      await deleteUser(authUser);
      const projectsCollectionRef = collection(db, 'Projects');
      const projectsQuery = query(projectsCollectionRef, where('projectsAuthor', '==', authUser.uid));
      const projectsSnapshot = await getDocs(projectsQuery);
      const projectDeletePromises = projectsSnapshot.docs.map(projectDoc => deleteDoc(projectDoc.ref));
      await Promise.all(projectDeletePromises);
      const userDocRef = doc(db, 'Users', authUser.uid);
      await deleteDoc(userDocRef);

      console.log("User deleted successfully");
      navigate("/form");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Welcome {authUser?.displayName} {isAdmin && <AdminIcon/>}</a>
          <a href='/' className="sidenav-trigger" data-target="mobile-nav"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            {isAdmin && (<li><a href="/viewusers"><i className="material-icons">list_alt</i>All Users</a></li>)}
            <li><a href="/add"><i className="material-icons">add</i>Add project</a></li>
            <li><a href='/' onClick={handleSignOut}><i className="material-icons">logout</i>Logout</a></li>
            <li><a href='/' onClick={handleDeleteUser}><i className="material-icons">delete</i>Delete Account</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-nav">
        {isAdmin && (<li><a href="/viewusers"><i className="material-icons">list_alt</i>All Users</a></li>)}
        <li><a href="/add"><i className="material-icons">add</i>Add project</a></li>
        <li><a href='/' onClick={handleSignOut}><i className="material-icons">logout</i>Logout</a></li>
        <li><a href='/' onClick={handleDeleteUser}><i className="material-icons">delete</i>Delete Account</a></li>
      </ul>
      <br />
    </div>
  )
}

export default Navbar;
