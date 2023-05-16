import { ChangeEvent, useRef, useState } from 'react';
import { useCallback } from 'react';
import useApi from '../../hooks/useApi';
import { Track_v2 } from '../../interfaces/Track_v2';
import Icon from '../Icon';
import ListResult from './ListResult';

export default function Search() {
  const inputRef = useRef(null);
  const [search, setSearch] = useState<string>('');
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [typingTimer, setTypingTimer] = useState<number | undefined>(undefined)

  const { response }: { response: { data: Track_v2[] | [] } } = useApi(`/search?q=${search}/&limit=10`);

  const handleOnChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(typingTimer);

    setTypingTimer(setTimeout(async () => {
      if (!ev.target.value) {
        return setDropOpen(false);
      }

      setSearch(ev.target.value);
    }, 600));
  }, [typingTimer]);

  return (
    <label
      ref={inputRef}
      htmlFor="search"
      className="
      relative 
      w-full
      sm:max-w-lg
      text-gray-600
      row-start-2
      col-span-3
      "
    >
      <input
        id="search"
        onChange={handleOnChange}
        onFocus={() => setDropOpen(true)}
        type="text"
        placeholder="Buscar..."
        className="
        px-3
        py-2
        border
        border-gray-500
        outline-rose-500
        rounded-xl
        w-full
        "
      />
      <div
        className="
        flex
        items-center
        absolute 
        right-2 
        top-0
        bottom-0
        "
      >
        <Icon icon="magnifying-glass" className="text-red-950" />
      </div>
      <ListResult
        parentRef={inputRef}
        result={response.data}
        isOpen={dropOpen}
        onHide={() => setDropOpen(false)}
      />
    </label>
  )
}
