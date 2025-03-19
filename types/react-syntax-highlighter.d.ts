declare module 'react-syntax-highlighter' {
    import { ComponentType, ReactNode } from 'react';

    export const Prism: ComponentType<{
        language?: string;
        style?: Record<string, unknown>;
        children: string;
        className?: string;
        inline?: boolean;
        [key: string]: unknown;
    }>;

    export const Light: ComponentType<{
        language?: string;
        style?: Record<string, unknown>;
        children: string;
        className?: string;
        inline?: boolean;
        [key: string]: unknown;
    }>;
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
    const dracula: Record<string, unknown>;
    const tomorrow: Record<string, unknown>;
    const vscDarkPlus: Record<string, unknown>;
    const vs: Record<string, unknown>;
    const atomDark: Record<string, unknown>;
    const base16AteliersulphurpoolLight: Record<string, unknown>;

    export { dracula, tomorrow, vscDarkPlus, vs, atomDark, base16AteliersulphurpoolLight };
} 