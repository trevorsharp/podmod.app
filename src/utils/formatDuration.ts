const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  duration -= hours * 3600;
  const minutes = Math.floor(duration / 60);
  duration -= minutes * 60;
  const seconds = duration;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

export default formatDuration;
