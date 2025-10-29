import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useModal } from "../providers/ModalContext";
import { ShoppingCart } from "../components/ShoppingCart";
import { useStore } from "../providers/ItemsContex";
import { Wishlist } from "../wishlist-components/Wishlist";
import { SearchPanel } from "../search-components/SearchPanel";
import { UserProfile } from "./UserProfile";
import styles from './Navbar.module.css';

function Navbar({ navBarColor }) {
    const { openModal } = useModal();
    const { isLoging, shoppingCart } = useStore();
    const navigate = useNavigate();

    const handleOpenCart = () => openModal(<ShoppingCart />);
    const handleWishlist = () => openModal(<Wishlist />);
    const handleSearch = () => openModal(<SearchPanel />);
    const handleUser = () => openModal(<UserProfile />);

    return (
        <nav
            className={styles.navContainer}
            style={{
                backgroundColor: navBarColor,
                transition: "background-color 1s ease",
            }}
        >
            <Link to="/" className={styles.link}>
                <span className={styles.logo}>Plantae</span>
            </Link>

            <div className={styles.options}>
                <span className={styles.item}>MORE</span>
                <span className={styles.item} onClick={handleWishlist}>WISHLIST</span>
                <span className={styles.item} onClick={handleSearch}>SEARCH</span>
            </div>

            <div className={styles.rightOptions}>
                {isLoging ? (
                    <span className={styles.item} onClick={handleUser}>ACCOUNT</span>
                ) : (
                    <button className={styles.loginButton} onClick={() => navigate('/login')}>
                        Iniciar Sesión
                    </button>
                )}

                <div className={styles.item}>
                    <ShoppingBag onClick={handleOpenCart} />
                    <span className={styles.counter}>{shoppingCart.length}</span>
                </div>
            </div>
        </nav>
    );
}

export { Navbar };
