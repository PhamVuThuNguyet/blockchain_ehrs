/* eslint-disable new-cap */
/**
 * @author Nguyetpvt
 * @email pvtnguyet.19it1@vku.udn.vn
 **/

const fs = require('fs');
const { enrollAdminHosp1 } = require('./enrollAdmin-Hospital1');
const { enrollAdminHosp2 } = require('./enrollAdmin-Hospital2');
const { enrollRegisterUser } = require('./registerUser');
const { createRedisClient } = require('./utils');
const cryptography = require('./src/utils/cryptography');

const redis = require('redis');


/**
 * @description Enrolls and registers the patients in the initLedger as users.
 */
async function initLedger() {
  try {
    const jsonString = fs.readFileSync('../patient-asset-transfer/chaincode/lib/initLedger.json');
    const patients = JSON.parse(jsonString);
    let i = 0;
    for (i = 0; i < patients.length; i++) {
      const attr = { firstName: patients[i].firstName, lastName: patients[i].lastName, role: 'patient' };
      await enrollRegisterUser('1', 'PID' + i, JSON.stringify(attr));
    }
  } catch (err) {
    console.log(err);
  }
}
/**
 * @description Init the redis db with the admins credentials
 */
async function initRedis() {
  let redisUrl = 'redis://127.0.0.1:6379';
  let redisPassword = 'hosp1neuralmed';
  let redisClient = redis.createClient(redisUrl);
  redisClient.AUTH(redisPassword);
  redisClient.SET('hosp1admin', redisPassword);
  redisClient.QUIT();

  redisUrl = 'redis://127.0.0.1:6380';
  redisPassword = 'hosp2neuralmed';
  redisClient = redis.createClient(redisUrl);
  redisClient.AUTH(redisPassword);
  redisClient.SET('hosp2admin', redisPassword);
  console.log('Done');
  redisClient.QUIT();
  return;
}

/**
 * @description Create doctors in both organizations based on the initDoctors JSON
 */
async function enrollAndRegisterDoctors() {
  try {
    const jsonString = fs.readFileSync('./initDoctors.json');
    const doctors = JSON.parse(jsonString);
    for (let i = 0; i < doctors.length; i++) {
      const attr = { firstName: doctors[i].firstName, lastName: doctors[i].lastName, role: 'doctor', speciality: doctors[i].speciality };
      // Create a redis client and add the doctor to redis
      doctors[i].hospitalId = parseInt(doctors[i].hospitalId);
      const redisClient = createRedisClient(doctors[i].hospitalId);
      (await redisClient).SET('HOSP' + doctors[i].hospitalId + '-' + 'DOC' + i, 'password');
      await enrollRegisterUser(doctors[i].hospitalId, 'HOSP' + doctors[i].hospitalId + '-' + 'DOC' + i, JSON.stringify(attr));
      (await redisClient).QUIT();
    }
  } catch (error) {
    console.log(error);
  }
};

async function createCryptoKey() {
  const keychain = await cryptography.createKeyPair();
  const secretKey = keychain.secretKey.save();
  const publicKey = keychain.publicKey.save();
  const galoisKeys = keychain.galoisKeys.save();

  fs.writeFile("secretKey.txt", secretKey, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing keychain to file.");
      return console.log(err);
    }

    console.log("TXT key file has been saved.");
  });

  fs.writeFile("publicKey.txt", publicKey, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing keychain to file.");
      return console.log(err);
    }

    console.log("TXT key file has been saved.");
  });

  fs.writeFile("galoisKeys.txt", galoisKeys, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing keychain to file.");
      return console.log(err);
    }

    console.log("TXT key file has been saved.");
  });
}

/**
 * @description Function to initialise the backend server, enrolls and regsiter the admins and initLedger patients.
 * @description Need not run this manually, included as a prestart in package.json
 */
async function main() {
  await enrollAdminHosp1();
  await enrollAdminHosp2();
  await initLedger();
  await initRedis();
  await enrollAndRegisterDoctors();
  await createCryptoKey();
}


main();
