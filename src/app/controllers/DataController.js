import { ShoppingApiRepo } from '../repositories/api/ShoppingApiRepo';
import { ShoppingLocalRepo } from '../repositories/local-storage/ShoppingLocalRepo';
import { ShoppingStateRepo } from '../repositories/state-data/ShoppingStateRepo'
import { UserStateRepo } from '../repositories/state-data/UserStateRepo'

const dataController = (dispatchState, getIsLoging) => {
    const shoppingState = new ShoppingStateRepo(dispatchState);
    const userState = new UserStateRepo(dispatchState);

    function getStorageRepo() {
        return getIsLoging() ? new ShoppingApiRepo() : new ShoppingLocalRepo();
    }

    //Shopping actions
    function addToCart(product, showErrors) {
        try {
            const repo = getStorageRepo();

            shoppingState.addToCart(product);
            repo.addToCart(product);
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            showErrors?.(error);
        }
    }

    function removeFromCart(productId, showErrors) {
        try {
            const repo = getStorageRepo();

            shoppingState.removeFromCart(productId);
            repo.remove(productId);
        } catch (error) {
            console.error('Error al remover del carrito:', error);
            showErrors?.(error);
        }
    }

    function clearCart(showErrors) {
        try {
            shoppingState.clearCart();
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            showErrors?.(error);
        }
    }

    function setShoppingCart(products, showErrors) {
        try {
            shoppingState.setShoppingCart(products);
        } catch (error) {
            console.error('Error al setear el carrito:', error);
            showErrors?.(error);
        }
    }

    //User actions
    function setUserData(userData, showErrors) {
        try {
            userState.setUserData(userData);
        } catch (error) {
            console.error('Error al setear datos de usuario:', error);
            showErrors?.(error);
        }
    }

    function setIsLoging(showErrors) {
        try {

        } catch (error) {
            console.error('Error al cambiar estado de login:', error);
            showErrors?.(error);
        }
    }

    return {
        addToCart,
        removeFromCart,
        clearCart,
        setShoppingCart,
        setUserData,
        setIsLoging
    };
};

export { dataController };