export const convertImageToFile = (url: string) => {
  if (url)
    return fetch(`http://localhost:8080/image?url=${url}`).then(
      async response => {
        let filename = url.split('/').pop() || 'myFile.jpg';
        let match = /\.(\w+)$/.exec(filename || '');
        let type = match ? `image/${match[1]}` : `image`;
        const blob = await response.blob();
        return new File([blob], filename, {type: type});
      },
    );
};
