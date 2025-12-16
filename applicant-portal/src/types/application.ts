export interface ApplicationFormData {
  // Step 1: Personal Information
  jinaKamili: string;
  jinsia: 'kiume' | 'kike' | '';
  tareheKuzaliwa: Date | null;
  haliNdoa: string;
  uraia: string;
  nambaKitambulisho: string;
  anwaniMakazi: string;
  jinaKamililamzazi: string
  mkoa: string;
  wilaya: string;
  chuo:string;
  fani:string;

  // Step 2: Contact Information
  nambaSimu: string;
  nambaSimuZiada: string;
  baruaPepe: string;

  // Step 3: Education
  kiwagoElimu: string;
  taasisiShule: string;
  koziFani: string;
  mwakaKuhitimu: string;
  ufaulu:string;

  // Step 4: Declaration & Attachments
  confirmAccuracy: boolean;
  agreeToRules: boolean;
  jinaMwombaji: string;
  sahihi: string;
  tarehe: string;
  pichaPasipoti: File | null;
  nakalaKitambulisho: File | null;
  vyetiElimu: File | null;
}

export interface ApplicationSubmission extends Omit<ApplicationFormData, 'pichaPasipoti' | 'nakalaKitambulisho' | 'vyetiElimu' | 'tareheKuzaliwa'> {
  id: string;
  referenceNumber: string;
  status: 'pending' | 'review' | 'approved' | 'rejected';
  tareheKuzaliwa: string;
  pichaPasipotiUrl: string;
  nakalaKitambulishoUrl: string;
  vyetiElimuUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const initialFormData: ApplicationFormData = {
  jinaKamili: '',
  jinsia: '',
  tareheKuzaliwa: null,
  haliNdoa: '',
  uraia: 'Tanzania',
  nambaKitambulisho: '',
  anwaniMakazi: '',
  mkoa: '',
  wilaya: '',
  nambaSimu: '',
  nambaSimuZiada: '',
  baruaPepe: '',
  kiwagoElimu: '',
  taasisiShule: '',
  koziFani: '',
  mwakaKuhitimu: '',
  confirmAccuracy: false,
  agreeToRules: false,
  jinaMwombaji: '',
  sahihi: '',
  tarehe: new Date().toISOString().split('T')[0],
  pichaPasipoti: null,
  nakalaKitambulisho: null,
  vyetiElimu: null,
  jinaKamililamzazi: "",
  chuo: "",
  fani: "",
  ufaulu: ""
};
