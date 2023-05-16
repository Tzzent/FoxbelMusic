export const humanReadableFans = (nbFans: number | undefined) => {
  if (!nbFans) {
    return '0';
  }

  if (nbFans >= 1000000000) {
    return '+ ' + (nbFans / 1000000000).toFixed(1) + 'B';
  } else if (nbFans >= 1000000) {
    return '+ ' + (nbFans / 1000000).toFixed(1) + 'M';
  } else if (nbFans >= 1000) {
    return '+ ' + Math.floor(nbFans / 1000) + ' Mil';
  } else {
    return '+ ' + nbFans.toString();
  }
}