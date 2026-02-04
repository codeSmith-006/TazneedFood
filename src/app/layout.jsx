import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: {
    default: "TanzeenFood - Premium Natural Products",
    template: "%s | TanzeenFood",
  },
  description: "Shop premium organic products including raw honey, pure ghee, natural oils, and dates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
