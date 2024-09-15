import mongoose from "mongoose";

const dbName = "OLS_DB";

const dataBaseConnectin = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE}/${dbName}`
    );
    console.log(
      `\n Mongo DB Connected !! DB HOST :${connectionInstance.connection.host}:${dbName}`
    );
  } catch (error) {
    console.log("DB Cnnection Failed", error.message);
    process.exit(1);
  } finally {
    mongoose.connection.close();
    // console.log("DB Cnnection Closed");
  }
};

export { dataBaseConnectin };
