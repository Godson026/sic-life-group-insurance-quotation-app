export enum RiderId {
  GROUP_LIFE = 'GROUP_LIFE',
  PERMANENT_DISABILITY = 'PERMANENT_DISABILITY',
  TEMPORARY_DISABILITY = 'TEMPORARY_DISABILITY',
  MEDICAL_EXPENSES = 'MEDICAL_EXPENSES',
  CRITICAL_ILLNESS = 'CRITICAL_ILLNESS',
  HOSPITALIZATION = 'HOSPITALIZATION',
  PARENTAL_BENEFIT = 'PARENTAL_BENEFIT',
}

export interface Rider {
  id: RiderId;
  name: string;
  description: string;
  details: string;
  // Rate per 1000 of sum assured per year
  premiumRate: number;
}

export interface Member {
  id: string;
  fullName: string;
  dob: string;
  age: number;
  employeeId?: string;
}

export interface PolicyDetails {
  groupName: string;
  contactPerson: string;
  contactNumber: string;
  durationYears: number;
  sumAssured: number;
}

export interface QuotationData {
  policyDetails: PolicyDetails;
  selectedRiders: Set<RiderId>;
  members: Member[];
}

export const initialQuotationData: QuotationData = {
  policyDetails: {
    groupName: '',
    contactPerson: '',
    contactNumber: '',
    durationYears: 1,
    sumAssured: 20000,
  },
  selectedRiders: new Set([RiderId.GROUP_LIFE]),
  members: [],
};