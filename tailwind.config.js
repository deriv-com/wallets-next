/* eslint-disable no-undef */
/** This is a script run during build in node environment */
/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("@deriv/quill-design/quill-tailwind/tailwind.config.cjs")],
};
