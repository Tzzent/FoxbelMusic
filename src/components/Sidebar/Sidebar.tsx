import { useContext, useEffect, useState } from 'react';
import { AuthCtx } from '../../context/AuthCtx';
import useApi from '../../hooks/useApi';
import useSidebar from '../../hooks/useSidebar';
import { Playlist } from '../../interfaces/Playlist';
import Overlay from '../Overlay';
import List from './List';
import Logo from './Logo';

const initialSideList = [
  {
    label: 'Mi Libreria',
    list: [
      { label: 'Recientes', to: '/home' },
      { label: 'Artistas', to: '/artists' },
      { label: 'Álbums', to: '/albums' },
      { label: 'Canciones', to: '/tracks' },
    ],
  },
]

export default function Sidebar() {
  const { user } = useContext(AuthCtx);
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [sideList, setSideList] = useState(initialSideList);
  const { response: { data: playlists } }: { response: { data: Playlist[] } } = useApi(`/user/${user?.id}/playlists`);

  useEffect(() => {
    const lastPlaylists = playlists?.map((playlist) => {
      return {
        label: playlist.title,
        to: `/playlist/${playlist.id}`,
      }
    });
    if (lastPlaylists) {
      setSideList([
        ...initialSideList,
        {
          label: 'Playlist',
          list: lastPlaylists,
        },
      ])
    }
  }, [playlists])

  return (
    <div
      className={`
      w-52
      lg:w-80
      h-screen
      bg-[#662323]
      fixed
      top-0
      px-8
      py-5
      lg:left-0
      ${isSidebarOpen ? 'z-30' : 'z-20'}
      ${isSidebarOpen ? 'left-0' : '-left-80'}
      `}
    >
      <Logo />
      <div
        className="
        h-full
        my-10
        "
      >
        {sideList.map((item, index) => (
          <List
            key={index}
            listing={item}
          />))}
      </div>
      <Overlay
        clickOverlay={closeSidebar}
        className={`
        w-screen h-screen
        ${isSidebarOpen
            ? 'left-52 lg:left-80'
            : 'left-[500vw]'}
        `}
      />
    </div>
  )
}
