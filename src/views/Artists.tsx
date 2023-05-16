import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Container from '../components/Container';
import Empty from '../components/Empty';
import Grid from '../components/Grid';
import useApi from '../hooks/useApi';
import { Artist } from '../interfaces/Artist';

export default function Artists() {
  const navigate = useNavigate();
  const { response }: { response: { data: Artist[] } } = useApi('/chart/0/artists');

  const handleClickOverlay = useCallback((id: number) => {
    navigate(`/artists/${id}`);
  }, [navigate]);

  if (response.data?.length === 0) {
    return (
      <Container>
        <Empty
          title="No sigues a ningun artista"
          subTitle="Busca y sigue a tus artistas favoritos para que aparezcan aqui."
        />
      </Container>
    )
  }

  return (
    <Container>
      <div className="mx-2">
        <Grid>
          {response.data?.map((artist, index) => (
            <Avatar
              key={index}
              id={artist.id}
              imageSrc={artist.picture_big}
              name={artist.name}
              label={artist.name}
              clickOverlay={handleClickOverlay}
              className="max-w-[14em] max-h-[14em]"
              labelPosition="bottom"
            />
          ))}
        </Grid>
      </div>
    </Container>
  )
}
