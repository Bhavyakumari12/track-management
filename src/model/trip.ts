export interface Trip {
  start: string;
  end: string;
  level: number;
  isArrow: boolean;
  intermediate?: string[];
}
