import Album from '../components/Album';
import Container from '../components/Container';
import Empty from '../components/Empty';
import Grid from '../components/Grid';
import useApi from '../hooks/useApi';
import { Album as IAlbum } from '../interfaces/Album';

export default function Albums() {
  const { response }: { response: { data: IAlbum[] } } = useApi('/chart/0/albums');

  if (response.data?.length === 0) {
    return (
      <Container>
        <Empty
          title="No tienes ningun album"
          subTitle="Busca y sigue un album para que aparezca aqui."
        />
      </Container>
    )
  }

  return (
    <Container>
      <div className="mx-2">
        <Grid>
          {response.data?.map((album, index) => (
            <Album
              key={index}
              albumId={album.id}
              imageSrc={album.cover_big}
              title={album.title}
              artist={album.artist}
            />
          ))}
        </Grid>
      </div>
    </Container>
  )
}
