import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0a0a", // Đen sâu thẳm
                foreground: "#ededed", // Trắng khói
                primary: "#3b82f6", // Xanh dương neon
                secondary: "#171717", // Đen nhạt hơn cho card
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#ededed',
                        a: {
                            color: '#3b82f6',
                            '&:hover': {
                                color: '#60a5fa',
                            },
                        },
                        h1: { color: '#ffffff' },
                        h2: { color: '#ffffff' },
                        h3: { color: '#ffffff' },
                        strong: { color: '#ffffff' },
                        code: { color: '#f59e0b' },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
