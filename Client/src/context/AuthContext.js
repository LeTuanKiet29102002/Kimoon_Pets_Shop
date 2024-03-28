import React, { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const logOut = () => {
    signOut(auth);
  };
  useEffect(() => {
    const getRandomNumber = () => {
      // Tạo một số ngẫu nhiên trong khoảng từ 100000 đến 999999
      return Math.floor(Math.random() * 900000) + 100000;
    };
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Nếu người dùng đã đăng nhập, lấy thông tin người dùng
        setUserEmail({
          emailnguoimua: currentUser.email,
          hotennguoimua: currentUser.displayName,
          hinhdaidien: currentUser.photoURL,
          manguoimua: getRandomNumber(),
        });
      } else {
        // Nếu không có người dùng đăng nhập, đặt user state về null
        setUserEmail(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

// import React, { useContext, createContext, useEffect, useState } from "react";
// import axios from "axios";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithRedirect,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log('test ', result.user);
//       const { email:emailnguoimua, displayName: hotennguoimua, photoURL: hinhdaidien, createdAt: manguoimua } = result.user;
//       // Gửi thông tin người dùng đến endpoint API
//       axios.post('http://localhost:3001/api/auth/register', { user: emailnguoimua, hotennguoimua, hinhdaidien , manguoimua })
//           .then(response => console.log(response.data))
//           .catch(error => console.error(error));
//   })
//   .catch((error) => {
//       console.log(error.message);
//   });
//   };
//   const logOut = () => {
//     signOut(auth);
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       console.log("check user login gmail: ", currentUser);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);
//   return (
//     <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };

// import React, { useContext, createContext, useEffect, useState } from "react";
// import axios from "axios";
// import {
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "../firebase";

// const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const googleSignIn = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         console.log("test ", result.user);
//         const {
//           email: emailnguoimua,
//           displayName: hotennguoimua,
//           photoURL: anhdaidien,
//         } = result.user;
//         // Gửi thông tin người dùng đến endpoint API để đăng ký
//         axios
//           .post("http://localhost:3001/api/auth/login", {
//             emailnguoimua,
//             hotennguoimua,
//             anhdaidien,
//           })
//           .then((response) => {
//             // Nếu đăng ký thành công, cập nhật user state
//             setUser(response.data.user);
//           })
//           .catch((error) => console.error(error));
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const logOut = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null); // Đăng xuất thành công, cập nhật user state về null
//       })
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser.reloadUserInfo);
//       console.log("check user login gmail: ", currentUser);
//     });
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };
