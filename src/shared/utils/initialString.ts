const getInitials = (name: string) => {
  if (!name) return "";

  // Pecah nama menjadi array berdasarkan spasi
  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase(); // Ambil huruf pertama dari satu kata
  }

  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
};

export default getInitials;
