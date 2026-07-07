"use client";

import { useAuth } from "@/contexts/AuthContext";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Server Monitor
        </h1>
        <p className="text-sm text-slate-400">
          Realtime infrastructure monitoring dashboard
        </p>
      </div>

      <div className="flex items-center gap-4">
        {!loading && user ? (
          <>
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {user.email}
              </p>
              <p className="text-xs text-slate-400">
                Authenticated session
              </p>
            </div>
            <LogoutButton />
          </>
        ) : (
          <div className="text-sm text-slate-400">
            Not signed in
          </div>
        )}
      </div>
    </header>
  );
}
