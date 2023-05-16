import { useCallback, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCtx } from '../../context/AuthCtx';
import Avatar from '../Avatar';
import DropModal from '../Modals/DropModal';
import MenuItem from './MenuItem';

export default function UserMenu() {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthCtx);
  const userRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleOpen = useCallback((): void => {
    setIsMenuOpen((value) => !value);
  }, []);

  return (
    <div
      className="
      relative
      cursor-pointer
      col-span-2
      w-full
      flex
      justify-end
      "
    >
      <div
        ref={userRef}
        onClick={toggleOpen}
        className="flex items-center gap-3"
      >
        <Avatar
          id={1}
          name={user?.name || ''}
          imageSrc={user?.picture_small || '/assets/images/foxbel-music-icon.png'}
          className="max-w-[2em] max-h-[2em]"
          label={user?.name || ''}
          labelPosition="right"
          withOverlay={false}
        />
      </div>
      <DropModal
        parentRef={userRef}
        isOpen={isMenuOpen}
        onHide={() => setIsMenuOpen(false)}
        className="top-14 right-4"
      >
        <MenuItem label="Recientes" onClick={() => navigate('/')} />
        <MenuItem label="Artistas" onClick={() => navigate('/artists')} />
        <MenuItem label="Álbums" onClick={() => navigate('/albums')} />
        <MenuItem label="Canciones" onClick={() => navigate('/tracks')} />
        <hr />
        <MenuItem
          onClick={() => logOut()}
          label="Salir"
          icon={"sign-out"}
          className="hover:bg-red-100"
        />
      </DropModal>
    </div >
  )
}
