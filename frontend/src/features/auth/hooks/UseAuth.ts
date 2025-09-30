import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { AUTH } from "../../../services/store/Firestore.store";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(AUTH, u => {
            setUser(u)
            setLoading(false)
        })
    }, [])
    return { user, loading }
}