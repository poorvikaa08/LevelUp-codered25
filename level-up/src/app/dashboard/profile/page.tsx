import ProfileDisplay from "@/components/profile/profile-display"

export default function ProfilePage() {
  // Fetch profile data from your database
  const profile = {
    username: "Anshu001",
    name: "Hello",
    bio: "Hi, I'm an engineering student.",
    country: "India",
    occupation: "Developer",
    phoneNumber: "",
    dateOfBirth: "",
    tags: ["Coder", "Programmer", "Explorer"],
    socialLinks: {
      instagram: "",
      twitter: "",
      linkedin: "",
      portfolio: ""
    },
    badge: {
      type: "Newbie",
      number: 120
    }
  }

  return <ProfileDisplay profile={profile} />
}

