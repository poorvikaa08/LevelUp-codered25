'use client'

import { Badge } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Profile } from "@/types/profile"

interface ProfileDisplayProps {
  profile: Profile
}

export default function ProfileDisplay({ profile }: ProfileDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Button variant="outline" asChild>
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>
      </div>

      <div className="flex flex-col items-center gap-6 mb-12">
        <div className="relative w-32 h-32">
          <Image
            src="/placeholder.svg"
            alt="Profile"
            width={128}
            height={128}
            className="rounded-full"
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Hello</h2>
          <p className="text-xl text-muted-foreground">{profile.username}</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-[#C4A484] text-white px-4 py-2 rounded-full">
            Newbie #{profile.badge.number}
          </div>
          <Button variant="outline">
            View Previous Seasons
            <Badge className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <p className="text-center text-lg">{profile.bio}</p>

        <div className="flex gap-4">
          {profile.socialLinks.linkedin && (
            <Link href={profile.socialLinks.linkedin} className="hover:opacity-80">
              <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>
          )}
          {profile.socialLinks.twitter && (
            <Link href={profile.socialLinks.twitter} className="hover:opacity-80">
              <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
          )}
          {profile.socialLinks.instagram && (
            <Link href={profile.socialLinks.instagram} className="hover:opacity-80">
              <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
          )}
          {profile.socialLinks.portfolio && (
            <Link href={profile.socialLinks.portfolio} className="hover:opacity-80">
              <Image src="/link.svg" alt="Portfolio" width={24} height={24} />
            </Link>
          )}
        </div>

        <div className="flex gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full border hover:bg-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">My Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Newbie', 'Hustler', 'Maverick', 'Wizard', 'Gladiator'].map((badge) => (
            <div key={badge} className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <Badge className="w-12 h-12" />
              </div>
              <span className="font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

