export interface Profile {
  username: string;
  name: string;
  bio: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  dateOfBirth: string;
  tags: string[];
  socialLinks: {
    instagram: string;
    twitter: string;
    linkedin: string;
    portfolio: string;
  };
  badge: {
    type: string;
    number: number;
  };
}

export interface Badge {
  name: string;
  icon: string;
  isEarned: boolean;
}

