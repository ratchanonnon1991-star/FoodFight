/**
 * FoodFighter Member Identity Accent System
 *
 * Canonical frontend-only identity accent tokens and deterministic slot resolver.
 * Supports room capacity 2–15 members with recognizable standard base colors.
 *
 * CORE DESIGN PRINCIPLE:
 * Member color is an ACCENT (4px left rail, avatar ring, identity dot).
 * Member color is NOT the card surface.
 * Member cards are ALWAYS pure white (#FFFFFF).
 * All text and financial values are strictly INK (#211D19).
 */

export interface MemberIdentityAccent {
  slot: number; // 1-indexed (1..15)
  id: string;
  nameEn: string;
  nameTh: string;
  family:
    | "Red"
    | "Green"
    | "Orange"
    | "Pink"
    | "Blue"
    | "Gold"
    | "Teal"
    | "Coral"
    | "Olive"
    | "Rose"
    | "Slate"
    | "Lime"
    | "Brown"
    | "Sea"
    | "Burgundy";
  // Base accent hex
  baseHex: string;
  // Visual classes (Tailwind)
  surfaceClass: string;
  borderClass: string;
  railClass: string;
  ringClass: string;
  initialsBgClass: string;
  dotClass: string;
  // Hex color codes for SVG or Canvas rendering
  hex: {
    base: string;
    surface: string;
    border: string;
    rail: string;
    ring: string;
    initialsBg: string;
    initialsText: string;
  };
}

