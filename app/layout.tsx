import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import { Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/component/Header';
import Footer from '@/app/component/Footer';
import ClientWelcome from '@/app/component/ClientWelcome';

const poppins = Poppins({
  subsets: ["latin" ,"latin-ext"],
  weight: "400" as const,
  style: "normal" as const 
});



export const metadata: Metadata = {
  title: 'Technical Assignment',
  description: "Membership Assignment", 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={poppins.className}>
      <Toaster toastOptions={
          {
            style: {
              background: 'rgb(51 65 85)',
              color: '#fff',
            }
          }} />
          <Header />
          <ClientWelcome />
        {children}
        <Toaster />
        <Footer/>
      </body>
    </html>
  )
}
