import {
  useContext,
  useCallback,
} from 'react';
import { SongCtx } from '../context/SongCtx';
import { Track } from '../interfaces/Track';
import { Track_v2 } from '../interfaces/Track_v2';


export default function useSongCtx() {
  const context = useContext(SongCtx);

  if (!context) {
    throw new Error('useSongCtx must be used inside SongCtx Provider');
  }

  const updateSongs = useCallback((songs: (Track[] | Track_v2[]), listId: number | string | undefined) => {
    context.dispatch({ type: 'SET_SONGS', payload: songs, listId: listId });
  }, [context]);

  const togglePlay = useCallback(() => {
    if (context.currentSong === -1) {
      return context.dispatch({ type: 'PLAY_SONG', payload: 0 })
    }
    context.dispatch({ type: 'TOGGLE_PLAY' })
  }, [context]);

  const playSong = useCallback((indexSong = 0) => {
    context.dispatch({ type: 'PLAY_SONG', payload: indexSong })
  }, [context]);

  const pauseSong = useCallback(() => {
    context.dispatch({ type: 'PAUSE_SONG' })
  }, [context]);

  const nextSong = useCallback(() => {
    if (context.currentSong === context.songs.length - 1) {
      return context.dispatch({ type: 'PLAY_SONG', payload: 0 })
    }

    context.dispatch({ type: 'NEXT_SONG' })
  }, [context]);

  const prevSong = useCallback(() => {
    if (context.currentSong === 0) {
      return context.dispatch({ type: 'PLAY_SONG', payload: context.songs.length - 1 })
    }

    context.dispatch({ type: 'PREV_SONG' })
  }, [context]);

  return {
    updateSongs,
    togglePlay,
    playSong,
    pauseSong,
    nextSong,
    prevSong,
    ...context,
  }
}