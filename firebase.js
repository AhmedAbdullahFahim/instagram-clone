import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCHBOjjFN48AsBPWWhPndBBpWc4iiH5Lsg',
  authDomain: 'instagram-clone-e06e1.firebaseapp.com',
  projectId: 'instagram-clone-e06e1',
  storageBucket: 'instagram-clone-e06e1.appspot.com',
  messagingSenderId: '717168266',
  appId: '1:717168266:web:e7bddb73c6946e2ccf9773',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
