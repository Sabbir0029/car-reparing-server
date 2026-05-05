import { config } from "../config";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  try {
    const isAdminUser = await User.findOne({ email: config.ADMIN_EMAIL });

    if (isAdminUser) {
      return;
    }

    const hashedPassword = await bcrypt.hash(
      config.ADMIN_PASSWORD,
      config.BCRYPT_SOLD_ROUND,
    );

    const payload = {
      name: "Admin user",
      email: config.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    };

    const adminUser = await User.create(payload);
    console.log("Admin user created:", adminUser);

  } catch (error) {
    console.log(error);
  }
};
