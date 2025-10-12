export default interface Clip {
  RowKey: string;
  fileName: string;
  blobUrl: string;
  date: string;
  description: string;
  location: string;
  uploadedBy: string;
  approved: boolean | null;
  approvedBy?: string;
  thumbnail?: string;
}
