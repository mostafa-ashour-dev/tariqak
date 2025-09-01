import { useEffect, useState } from "react";

export default function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoggedIn(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return { isLoggedIn, setIsLoggedIn };
}
