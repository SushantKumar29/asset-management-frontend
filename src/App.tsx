import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppRoutes from "@/router/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="h-full">
          <AppRoutes />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
