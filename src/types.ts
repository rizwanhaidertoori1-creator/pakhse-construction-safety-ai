export type Language = 'en' | 'ur' | 'roman_ur';

export interface RegulatoryFramework {
  id: string;
  name: string;
  shortName: string;
  region: string;
  description: string;
  keyMandates: string[];
  penaltiesSummary: string;
  officialDocRef: string;
}

export interface HazardCategory {
  id: string;
  title: string;
  titleUrdu: string;
  iconName: string;
  description: string;
  pakistanContextNote: string;
  commonHazards: string[];
  controlMeasures: string[];
  requiredPpe: string[];
}

export interface JsaRequest {
  projectType: string;
  locationCity: string;
  specificActivity: string;
  workingHeightOrDepth: string;
  weatherCondition: string;
  crewSize: string;
  equipmentUsed: string[];
}

export interface HazardAnalysisItem {
  stepDescription: string;
  potentialHazards: string[];
  initialRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  mitigationControls: string[];
  residualRisk: 'Low' | 'Medium';
  requiredPpe: string[];
  pakistanStandardRef: string;
}

export interface JsaReport {
  title: string;
  projectType: string;
  location: string;
  dateGenerated: string;
  overallRiskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  summaryUrdu: string;
  summaryEnglish: string;
  hazardSteps: HazardAnalysisItem[];
  emergencyProtocol: string;
  siteSupervisorChecklist: string[];
}

export interface IncidentAnalysis {
  incidentType: string;
  severity: 'Near Miss' | 'Minor Injury' | 'Major Hazard' | 'Critical Emergency';
  detectedHazards: string[];
  immediateStopWorkRequired: boolean;
  rootCauses: string[];
  correctiveActionsEnglish: string[];
  correctiveActionsUrdu: string[];
  relevantPakLaw: string;
  preventativeSop: string;
}

export interface ToolboxTalk {
  id: string;
  topic: string;
  topicUrdu: string;
  category: string;
  estimatedMinutes: number;
  keyTalkingPointsEnglish: string[];
  keyTalkingPointsUrdu: string[];
  interactiveQuestions: string[];
  supervisorNote: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pakCodeRef: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  percentage: number;
  certificateId?: string;
  completionDate?: string;
}

export interface EmergencyContact {
  serviceName: string;
  serviceNameUrdu: string;
  number: string;
  coverage: string;
  description: string;
  priority: 'Immediate' | 'Standard';
}

export interface SafetyProject {
  id: string;
  name: string;
  code: string;
  city: string;
  province: string;
  siteManager: string;
  activeWorkers: number;
  ltiFreeDays: number;
  safetyScore: number;
  status: 'Active' | 'Under Inspection' | 'High Risk Warning';
  incidentsThisMonth: number;
  openHazards: number;
  tbtCountThisMonth: number;
}

export interface IncidentTrendData {
  month: string;
  nearMisses: number;
  firstAid: number;
  minorInjuries: number;
  majorViolations: number;
  safetyScore: number;
}

export interface EquipmentChecklistItem {
  id: string;
  category: 'PPE' | 'Heavy Machineries' | 'Power & Electrical Tools' | 'Hand Tools & Rigging';
  name: string;
  nameUrdu: string;
  code: string;
  frequency: 'Daily' | 'Weekly' | 'Pre-Shift';
  status: 'Pass' | 'Fail' | 'Needs Maintenance' | 'Pending';
  lastInspected: string;
  inspector: string;
  remarks: string;
}

export interface ProjectInspectionReport {
  id: string;
  projectId: string;
  projectName: string;
  date: string;
  inspectorName: string;
  passedCount: number;
  failedCount: number;
  maintenanceCount: number;
  overallComplianceScore: number;
}
