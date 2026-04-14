import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

const getCustomersCol = () => collection(db, "customers");

export const createCustomer = async (data) => {
  return await addDoc(getCustomersCol(), {
    ...data,
    active: true,
    createdAt: serverTimestamp(),
  });
};

export const getCustomers = async () => {
  const snap = await getDocs(getCustomersCol());
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};

export const getCustomerById = async (id) => {
  const ref = doc(db, "customers", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  };
};

export const updateCustomer = async (id, data) => {
  const ref = doc(db, "customers", id);
  const { createdAt, ...safeData } = data;

  await updateDoc(ref, {
    ...safeData,
    updatedAt: serverTimestamp(),
  });
};

