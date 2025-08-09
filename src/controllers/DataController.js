import { AuthApiRepo } from '../repositories/api/AuthApiRepo';
import { ShoppingApiRepo } from '../repositories/api/ShoppingApiRepo';
import { ShoppingLocalRepo } from '../repositories/local-storage/ShoppingLocalRepo';
import { ShoppingStateRepo } from '../repositories/state-data/ShoppingStateRepo'
import { UserStateRepo } from '../repositories/state-data/UserStateRepo'
import { ShopApiRepo } from '../repositories/api/ShopApiRepo';

const dataController = (dispatchState, getIsLoging) => {
    const shoppingState = new ShoppingStateRepo(dispatchState);
    const userState = new UserStateRepo(dispatchState);
    
    const authApiRepo = new AuthApiRepo()
    const shopApiRepo = new ShopApiRepo()
    function getStorageRepo() {
        return getIsLoging() ? new ShoppingApiRepo() : new ShoppingLocalRepo();
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
    //IsLoging actions
    function setIsLoging(boolValue) {
        dispatchState({type: 'SET_IS_LOGING', payload: boolValue});
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
            const repo = getStorageRepo();

            shoppingState.clearCart();
            repo.clear();
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            showErrors?.(error);
        }
    }



    //Auth actions
    async function login({email, password}, showErrors) {
        try {
            console.log({email, password})
            const data = await authApiRepo.login({email, password})

            if(data.error) throw data.error
            setIsLoging(true)

            window.location.href = '/'

        } catch (error) {
            console.error('Error en login:', error);
            showErrors?.(error);
        }
    }

    async function signup({name, email, password}, showErrors) {
        try {

            setIsLoging(true)
        } catch (error) {
            console.error('Error en login:', error);
            showErrors?.(error);
        }
    }

    async function logout(showErrors) {
        try {
            const data = await authApiRepo.logout()

            if(data.error) throw data.error
            setIsLoging(false)
            window.location.href = '/'

        } catch (error) {
            console.error('Error en logout:', error);
            showErrors?.(error);
        }
    }

    //ShopActions
    async function shopOneProduct(id, showErrors) {
        try{
            const data = await shopApiRepo.shopOne(id)
            if(data.error) throw data.error
            const href = data.href
            window.location.href = href
            
        }catch(error){
            console.error('Error en shopOneProducts:', error);
            showErrors?.(error);
        }
        
    }

    return {
        addToCart,
        removeFromCart,
        clearCart,
        setUserData,
        setIsLoging,
        shopOneProduct,
        login,
        logout
    };
};

export { dataController };