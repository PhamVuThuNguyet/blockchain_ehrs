/**
 * @author Nguyetpvt
 * @email pvtnguyet.19it1@vku.udn.vn
 * @desc [The base patient class]
 */
/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
const crypto = require('crypto');

class Patient {

    constructor(patientId, citizenId, firstName, lastName, password, sex, birth, phoneNumber, emergPhoneNumber, address, bloodGroup, ehrUrl, publicKey, privateKey) {
        const patient = {};
        patient.patientId = patientId;
        patient.citizenId = citizenId;
        patient.firstName = firstName;
        patient.lastName = lastName;
        patient.password = crypto.createHash('sha256').update(password).digest('hex');
        patient.sex = sex;
        patient.birth = birth;
        patient.phoneNumber = phoneNumber;
        patient.emergPhoneNumber = emergPhoneNumber;
        patient.address = address;
        patient.bloodGroup = bloodGroup;
        patient.pwdTemp = true;
        patient.permissionGranted = [];
        patient.ehr = ehrUrl;
        patient.publicKey = publicKey;
        patient.privateKey = privateKey;
        patient.chiefComplaint = null;
        patient.HPI = null;
        patient.PMH = null;
        patient.physicalExamination = null;
        patient.paraclinicalTests = null;
        patient.diagnosis = null;
        patient.treatment = null;
        return patient;
    }
}
module.exports = Patient;