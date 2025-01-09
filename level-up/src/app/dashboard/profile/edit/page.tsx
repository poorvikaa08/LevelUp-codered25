import ProfileEditForm from "@/components/profile/profile-editform"
import { updateProfile } from "@/actions/profile"

export default function EditProfilePage() {
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

  return <ProfileEditForm profile={profile} onSubmit={updateProfile} />
}

