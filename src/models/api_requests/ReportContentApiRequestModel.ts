export interface ReportContentApiRequestModel {
  referenceId: number;
  type: string;
  reason: string;
  problems: string[];
}

export default ReportContentApiRequestModel;
