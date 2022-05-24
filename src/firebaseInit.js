// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDct2s9PrpjmWwJ-lUoTNfuVHizw1O_Hhc",
  authDomain: "safespace-e3471.firebaseapp.com",
  databaseURL: "https://safespace-e3471-default-rtdb.firebaseio.com",
  projectId: "safespace-e3471",
  storageBucket: "safespace-e3471.appspot.com",
  messagingSenderId: "131458884742",
  appId: "1:131458884742:web:ccedfe591ddbf9c5fe5d07",
  measurementId: "G-EJX4Z6BBRC"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
const usersCollection = collection(db, 'users');
const professionCollection = collection(db, 'professions');

export let getProfessions = () => {
  return getDocs(professionCollection)
  .then((snapshot) =>
  {
    let professions = [];
    snapshot.docs.forEach((doc) => {
      professions.push({id: doc.id, ...doc.data()});
    });
    return professions;
  });
}

export let getUsers = () => {
  return getDocs(usersCollection)
  .then((snapshot) =>
  {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
  });
}

export let getUser = async (username, password) => {
  const userQuery = await query(usersCollection, where("username", "==", username), where("password", "==", password));
  const snapshot = await getDocs(userQuery);

  let users = [];
  snapshot.forEach((doc) => {
    users.push(doc.data())
  });

  if (users.length != 1) {
    return null;
  }

  return users[0];
}

export let getProfession = async (profesionId) => {
  const userQuery = await query(professionCollection, where("__name__", "==", profesionId));
  const snapshot = await getDocs(userQuery);

  let pros = [];
  snapshot.forEach((doc) => {
    pros.push({id: doc.id, ...doc.data()})
  });

  if (pros.length != 1) {
    return null;
  }

  return pros[0];
}

export let isPro = async (username, password) => {
  const user = await getUser(username, password);
  const proQuery = await query(professionCollection, where("__name__", "==", user.profession.id));
  const snapshot = await getDocs(proQuery);
  let pros = [];
  snapshot.forEach((doc) => {
    pros.push(doc.data())
  });

  return pros.length > 0;
}

export let addUser = async (username, password, name, familyName, professionId) => {
  const user_exists = await getUser(username, password) != null;
  if (user_exists) {
    console.log("user already exists");
    return false;
  }
  let user = doc(usersCollection);
  setDoc(user, {username, password, name, family_name: familyName, profession: await getProfession(professionId)});

  return true;
}
