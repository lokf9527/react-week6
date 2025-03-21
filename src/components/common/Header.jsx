import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCartData } from "../../redux/cartSlice";
import { useEffect } from "react";
import  axios  from "axios";
import Toast from "../../components/common/Toast"
import { pushMessage } from "../../redux/toastSlice";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const routes = [
    { path: "/", name: "首頁" },
    { path: "/products", name: "產品列表" },
    { path: "/cart", name: "購物車" },
  ];


export default function Header() {
  const carts = useSelector((state) => state.cart.carts);

  const dispatch = useDispatch();
  updateCartData

  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`)
      dispatch(updateCartData(res.data.data))
    } catch (error) {
      const {message} = error.response.data
          dispatch(pushMessage({
            text:message.join(""),
            status:'failed'
          }))
    }
  }

  useEffect(() => {
    getCart();
    
  }, []);
    return (
      <>
        <div
          className="container d-flex flex-column"
        >
          <nav className="navbar navbar-expand-lg navbar-light">
            <a style={{ fontFamily: "Righteous" }} className="navbar-brand fs-2" href="./index.html">
            MOUNTAINERRING
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                {routes.map((route) => (
                  <NavLink key={route.path} className="nav-item nav-link me-4" to={route.path}>
                  {route.name === '購物車' ? (
                    <div className="position-relative">
                      <i className="fas fa-shopping-cart"></i>
                      <span
                        class="position-absolute badge text-bg-success rounded-circle"
                        style={{
                          bottom: "12px",
                          left: "12px",
                        }}
                      >{carts?.length}</span>
                    </div>
                  ) : route.name}
                </NavLink>
                ))}
              </div>
            </div>
          </nav>
        </div>
        <Toast/>
      </>
    )
  }
  