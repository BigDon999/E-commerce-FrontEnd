import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyShop - Your Online Store",
  description: "Shop the latest trends in fashion, electronics, and more",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
   
      <body >
        <ProductProvider>
          <CartProvider>
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </ProductProvider>
      </body>
   
  );
}
