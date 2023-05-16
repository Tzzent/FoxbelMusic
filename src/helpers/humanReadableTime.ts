export const humanTrackTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const musicTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return (musicTime);
}

export const humanPlaylistTime = (seconds: number | undefined) => {
  if (!seconds) {
    return "0:00";
  }

  let time = "";

  // Calcula los días
  if (seconds >= 86400) {
    const days = Math.floor(seconds / 86400);
    time += `${days}d `;
    seconds -= days * 86400;
  }

  // Calcula las semanas
  if (seconds >= 604800) {
    const weeks = Math.floor(seconds / 604800);
    time += `${weeks}w `;
    seconds -= weeks * 604800;
  }

  // Calcula los meses
  if (seconds >= 2592000) {
    const months = Math.floor(seconds / 2592000);
    time += `${months}mo `;
    seconds -= months * 2592000;
  }

  // Calcula las horas
  if (seconds >= 3600) {
    const hours = Math.floor(seconds / 3600);
    time += `${hours}h `;
    seconds -= hours * 3600;
  }

  // Calcula los minutos
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    time += `${minutes}m `;
    seconds -= minutes * 60;
  }

  // Agrega los segundos restantes
  if (seconds > 0 || time === "") {
    time += `${seconds}s`;
  }

  return time.trim();
}

export const humanTimeAdd = (time: number) => {
  const date = new Date(time * 1000);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}