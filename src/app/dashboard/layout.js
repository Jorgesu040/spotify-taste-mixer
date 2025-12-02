import Header from "@/components/Header";

export const metadata = {
  title: "ServeLoop",
  description: "La mejor app para gestionar pedidos en restaurantes", 
};

export default function DashboardLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}