export const MEMBER_IDENTITY_PALETTE_15: readonly MemberIdentityAccent[] = [
  {
    slot: 1,
    id: "red",
    nameEn: "Red",
    nameTh: "แดง",
    family: "Red",
    baseHex: "#D95C4F",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#D95C4F]",
    ringClass: "ring-[#D95C4F]",
    initialsBgClass: "bg-[#FBE8E6] text-[#8C1E14]",
    dotClass: "bg-[#D95C4F]",
    hex: {
      base: "#D95C4F",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#D95C4F",
      ring: "#D95C4F",
      initialsBg: "#FBE8E6",
      initialsText: "#8C1E14",
    },
  },
  {
    slot: 2,
    id: "green",
    nameEn: "Green",
    nameTh: "เขียว",
    family: "Green",
    baseHex: "#5A9A68",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#5A9A68]",
    ringClass: "ring-[#5A9A68]",
    initialsBgClass: "bg-[#E5F2E8] text-[#1D542B]",
    dotClass: "bg-[#5A9A68]",
    hex: {
      base: "#5A9A68",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#5A9A68",
      ring: "#5A9A68",
      initialsBg: "#E5F2E8",
      initialsText: "#1D542B",
    },
  },
  {
    slot: 3,
    id: "orange",
    nameEn: "Orange",
    nameTh: "ส้ม",
    family: "Orange",
    baseHex: "#DF8240",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#DF8240]",
    ringClass: "ring-[#DF8240]",
    initialsBgClass: "bg-[#FCEFE5] text-[#8C430B]",
    dotClass: "bg-[#DF8240]",
    hex: {
      base: "#DF8240",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#DF8240",
      ring: "#DF8240",
      initialsBg: "#FCEFE5",
      initialsText: "#8C430B",
    },
  },
  {
    slot: 4,
    id: "pink",
    nameEn: "Pink",
    nameTh: "ชมพู",
    family: "Pink",
    baseHex: "#C96B8A",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#C96B8A]",
    ringClass: "ring-[#C96B8A]",
    initialsBgClass: "bg-[#F9E8EE] text-[#7A213F]",
    dotClass: "bg-[#C96B8A]",
    hex: {
      base: "#C96B8A",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#C96B8A",
      ring: "#C96B8A",
      initialsBg: "#F9E8EE",
      initialsText: "#7A213F",
    },
  },
  {
    slot: 5,
    id: "blue",
    nameEn: "Blue",
    nameTh: "ฟ้าคราม",
    family: "Blue",
    baseHex: "#627FB2",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#627FB2]",
    ringClass: "ring-[#627FB2]",
    initialsBgClass: "bg-[#E6ECF7] text-[#1E3E6E]",
    dotClass: "bg-[#627FB2]",
    hex: {
      base: "#627FB2",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#627FB2",
      ring: "#627FB2",
      initialsBg: "#E6ECF7",
      initialsText: "#1E3E6E",
    },
  },
  {
    slot: 6,
    id: "gold",
    nameEn: "Gold",
    nameTh: "ทองสว่าง",
    family: "Gold",
    baseHex: "#C99A38",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#C99A38]",
    ringClass: "ring-[#C99A38]",
    initialsBgClass: "bg-[#F9F1DC] text-[#7A5609]",
    dotClass: "bg-[#C99A38]",
    hex: {
      base: "#C99A38",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#C99A38",
      ring: "#C99A38",
      initialsBg: "#F9F1DC",
      initialsText: "#7A5609",
    },
  },
  {
    slot: 7,
    id: "teal",
    nameEn: "Teal",
    nameTh: "เขียวน้ำทะเล",
    family: "Teal",
    baseHex: "#4C9188",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#4C9188]",
    ringClass: "ring-[#4C9188]",
    initialsBgClass: "bg-[#E2F2F0] text-[#13524C]",
    dotClass: "bg-[#4C9188]",
    hex: {
      base: "#4C9188",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#4C9188",
      ring: "#4C9188",
      initialsBg: "#E2F2F0",
      initialsText: "#13524C",
    },
  },
  {
    slot: 8,
    id: "coral",
    nameEn: "Coral",
    nameTh: "คอรัล",
    family: "Coral",
    baseHex: "#D57565",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#D57565]",
    ringClass: "ring-[#D57565]",
    initialsBgClass: "bg-[#FAECE8] text-[#852C1E]",
    dotClass: "bg-[#D57565]",
    hex: {
      base: "#D57565",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#D57565",
      ring: "#D57565",
      initialsBg: "#FAECE8",
      initialsText: "#852C1E",
    },
  },
  {
    slot: 9,
    id: "olive",
    nameEn: "Olive",
    nameTh: "มะกอก",
    family: "Olive",
    baseHex: "#87964F",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#87964F]",
    ringClass: "ring-[#87964F]",
    initialsBgClass: "bg-[#EFF3DF] text-[#4C591D]",
    dotClass: "bg-[#87964F]",
    hex: {
      base: "#87964F",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#87964F",
      ring: "#87964F",
      initialsBg: "#EFF3DF",
      initialsText: "#4C591D",
    },
  },
  {
    slot: 10,
    id: "rose",
    nameEn: "Rose",
    nameTh: "กุหลาบสด",
    family: "Rose",
    baseHex: "#B85E70",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#B85E70]",
    ringClass: "ring-[#B85E70]",
    initialsBgClass: "bg-[#F7E5E9] text-[#701E2E]",
    dotClass: "bg-[#B85E70]",
    hex: {
      base: "#B85E70",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#B85E70",
      ring: "#B85E70",
      initialsBg: "#F7E5E9",
      initialsText: "#701E2E",
    },
  },
  {
    slot: 11,
    id: "slate",
    nameEn: "Slate",
    nameTh: "หินชนวน",
    family: "Slate",
    baseHex: "#6F7D82",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#6F7D82]",
    ringClass: "ring-[#6F7D82]",
    initialsBgClass: "bg-[#E8EDEF] text-[#2F3C40]",
    dotClass: "bg-[#6F7D82]",
    hex: {
      base: "#6F7D82",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#6F7D82",
      ring: "#6F7D82",
      initialsBg: "#E8EDEF",
      initialsText: "#2F3C40",
    },
  },
  {
    slot: 12,
    id: "lime",
    nameEn: "Lime",
    nameTh: "เขียวมะนาว",
    family: "Lime",
    baseHex: "#8EAA55",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#8EAA55]",
    ringClass: "ring-[#8EAA55]",
    initialsBgClass: "bg-[#F0F6E4] text-[#485D1E]",
    dotClass: "bg-[#8EAA55]",
    hex: {
      base: "#8EAA55",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#8EAA55",
      ring: "#8EAA55",
      initialsBg: "#F0F6E4",
      initialsText: "#485D1E",
    },
  },
  {
    slot: 13,
    id: "brown",
    nameEn: "Brown",
    nameTh: "น้ำตาลอบอุ่น",
    family: "Brown",
    baseHex: "#956B4D",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#956B4D]",
    ringClass: "ring-[#956B4D]",
    initialsBgClass: "bg-[#F3EBE4] text-[#5C3920]",
    dotClass: "bg-[#956B4D]",
    hex: {
      base: "#956B4D",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#956B4D",
      ring: "#956B4D",
      initialsBg: "#F3EBE4",
      initialsText: "#5C3920",
    },
  },
  {
    slot: 14,
    id: "sea",
    nameEn: "Sea",
    nameTh: "ฟ้าน้ำทะเลลึก",
    family: "Sea",
    baseHex: "#5B93A0",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#5B93A0]",
    ringClass: "ring-[#5B93A0]",
    initialsBgClass: "bg-[#E4F1F4] text-[#1A4F5C]",
    dotClass: "bg-[#5B93A0]",
    hex: {
      base: "#5B93A0",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#5B93A0",
      ring: "#5B93A0",
      initialsBg: "#E4F1F4",
      initialsText: "#1A4F5C",
    },
  },
  {
    slot: 15,
    id: "burgundy",
    nameEn: "Burgundy",
    nameTh: "เบอร์กันดี",
    family: "Burgundy",
    baseHex: "#9D5C58",
    surfaceClass: "bg-white",
    borderClass: "border-[#E8E2D9]",
    railClass: "bg-[#9D5C58]",
    ringClass: "ring-[#9D5C58]",
    initialsBgClass: "bg-[#F5E7E6] text-[#632420]",
    dotClass: "bg-[#9D5C58]",
    hex: {
      base: "#9D5C58",
      surface: "#FFFFFF",
      border: "#E8E2D9",
      rail: "#9D5C58",
      ring: "#9D5C58",
      initialsBg: "#F5E7E6",
      initialsText: "#632420",
    },
  },
] as const;

