export class UpdateUserDto {
  name?: string;
  password?: string;
  category?: string;
  age?: string;
  state?: string;
  city?: string;
  about?: string;
  phoneNumber?: string;
  address?: string;
  reviews?: { username?: string; text?: string }[];
  posts?: { photos?: string[]; text?: string }[];
  emailVerified?: boolean;
  emailHidden?: boolean;
  contactHidden?: boolean;
  role?: string;
}