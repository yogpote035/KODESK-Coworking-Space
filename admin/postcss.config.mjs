// The standalone admin app uses its own plain CSS design system.
// Keeping this local config prevents Vercel from resolving the public site's
// Tailwind PostCSS configuration outside the admin project root.
const config = {
  plugins: {},
};

export default config;
