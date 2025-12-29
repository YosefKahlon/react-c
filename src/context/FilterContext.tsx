/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

//Declares what we'll store: current category and sidebar open/close.
type FilterContextValue = {
selectCategory: string;
setSelectCategory: (category: string) => void;
sidebarOpen: boolean;
setSidebarOpen: (open: boolean) => void;
toggleSidebar: () => void;
};

//Defines the "shape" of the shared data and creates the Context object.
const FilterContext = createContext<FilterContextValue | undefined>(undefined);


export const FilterProvider = ({ children }: { children: ReactNode }) => {
    // Use localStorage hook to persist state across page refreshes
    const [selectCategory, setSelectCategory] = useLocalStorage<string>("selected-category", "");
    const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>("sidebar-open", false);

    //helper to toggle sidebar
    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        //Makes these values/functions available to all child components.
        <FilterContext.Provider
            value={{ 
                selectCategory,
                setSelectCategory,
                sidebarOpen,
                setSidebarOpen,
                toggleSidebar,
             }}
        >
            {children}
        </FilterContext.Provider>
    );
};

//hook with a safety check
//Easy, typed access to the context; throws if used outside the provider.
export function useFilterContext() {
    const context = useContext(FilterContext);
    if(!context) throw new Error("useFilterContext must be used within a FilterProvider");
    return context;
}

