import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import ServerGrid from "@/components/dashboard/ServerGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <section className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Server Monitoring Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Real-time infrastructure monitoring
            </p>
          </div>

          <ServerGrid />
        </section>
      </div>
    </main>
  );
}
