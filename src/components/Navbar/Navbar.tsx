import { useEffect, useState } from 'react';
import useSidebar from '../../hooks/useSidebar';
import Button from '../Button';
import Container from '../Container';
import Icon from '../Icon';
import Search from './Search';
import UserMenu from './UserMenu';

export default function Navbar() {
  const { toggleSidebar } = useSidebar();
  const [changeStyle, setChangeStyle] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 40) {
        setChangeStyle(true);
      }
      if (scrollY < 40) {
        setChangeStyle(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <div
        className={`
        fixed
        top-0
        right-0
        left-0
        lg:left-80
        z-20
        py-3
        grid
        grid-col-3
        gap-2
        sm:flex
        px-2
        ${changeStyle ? 'bg-red-300' : 'bg-white'}
        ${changeStyle ? 'rounded-b-2xl' : 'rounded-none'}
        ${changeStyle ? 'shadow-2xl' : 'shadow-none'}
        `}
      >
        <Button
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Icon icon="bars" className="text-red-900" />
        </Button>
        <Search />
        <UserMenu />
      </div>
    </Container >
  )
}
