import React, {useContext, useState, useEffect} from 'react'
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

//Gets exported to signup component and triggers whenever user push "Sign Up" button
export function AuthProvider({children}) {

    // State to keep track of the current user logged in
    const [currentUser, setCurrentUser] = useState()

    // A loading switch to make sure that "user" will not be used whenever user state is null
    const [loading, setLoading] = useState(true)

    // Make request to firebase to make a new user, on success the new user will be signed in
    async function signup(email, password, userName){
        return auth.createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            result.user.updateProfile({
            displayName: userName
            })
          }).catch(function(error) {
            console.log(error);
          });
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut(){
        return auth.signOut()
    }

    

    useEffect(() => {
        // An observer over users sign-in-state. Whenever an user gets signed in our out, the current user will change whenever the current user state gets changed
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            // Changes the "loading switch" to false as it is now safe to render user
            setLoading(false)
        })

        return unsubscribe
    },[])

    // exports current user and signup fuction so you can do signup requests from signup component
    const user = {
        currentUser,
        login,
        signup,
        logOut,
        
    }

    //Sets the current user as context, so it can be easly accessed in other components
    return (
        <AuthContext.Provider value={user}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
