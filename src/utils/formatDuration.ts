const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  duration -= hours * 3600;
  const minutes = Math.floor(duration / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export default formatDuration;
