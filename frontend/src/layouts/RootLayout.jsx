import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader.jsx';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
