import { z } from "zod";

const scheduledDate = z
  .string()
  .min(1, "Select a date.")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00`)), {
    message: "Select a valid date.",
  });

const scheduledTime = z
  .string()
  .min(1, "Select a time.")
  .regex(/^\d{2}:\d{2}$/, "Select a valid time.");

export const createRoomSchema = z
  .object({
    name: z.string().trim().min(1, "Room name is required.").max(30, "Room name must be 30 characters or fewer."),
    maxMembers: z.number().int().min(2, "Choose at least 2 members.").max(15, "Choose at most 15 members."),
    locationName: z.string().trim().min(1, "Location is required."),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    searchRadiusKm: z.union([z.literal(1), z.literal(3), z.literal(5), z.literal(10)]),
    date: scheduledDate,
    time: scheduledTime,
  })
  .refine(({ date, time }) => !Number.isNaN(new Date(`${date}T${time}:00`).getTime()), {
    message: "Select a valid date and time.",
    path: ["time"],
  });

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>;

export const roomCodeSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9]{6}$/, "Room code must be 6 letters or numbers.");
