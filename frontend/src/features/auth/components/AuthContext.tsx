import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { AUTH } from "../../../services/store/Firestore.store";

type AuthContextType = {
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuthenticated: false })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => onAuthStateChanged(AUTH, u => setUser(u)), [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: user !== null }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)