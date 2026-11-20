export const LIVRO_LOGO_URL =
  "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/66c2d2db7_livro-logo.png";

// Lesson and project pages (not index, builder or editor screens)
export function isLessonPath(path) {
  if (/^\/lessons\/[^/]+$/.test(path)) return true;
  if (/^\/embed\/lesson\/[^/]+$/.test(path)) return true;
  if (/^\/maker\/[^/]+$/.test(path) && path !== "/maker/new") return true;
  if (/^\/share\/(?!courses$|maker$|course\/)/.test(path)) return true;
  return false;
}

export async function loadLogoDataUrl() {
  const res = await fetch(LIVRO_LOGO_URL);
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}