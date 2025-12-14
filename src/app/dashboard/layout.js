import Header from "@/components/Header";


export default function DashboardLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}