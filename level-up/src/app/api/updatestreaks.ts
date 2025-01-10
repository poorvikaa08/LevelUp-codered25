// pages/api/updateLoginStreak.ts
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/utils/db"; // Replace with your database integration

export default async function handler(req, res) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const user = await db.user.findUnique({ where: { clerkId: userId } });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const lastLoginDate = user.lastLoginDate
    ? user.lastLoginDate.toISOString().split("T")[0]
    : null;

  if (lastLoginDate === today) {
    // Already logged in today, no update needed
    return res.status(200).json({ streak: user.loginStreak });
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split("T")[0];

  const newStreak =
    lastLoginDate === yesterdayString ? user.loginStreak + 1 : 1;

  // Update user in the database
  await db.user.update({
    where: { clerkId: userId },
    data: {
      lastLoginDate: new Date(),
      loginStreak: newStreak,
    },
  });

  res.status(200).json({ streak: newStreak });
}
