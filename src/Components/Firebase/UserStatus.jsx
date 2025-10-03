import { doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase"; 

export const setOfflineStatus = async (uid) => {
  if (!uid) return;

  const userRef = doc(db, "users", uid);
  try {
    await updateDoc(userRef, { status: "offline" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut offline :", error);
  }
};
