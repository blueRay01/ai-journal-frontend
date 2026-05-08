// src/services/journalService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase"; 

export const saveJournalEntry = async (userId, entryData) => {
  try {

    const userEntriesRef = collection(db, "users", userId, "entries");
    
  
    const docRef = await addDoc(userEntriesRef, {
      ...entryData,
      createdAt: serverTimestamp(), 
    });

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error saving journal entry: ", error);
    return { success: false, error: error.message };
  }
};