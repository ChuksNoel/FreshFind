export const marketImage = (market) => market.id % 2 === 0
  ? '/images/lagos-market-stall.png'
  : '/images/lagos-market-hero.png';

export function isOpenToday(market, date = new Date()) {
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'Africa/Lagos' }).format(date);
  return market.days.includes(weekday);
}

export function isOpenNow(market, date = new Date()) {
  if (!isOpenToday(market, date)) return false;
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).format(date);
  return time >= market.openingTime && time < market.closingTime;
}

export function formatTime(time) {
  const [hour, minute] = time.split(':').map(Number);
  return `${hour % 12 || 12}${minute ? `:${String(minute).padStart(2, '0')}` : ''} ${hour >= 12 ? 'PM' : 'AM'}`;
}
