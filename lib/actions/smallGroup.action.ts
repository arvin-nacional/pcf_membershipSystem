import SmallGroup from "@/database/smallGroup.model";
import { connectToDatabase } from "../mongoose";

export async function getSmallGroups() {
  try {
    connectToDatabase();
    const smallGroups = await SmallGroup.find({});
  } catch (error) {
    console.log(error);
    throw error;
  }
}
