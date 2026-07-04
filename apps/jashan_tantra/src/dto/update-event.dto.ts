export class UpdateEventDto {
  eventDate?: string;
  about?: string;
  requirements?: string;
  reviews?: { username?: string; text?: string }[];
  additionalDetails?: string;
  status?: string;
}