export type MemberIdentifier = {
  userId?: string;
  id?: string;
  joinedAt?: string;
  createdAt?: string;
};

/**
 * Normalizes member identity to a stable string key.
 */
function getMemberKey(m: MemberIdentifier): string {
  return m.userId ?? m.id ?? "";
}

/**
 * Resolves a complete, deterministic, collision-free slot mapping for a room roster.
 *
 * Algorithm:
 * 1. Deduplicates members by userId/id.
 * 2. If joinedAt is present on ALL members, sorts by joinedAt ascending (with key tie-break).
 * 3. Otherwise sorts stably by key.localeCompare().
 * 4. Assigns each member to a distinct slot in MEMBER_IDENTITY_PALETTE_15 (slot = index % 15).
 */
export function resolveRoomMemberAccents<T extends MemberIdentifier>(
  members: readonly T[],
): Map<string, MemberIdentityAccent> {
  const mapping = new Map<string, MemberIdentityAccent>();

  // Filter out empty IDs and deduplicate
  const uniqueMembers = new Map<string, T>();
  for (const m of members) {
    const key = getMemberKey(m);
    if (key && !uniqueMembers.has(key)) {
      uniqueMembers.set(key, m);
    }
  }

  const list = Array.from(uniqueMembers.values());

  // Determine if joinedAt is available on all members
  const hasAllJoinedAt =
    list.length > 0 &&
    list.every((m) => Boolean(m.joinedAt || m.createdAt));

  // Sort canonical roster
  list.sort((a, b) => {
    if (hasAllJoinedAt) {
      const timeA = new Date(a.joinedAt ?? a.createdAt ?? 0).getTime();
      const timeB = new Date(b.joinedAt ?? b.createdAt ?? 0).getTime();
      if (timeA !== timeB) {
        return timeA - timeB;
      }
    }
    return getMemberKey(a).localeCompare(getMemberKey(b));
  });

  // Assign distinct slots 0..14
  list.forEach((m, index) => {
    const key = getMemberKey(m);
    const accent = MEMBER_IDENTITY_PALETTE_15[index % MEMBER_IDENTITY_PALETTE_15.length];
    mapping.set(key, accent);
  });

  return mapping;
}

/**
 * Helper to get the identity accent for a single member within a room roster.
 */
export function getMemberAccent<T extends MemberIdentifier>(
  userId: string,
  allMembers: readonly T[],
): MemberIdentityAccent {
  const map = resolveRoomMemberAccents(allMembers);
  return map.get(userId) ?? MEMBER_IDENTITY_PALETTE_15[0];
}
