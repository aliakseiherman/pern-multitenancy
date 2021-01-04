const getSubdomain = (url: string): string => {
  url = url.replace('http://', '');
  url = url.replace(':3000', '');

  if (url.includes('.')) {
    return url.split('.')[0]
  }

  return null;
}

export { getSubdomain }