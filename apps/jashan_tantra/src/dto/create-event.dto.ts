export class CreateEventDto {
  requestedBy!: string;
  toOrganizer!: string;
  eventDate?: string;
  about?: string;
  requirements?: string;
  reviews?: { username?: string; text?: string }[];
  additionalDetails?: string;
}
