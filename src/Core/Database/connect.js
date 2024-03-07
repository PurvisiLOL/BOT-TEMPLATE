import { connect } from "mongoose";
import "colors";

async function connectToDB(value) {
  try {
    await connect(process.env.db);
    value = true;
  } catch (e) {
    console.error(e);
    value = false;
  }
  return value; // Add this line to properly return the value
}

export default connectToDB;
