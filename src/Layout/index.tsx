import { Outlet } from 'react-router-dom';
import RequireAuth from '../auth/requireAuth';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { SideProvider } from '../context/SideCtx';
import { SongProvider } from '../context/SongCtx';

export default function Layout() {
  return (
    <RequireAuth>
      <SideProvider>
        <SongProvider>
          <Sidebar />
          <Navbar />
          <main className="my-20">
            {
              // This is the place where the child routes will be rendered
              <Outlet />
            }
          </main>
          <Footer />
        </SongProvider >
      </SideProvider>
    </RequireAuth>
  )
}
