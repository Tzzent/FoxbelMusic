import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowRightFromBracket,
  faSearch,
  faEllipsisVertical,
  faPlay,
  faPause,
  faEllipsis,
  faForwardStep,
  faBackwardStep,
  faVolumeOff,
  faVolumeLow,
  faVolumeHigh,
  faClock,
  faMusic,
  faPeopleGroup,
  faShare,
  faCircle,
  faShareNodes,
  faMagnifyingGlass,
  faUser,
  faBraille,
  faRecordVinyl,
  faCalendarDays,
  faShuffle,
  faBars,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import {
  faInstagram,
  faGithub,
  faFacebook,
  faLinkedin,
  faWhatsapp,
  faDeezer,
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faArrowRightFromBracket,
  faSearch,
  faEllipsisVertical,
  faPlay,
  faEllipsis,
  faBackwardStep,
  faForwardStep,
  faVolumeOff,
  faPause,
  faVolumeLow,
  faVolumeHigh,
  faClock,
  faMusic,
  faPeopleGroup,
  faShare,
  faCircle,
  faShareNodes,
  faMagnifyingGlass,
  faUser,
  faBraille,
  faRecordVinyl,
  faCalendarDays,
  faShuffle,
  faBars,
  faRightFromBracket,

  faInstagram,
  faGithub,
  faFacebook,
  faLinkedin,
  faWhatsapp,
  faDeezer,
);

window.FontAwesomeIcon = FontAwesomeIcon;

import Home from './views/Home';

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import Artists from './views/Artists';
import Albums from './views/Albums';
import Tracks from './views/Tracks';
import Playlist from './views/Playlist';
import Album from './views/Album';
import Artist from './views/Artist';
import Auth from './views/Auth';
import { AuthProvider } from './context/AuthCtx';
import Login from './views/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Auth />} />
      <Route element={<Layout />}>
        <Route index path='/home' element={<Home />} />
        <Route path='artists' element={<Artists />} />
        <Route path='artists/:id' element={<Artist />} />
        <Route path='albums' element={<Albums />} />
        <Route path='albums/:id' element={<Album />} />
        <Route path='tracks' element={<Tracks />} />
        <Route path='playlist/:id' element={<Playlist />} />
      </Route>
      <Route path='*' element={<h1>404 NOT FOUND</h1>} />
    </>
  )
)

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}