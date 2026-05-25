export const metadata = {
 title: "Terra Fitness",
 description: "Gym landing pro"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html><body>{children}</body></html>;
}