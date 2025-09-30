import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendPasswordResetEmail, signOut, signInWithPopup,
    GoogleAuthProvider, getAdditionalUserInfo, UserCredential
} from "firebase/auth";
import { AUTH } from '../../../services/store/Firestore.store'
import { createUser } from "../../../services/EntityFactory.service";
import { createUser as submitUser } from "../../user/api/User.api";

export const convertIntoNewUser = (firebaseUser: UserCredential) => {
    return createUser({
        id: firebaseUser.user.uid,
        imageUrl: firebaseUser.user.photoURL,
        username: firebaseUser.user.displayName || `User-${firebaseUser.user.uid}`
    })
}

export const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(AUTH, email, password)

    await submitUser(convertIntoNewUser(userCredential))

    return userCredential.user.uid
}

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(AUTH, email, password)
    return userCredential.user.uid
}

export const resetPassword = (email: string) => {
    return sendPasswordResetEmail(AUTH, email)
}

export const logout = () => {
    return signOut(AUTH)
}

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('email')
    provider.addScope('profile')

    const userCredential = await signInWithPopup(AUTH, provider)

    const info = getAdditionalUserInfo(userCredential)
    if(info?.isNewUser) {
        submitUser(convertIntoNewUser(userCredential))
    }

    return userCredential.user.uid
}