export default function validateFileExt(filename: string, allowedExts: string[]): boolean {
  const fileExt = filename.split(".").pop()?.toLowerCase();
  return fileExt !== undefined && allowedExts.includes(fileExt);
}