export interface Timestamp {
  nanos: number;
  seconds: ISeconds;
}

export interface ISeconds {
  high: number;
  low: number;
  unsigned: boolean;
}

export interface PatientRecord {
  patientId: string;
  citizenId: string;
  firstName: string;
  lastName: string;
  address: string;
  sex: string;
  birth: string;
  emergPhoneNumber: string;
  phoneNumber: string;
  bloodGroup: string;
  publicKey: string;
  privateKey: string;
  ehr: string;
  chiefComplaint: string;
  HPI: string;
  PMH: string;
  physicalExamination: string;
  paraclinicalTests: string;
  diagnosis: string;
  treatment: string;
  docType: string;
  changedBy: string;
  Timestamp: Timestamp;
  proof: Object
}

export class PatientViewRecord {
  patientId = '';
  citizenId = '';
  firstName = '';
  lastName = '';
  address = '';
  sex = '';
  birth = '';
  emergPhoneNumber = '';
  phoneNumber = '';
  bloodGroup = '';
  publicKey: string;
  privateKey: string;
  ehr: string;
  chiefComplaint = '';
  HPI = '';
  PMH = '';
  physicalExamination = '';
  paraclinicalTests = '';
  diagnosis = '';
  treatment = '';
  docType = '';
  changedBy = '';
  Timestamp = '';

  constructor(readonly patientRecord: PatientRecord) {
    this.patientId = patientRecord.patientId;
    this.citizenId = patientRecord.citizenId;
    this.firstName = patientRecord.firstName;
    this.lastName = patientRecord.lastName;
    this.sex = patientRecord.sex;
    this.birth = patientRecord.birth;
    this.phoneNumber = patientRecord.phoneNumber;
    this.emergPhoneNumber = patientRecord.emergPhoneNumber;
    this.address = patientRecord.address;
    this.bloodGroup = patientRecord.bloodGroup;
    // this.docType = patientRecord.docType;
    this.ehr = patientRecord.ehr;
    this.publicKey = patientRecord.publicKey;
    this.privateKey = patientRecord.privateKey;
    this.chiefComplaint = patientRecord.chiefComplaint;
    this.HPI = patientRecord.HPI;
    this.PMH = patientRecord.PMH;
    this.physicalExamination = patientRecord.physicalExamination;
    this.paraclinicalTests = patientRecord.paraclinicalTests;
    this.diagnosis = patientRecord.diagnosis;
    this.treatment = patientRecord.treatment;
    this.changedBy = patientRecord.changedBy;
    this.Timestamp = patientRecord.Timestamp
      ? new Date(patientRecord.Timestamp.seconds.low * 1000).toDateString()
      : '';
  }
}

export class PatientAdminViewRecord {
  patientId = '';
  citizenId = '';
  firstName = '';
  lastName = '';
  sex = '';
  birth = '';
  phoneNumber = '';
  emergPhoneNumber = '';
  address = '';
  bloodGroup = '';
  publicKey = '';

  constructor(readonly patientRecord: PatientRecord) {
    this.patientId = patientRecord.patientId;
    this.citizenId = patientRecord.citizenId;
    this.firstName = patientRecord.firstName;
    this.lastName = patientRecord.lastName;
    this.sex = patientRecord.sex;
    this.birth = patientRecord.birth;
    this.phoneNumber = patientRecord.phoneNumber;
    this.emergPhoneNumber = patientRecord.emergPhoneNumber;
    this.address = patientRecord.address;
    this.bloodGroup = patientRecord.bloodGroup;
    this.publicKey = patientRecord.publicKey;
  }
}

export class PatientDoctorViewRecord {
  patientId = '';
  citizenId = '';
  firstName = '';
  lastName = '';
  sex = '';
  birth = '';
  phoneNumber = '';
  emergPhoneNumber = '';
  address = '';
  bloodGroup = '';
  publicKey = '';
  ehr = '';
  chiefComplaint = '';
  HPI = '';
  PMH = '';
  physicalExamination = '';
  paraclinicalTests = '';
  diagnosis = '';
  treatment = '';
  docType = '';
  changedBy = '';
  Timestamp = '';

  constructor(readonly patientRecord: PatientRecord) {
    this.patientId = patientRecord.patientId;
    this.citizenId = patientRecord.citizenId;
    this.firstName = patientRecord.firstName;
    this.lastName = patientRecord.lastName;
    this.sex = patientRecord.sex;
    this.birth = patientRecord.birth;
    this.phoneNumber = patientRecord.phoneNumber;
    this.emergPhoneNumber = patientRecord.emergPhoneNumber;
    this.address = patientRecord.address;
    this.bloodGroup = patientRecord.bloodGroup;
    this.publicKey = patientRecord.publicKey;
    this.ehr = patientRecord.ehr;
    this.chiefComplaint = patientRecord.chiefComplaint;
    this.HPI = patientRecord.HPI;
    this.PMH = patientRecord.PMH;
    this.physicalExamination = patientRecord.physicalExamination;
    this.paraclinicalTests = patientRecord.paraclinicalTests;
    this.diagnosis = patientRecord.diagnosis;
    this.treatment = patientRecord.treatment;
    this.changedBy = patientRecord.changedBy;
    this.Timestamp = patientRecord.Timestamp
      ? new Date(patientRecord.Timestamp.seconds.low * 1000).toDateString()
      : '';
  }
}

export class DisplayVal {
  keyName: string | number | boolean;
  displayName: string;

  constructor(key: string | number | boolean, value: string) {
    this.keyName = key;
    this.displayName = value;
  }
}
