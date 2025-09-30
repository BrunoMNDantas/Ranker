import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { AUTH } from "../../../services/store/Firestore.store";

type AuthContextType = {
    loading: boolean
    isAuthenticated: boolean
    userId: string | null
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false, userId: null, loading: true })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null | undefined>(undefined)

    useEffect(() => onAuthStateChanged(AUTH, u => setUser(u)), [])

    const value: AuthContextType = {
        loading: user === undefined,
        isAuthenticated: user !== null && user !== undefined,
        userId: user?.uid || null
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)