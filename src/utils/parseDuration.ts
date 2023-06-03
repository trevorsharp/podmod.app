const parseDuration = (duration: number | string | undefined) => {
  if (duration === undefined) return duration;
  if (typeof duration === 'number') return duration;

  if (!duration.match(/^([0-9]{1,2}:){0,2}[0-9]{1,2}$/)) return 0;

  let durationParts = duration.split(':');

  if (durationParts.length === 1) durationParts = ['0', '0', ...durationParts];
  else if (durationParts.length === 2) durationParts = ['0', ...durationParts];

  return (
    Number.parseInt(durationParts[0] ?? '0') * 3600 +
    Number.parseInt(durationParts[1] ?? '0') * 60 +
    Number.parseInt(durationParts[2] ?? '0')
  );
};

export default parseDuration;
