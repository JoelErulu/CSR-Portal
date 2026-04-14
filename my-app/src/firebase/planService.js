import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const col = collection(db, "plans");

export const getPlans = async () =>
  (await getDocs(col)).docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));