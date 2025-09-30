import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { AUTH } from "../../../services/store/Firestore.store";

type AuthContextType = {
    isAuthenticated: boolean
    userId: string | null
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, userId: null })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => onAuthStateChanged(AUTH, u => setUser(u)), [])

    const value: AuthContextType = {
        isAuthenticated: user !== null,
        userId: user?.uid || null
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)