import { LightColors, ThemeColors } from '@/constants/ThemeColors';
import React, { createContext, useContext } from 'react';

interface ThemeContextType {
    colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const colors = LightColors;

    return (
        <ThemeContext.Provider value={{ colors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
