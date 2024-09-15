export const timeformat = (date: Date) => {
  return date.toLocaleString("id-ID", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const dateformat = (date: Date) => {
  return date.toLocaleDateString("id");
};

export const timepass = (date1: Date, date2: Date): Date => {
  return new Date(date1.getTime() - date2.getTime());
};

export const timeDifference = (waktu1: Date, waktu2: Date) => {
  const diffInMilliseconds = Math.abs(waktu2.getTime() - waktu1.getTime());

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  let result = [];

  if (days > 0) result.push(`${days} hari`);
  if (remainingHours > 0) result.push(`${remainingHours} jam`);
  if (remainingMinutes > 0) result.push(`${remainingMinutes} menit`);
  if (remainingSeconds > 0) result.push(`${remainingSeconds} detik`);

  return result.length > 0 ? result.join(", ") + " yang lalu" : "Baru saja";
};

export const time3Offset = (Start: Date, End: Date, Now: Date) => {
  const start = Start.getTime();
  const end = End.getTime();
  const now = Now.getTime();

  if (now <= start) return 0;
  if (now >= end) return 1;

  // Menghitung progress antara waktuStart dan waktuAkhir
  const offset = (now - start) / (end - start);

  return offset;
};

export const time3Difference = (
  waktuStart: Date,
  waktuEnd: Date,
  waktuNow: Date = new Date()
) => {
  const diffInMillisecondsStart = waktuNow.getTime() - waktuStart.getTime();
  const diffInMillisecondsEnd = waktuEnd.getTime() - waktuNow.getTime();

  const formatDifference = (diffInMilliseconds: number) => {
    const seconds = Math.floor(Math.abs(diffInMilliseconds) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    const remainingHours = hours % 24;

    let result = [];

    if (days > 0) result.push(`${days} hari`);
    if (remainingHours > 0) result.push(`${remainingHours} jam`);
    if (remainingMinutes > 0) result.push(`${remainingMinutes} menit`);
    if (remainingSeconds > 0) result.push(`${remainingSeconds} detik`);

    return result.length > 0 ? result.join(", ") : "Baru saja";
  };

  const resultStart = formatDifference(diffInMillisecondsStart);
  const resultEnd = formatDifference(diffInMillisecondsEnd);

  if (waktuNow < waktuStart) {
    return `Mulai dalam ${resultStart}`;
  } else if (waktuNow >= waktuStart && waktuNow < waktuEnd) {
    return `Sekarang sedang berlangsung, berakhir dalam ${resultEnd}`;
  } else {
    return `Berakhir pada ${resultEnd} yang lalu`;
  }
};
