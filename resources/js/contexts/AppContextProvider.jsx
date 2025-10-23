import axios from '@/hooks/axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AppContextApi = createContext();

export const useAppContext = () => useContext(AppContextApi);

export default function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(true);

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const loadTickets = async () => {
            setLoading(true);
            try {
                const response = await axios('/api/booking').then((res) => res);
                if (response.status === 200) {
                    setTickets(response.data);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadTickets();
    }, []);

    const value = {
        loading,
        tickets,
        setTickets,
    };

    return <AppContextApi.Provider value={value}>{children}</AppContextApi.Provider>;
}
