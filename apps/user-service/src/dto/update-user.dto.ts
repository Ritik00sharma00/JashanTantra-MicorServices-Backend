export class UpdateUserDto {
  name?: string | null;
  password?: string | null;
  category?: string | null;
  age?: string | null;
  state?: string | null;
  city?: string | null;
  about?: string | null;
  phoneNumber?: string | null;
  address?: string;
  reviews?: { username?: string; text?: string }[];
  posts?: { photos?: string[]; text?: string }[];
  emailVerified?: boolean;
  emailHidden?: boolean;
  contactHidden?: boolean;
  role?: string;
}