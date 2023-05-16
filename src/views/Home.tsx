import Ad from '../components/Ad/Ad';
import Album from '../components/Album';
import Container from '../components/Container';
import Grid from '../components/Grid';
import Title from '../components/Title';
import useTopAlbums from '../hooks/useTopAlbums';
import { TopAlbum } from '../interfaces/TopAlbum';


export default function Home() {
  const { data } = useTopAlbums();

  return (
    <Container>
      <div className="px-2">
        <Ad
          topAlbum={data[0]}
        />
        <Title
          label="Resultados"
          color="#E86060"
        />
        <Grid>
          {data.map((album: TopAlbum) => (
            <Album
              key={album.id}
              albumId={album.id}
              imageSrc={album.cover_big}
              title={album.title}
              artist={album.artist}
              className="text-white"
            />
          ))}
        </Grid>
      </div>
    </Container>
  )
}
