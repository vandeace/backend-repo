import { initializeApp } from "firebase/app";
import { cert, initializeApp as intializeAdmin } from "firebase-admin/app";
import admin from "firebase-admin";
import config from "./envConfig";

export const firebase = initializeApp(config.firebaseConfig);

export const adminFirebase = admin;

adminFirebase.initializeApp({
  credential: admin.credential.cert({
    projectId: "e-buddy-dc6bb",
    clientEmail: config.fireBaseAdminConfig.clientEmail,
    privateKey: config.fireBaseAdminConfig.privateKey
      ? config.fireBaseAdminConfig.privateKey.replace(/\\n/g, "\n")
      : "",
  }),
});
