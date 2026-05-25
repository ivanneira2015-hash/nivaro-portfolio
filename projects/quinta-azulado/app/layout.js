import './globals.css'

export const metadata = {
  title: 'Quinta Azulado',
  description: 'Eventos inolvidables'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
