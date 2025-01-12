import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sudhanshu:sudhanshu27@cluster0.ug1w5.mongodb.net/food-delivery"
    )
    .then(() => {
      console.log("DB Connect");
    });
};
