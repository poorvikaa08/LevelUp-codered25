// pages/api/profiles/[id].js
export default async function handler(req, res) {
    const { id } = req.query;
  
    // Simulate fetching user data from your database
    const mockDatabase = {
      "user_1": {
        bio: "I'm a passionate developer.",
        country: "India",
        occupation: "Software Engineer",
        tags: ["Coder", "Learner"],
        socialLinks: {
          linkedin: "https://linkedin.com/in/example",
          twitter: "https://twitter.com/example",
          instagram: "https://instagram.com/example",
          portfolio: "https://example.dev"
        },
        badge: { type: "Expert", number: 234 }
      }
    };
  
    const profileData = mockDatabase[id] || null;
  
    if (!profileData) {
      res.status(404).json({ error: "Profile not found" });
    } else {
      res.status(200).json(profileData);
    }
  }
  