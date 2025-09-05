import { Rider, RiderId } from './types';

export const AVAILABLE_RIDERS: Rider[] = [
  { 
    id: RiderId.GROUP_LIFE, 
    name: 'Group Life (Death Only)', 
    premiumRate: 5.50,
    description: 'Provides a lump sum payment to beneficiaries upon the death of a member.',
    details: 'This is the core benefit. It pays out the agreed Sum Assured to the designated beneficiaries if the insured member passes away during the policy term. Covers death from any cause, subject to policy exclusions.'
  },
  { 
    id: RiderId.PERMANENT_DISABILITY, 
    name: 'Permanent Disability', 
    premiumRate: 1.20,
    description: 'Pays a lump sum if a member becomes permanently disabled due to accident or illness.',
    details: 'Provides financial protection if an insured member suffers an injury or illness that results in total and permanent disability, preventing them from ever returning to work.'
  },
  { 
    id: RiderId.TEMPORARY_DISABILITY, 
    name: 'Temporary Disability', 
    premiumRate: 0.80,
    description: 'Provides income replacement if a member is temporarily unable to work due to injury.',
    details: 'Pays a weekly benefit for a specified period if a member is temporarily unable to perform their job due to a covered accident or injury.'
  },
  { 
    id: RiderId.MEDICAL_EXPENSES, 
    name: 'Medical Expenses (Injury)', 
    premiumRate: 2.50,
    description: 'Reimburses medical costs incurred as a result of an accident.',
    details: 'Covers the cost of medical treatment, hospitalization, and related expenses for injuries sustained by an insured member from an accident.'
  },
  { 
    id: RiderId.CRITICAL_ILLNESS, 
    name: 'Critical Illness', 
    premiumRate: 3.00,
    description: 'Pays a lump sum upon diagnosis of a specified critical illness.',
    details: 'Provides a one-time, tax-free lump sum payment upon the first diagnosis of a major illness covered by the policy, such as cancer, stroke, or heart attack. This helps cover costs beyond what standard health insurance pays.'
  },
  { 
    id: RiderId.HOSPITALIZATION, 
    name: 'Hospitalization', 
    premiumRate: 4.50,
    description: 'Provides a daily cash benefit for each day a member is hospitalized.',
    details: 'Pays a fixed daily amount to the insured member for each day they are confined to a hospital due to a covered illness or injury. This helps with incidental expenses not covered by health insurance.'
  },
  { 
    id: RiderId.PARENTAL_BENEFIT, 
    name: 'Parental Benefit', 
    premiumRate: 0.75,
    description: "Provides a benefit upon the death of a member's parent or parent-in-law.",
    details: 'This is a funeral benefit that pays a lump sum to the insured member upon the death of their parent(s) or parent(s)-in-law, helping to cover final expenses.'
  },
];

export const SUM_ASSURED_OPTIONS = [20000, 30000, 50000];