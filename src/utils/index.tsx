export function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getDuration(created: Date) {
  const now = new Date();
  const ms = now.getTime() - created.getTime();
  const h = Math.round(ms / (1000 * 60 * 60));
  const d = Math.floor(h / 24);
  return (d ? d + ' d ' : '') + (h - d * 24) + ' h';
}
