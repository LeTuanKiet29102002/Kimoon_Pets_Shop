import Product from "./pages/Product";
import PetsIcon from "@mui/icons-material/Pets";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import SendEmail from "./pages/SendEmail.jsx";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import CheckOutError from "./pages/CheckOutError";
import "./css/main.css";
import { useSelector } from "react-redux";
import CapNhatThongTin from "./pages/CapNhatThongTin";
import DonMua from "./pages/DonMua";
import LoginRegister from "./pages/LoginRegister";
import DatMua from "./pages/DatMua";
import ScrollToTop from "react-scroll-to-top";
import NotFound from "./pages/NotFound.jsx";
import { AuthContextProvider } from "./context/AuthContext.js";
import WarrantyPolicy from "./pages/WarrantyPolicy.jsx";
import ContactShop from "./pages/ContactShop.jsx";
import Protected from "./components/Protected.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import LostPets from "./pages/LostPets.jsx";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);

  // const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // // Listen to the Firebase Auth state and set the local state.
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged(async (user) => {
  //       if (!user) {
  //         console.log('User is not logged in!!!');
  //         return;
  //       }
  //       console.log("Logged in user :", user.displayName);

  //       const token = await user.getIdToken();
  //       console.log("Logged in user token: ", token);
  //       setIsSignedIn(!!user);
  //     });
  //   return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  // }, []);

  return (
    <>

      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/ContactShop" element={<ContactShop />} />
            <Route path="/WarrantyPolicy" element={<WarrantyPolicy />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/SendEmail" element={<SendEmail />} />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <LoginRegister />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginRegister />}
            />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/products/:tendanhmuc" element={<ProductList />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/success" element={<Success />} />
            <Route path="/checkoutError" element={<CheckOutError />} />
            <Route
              path="/datmua"
              element={cart.length > 0 ? <DatMua /> : <Home />}
            />

            <Route
              path="/capnhatthongtin"
              element={user ? <CapNhatThongTin /> : <Navigate to="/" />}
            />
            <Route
              path="/lostpets"
              element={user ? <LostPets /> : <Navigate to="/" />}
            />
            <Route
              path="/donmua"
              element={user ? <DonMua /> : <Navigate to="/" />}
            />
            {/* <Route path="/OTPInput" element={<ModalRePassWord />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop
            smooth
            style={{
              height: "56px",
              width: "56px",
              borderRadius: "50%",
              zIndex: "100000",
              right: "20px",
              bottom: "20px",
            }}

            component={<PetsIcon style={{ color: "#ff6f00", fontSize: "30px" }} />}
          />
        </Router>
      </AuthContextProvider>
    </>
  );
};

export default App;
