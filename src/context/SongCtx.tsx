import {
  createContext,
  useReducer,
  Dispatch
} from 'react';

import { Track } from '../interfaces/Track';
import { Track_v2 } from '../interfaces/Track_v2';

interface SongState {
  songs: (Track[] | Track_v2[]),
  currentSong: number,
  currentListId: string,
  isPlaying: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>,
}

interface SongProviderProps {
  children: React.ReactNode,
}

export const SongCtx = createContext<SongState>({} as SongState);

export function SongProvider({
  children,
}: SongProviderProps) {
  const [state, dispatch] = useReducer(SongReducer, {
    songs: [],
    currentSong: -1,
    currentListId: '-1',
    isPlaying: false,
    dispatch: () => { null },
  })


  return (
    <SongCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </SongCtx.Provider>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SongReducer = (state: SongState, action: any) => {
  switch (action.type) {
    case 'SET_SONGS':
      return {
        ...state, songs: action.payload,
        currentListId: action.listId,
      }
    case 'PLAY_SONG':
      return {
        ...state,
        currentSong: action.payload,
        isPlaying: true,
      }
    case 'PAUSE_SONG':
      return {
        ...state,
        isPlaying: false,
      }
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case 'PREV_SONG':
      return {
        ...state,
        currentSong: state.currentSong - 1,
        isPlaying: true,
      }
    case 'NEXT_SONG':
      return {
        ...state,
        currentSong: state.currentSong + 1,
        isPlaying: true,
      }
    default:
      return state;
  }
}