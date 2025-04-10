function formatTangal(isoDate: string): string {
  const tanggal = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };

  return tanggal.toLocaleDateString("id-ID", options);
}
export default formatTangal;
