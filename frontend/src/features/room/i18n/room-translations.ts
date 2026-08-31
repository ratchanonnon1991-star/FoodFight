import type { Locale } from "@/i18n/config";

export interface RoomTranslations {
  header: {
    back: string;
    notifications: string;
    profile: string;
    allCaughtUp: string;
    home: string;
    signOut: string;
  };
  create: {
    title: string;
    subtitle: string;
    description: string;
    errorTitle: string;
    genericError: string;
    roomNameLabel: string;
    roomNamePlaceholder: string;
    roomNameHelp: string;
    maxMembersLabel: string;
    maxMembersBadge: string;
    maxMembersHelp: string;
    locationLabel: string;
    searchRadiusLabel: string;
    searchRadiusBadge: (radius: number) => string;
    searchRadiusHelp: string;
    dateTimeLabel: string;
    dateLabel: string;
    timeLabel: string;
    dateTimeHelp: string;
    afterCreateTitle: string;
    afterCreateDesc: string;
    submit: string;
    submitting: string;
    decreaseMembers: string;
    increaseMembers: string;
    openDatePicker: string;
    locationHelper: string;
    locationPlaceholder: string;
    locationSearching: string;
    noLocationsFound: string;
    searchDataAttribution: string;
    hideMap: string;
    pickOnMap: string;
    useCurrentLocation: string;
    locating: string;
    sourceCurrent: string;
    sourceMap: string;
    sourceSearch: string;
    sourceSelected: string;
    mapPinInstruction: string;
    mapLoading: string;
    mapUnavailable: string;
    locationBlocked: string;
  };

  join: {
    title: string;
    subtitle: string;
    cardTitle: string;
    cardDesc: string;
    errorTitle: string;
    inputPlaceholder: string;
    helpText: string;
    submit: string;
    submitting: string;
    invalidCode: string;
    genericError: string;
  };
  preview: {
    title: string;
    subtitle: string;
    loading: string;
    unavailableTitle: string;
    foundBadge: string;
    hostedBy: string;
    members: string;
    location: string;
    withinRadius: (radius: number) => string;
    date: string;
    time: string;
    unableToJoinTitle: string;
    loginToJoinTitle: string;
    loginAndReturn: string;
    joinButton: string;
    joining: string;
    cancel: string;
    genericError: string;
    incompleteLink: string;
  };
  lobby: {
    title: string;
    subtitle: string;
    settingsHost: string;
    settingsHostOnly: string;
    roomActions: string;
    actionUnavailable: string;
    roomNotFound: string;
    genericError: string;
    roomCode: string;
    copyCode: string;
    copied: string;
    shareLink: string;
    details: string;
    editRoom: string;
    membersTitle: string;
    readyBadge: string;
    notReadyBadge: string;
    hostBadge: string;
    youBadge: string;
    kickMember: string;
    transferHost: string;
    howItWorksTitle: string;
    readyPromptHost: string;
    readyPromptMember: string;
    startFoodFight: string;
    starting: string;
    iAmReady: string;
    iAmNotReady: string;
    waitingForMembers: string;
    leaveRoom: string;
    closeRoom: string;
    inviteFriends: string;
    inviteSubtitle: string;
    showInvite: string;
    hideInvite: string;
    inviteHidden: string;
    revealInvite: string;
    membersJoined: (current: number, max: number) => string;
    waitingMoreFriends: string;
    shareCodePrompt: string;
    howItWorksStep1: string;
    howItWorksStep2: string;
    howItWorksStep3: string;
    howItWorksStep4: string;
    viewDetails: string;
    memberList: string;
    saveQr: string;
    shareQr: string;
    shareLinkBtn: string;
    closeInvite: string;
  };
}

export const roomTranslations: Record<Locale, RoomTranslations> = {
  en: {
    header: {
      back: "Back",
      notifications: "Notifications",
      profile: "Profile",
      allCaughtUp: "You're all caught up.",
      home: "Home",
      signOut: "Sign out",
    },
    create: {
      title: "Create Room",
      subtitle: "Set up your FoodFight",
      description: "Fill in the details below to create a room for your group.",
      errorTitle: "Could not create room",
      genericError: "Unable to create the room. Please try again.",
      roomNameLabel: "Room Name",
      roomNamePlaceholder: "e.g. Saturday dinner",
      roomNameHelp: "This is how your room will appear to others.",
      maxMembersLabel: "Max Members",
      maxMembersBadge: "2 – 15 people",
      maxMembersHelp: "Set the maximum number of people who can join.",
      locationLabel: "Location",
      searchRadiusLabel: "Search Radius",
      searchRadiusBadge: (radius: number) => `Within ${radius} km`,
      searchRadiusHelp:
        "AI will search for restaurants within the selected distance.",
      dateTimeLabel: "Date & Time",
      dateLabel: "Date",
      timeLabel: "Time",
      dateTimeHelp: "When will you and your friends meet for the meal?",
      afterCreateTitle: "After you create the room",
      afterCreateDesc:
        "We will generate a room code, invite link and QR code for you to share with your friends.",
      submit: "Create Room",
      submitting: "Creating room",
      decreaseMembers: "Decrease maximum members",
      increaseMembers: "Increase maximum members",
      openDatePicker: "Open date picker",
      locationHelper:
        "Search for a place, use your current location, or drop a pin on the map.",
      locationPlaceholder: "Search a place or area",
      locationSearching: "Searching...",
      noLocationsFound: "No locations found.",
      searchDataAttribution:
        "Search data: OpenStreetMap contributors / Photon",
      hideMap: "Hide map",
      pickOnMap: "Pick on map",
      useCurrentLocation: "Use current location",
      locating: "Locating...",
      sourceCurrent: "Current location",
      sourceMap: "Map pin",
      sourceSearch: "Search result",
      sourceSelected: "Selected location",
      mapPinInstruction: "Click or drag the pin to change the location.",
      mapLoading: "Loading map...",
      mapUnavailable:
        "Map is unavailable right now. You can still search or enter a location manually.",
      locationBlocked: "Location access is blocked in this browser context.",
    },

    join: {
      title: "Join Room",
      subtitle: "Enter the room code to continue",
      cardTitle: "Enter Room Code",
      cardDesc: "Enter the 6-character room code shared by your host.",
      errorTitle: "Could not find room",
      inputPlaceholder: "F8K2Q9",
      helpText: "The room code is 6 letters or numbers.",
      submit: "Join Room",
      submitting: "Finding room",
      invalidCode: "Enter a valid room code.",
      genericError: "Unable to find the room. Please try again.",
    },
    preview: {
      title: "Room Preview",
      subtitle: "Review the room details before joining.",
      loading: "Loading room details...",
      unavailableTitle: "Room unavailable",
      foundBadge: "Room Found!",
      hostedBy: "Hosted by",
      members: "Members",
      location: "Location",
      withinRadius: (radius: number) => `Within ${radius} km`,
      date: "Date",
      time: "Time",
      unableToJoinTitle: "Unable to join",
      loginToJoinTitle: "Log in to join this room",
      loginAndReturn: "Log in and return to this room",
      joinButton: "Join This Room",
      joining: "Joining room",
      cancel: "Cancel",
      genericError: "Unable to load this room. Please try again.",
      incompleteLink: "This room preview link is incomplete.",
    },
    lobby: {
      title: "Room Lobby",
      subtitle: "Invite friends and get ready!",
      settingsHost: "Room settings",
      settingsHostOnly: "Room settings (host only)",
      roomActions: "Room actions",
      actionUnavailable: "Action unavailable",
      roomNotFound: "Room not found",
      genericError: "Unable to load the room.",
      roomCode: "Room Code",
      copyCode: "Copy Code",
      copied: "Copied!",
      shareLink: "Share Invite Link",
      details: "Room Details",
      editRoom: "Edit Room",
      membersTitle: "Members",
      readyBadge: "Ready",
      notReadyBadge: "Not Ready",
      hostBadge: "Host",
      youBadge: "You",
      kickMember: "Remove member",
      transferHost: "Transfer host",
      howItWorksTitle: "How FoodFight Works",
      readyPromptHost: "When all members are ready, start the FoodFight!",
      readyPromptMember: "Click ready when you are set to vote.",
      startFoodFight: "Start FoodFight",
      starting: "Starting...",
      iAmReady: "I'm Ready!",
      iAmNotReady: "Cancel Ready",
      waitingForMembers: "Waiting for members to be ready...",
      leaveRoom: "Leave Room",
      closeRoom: "Close Room",
      inviteFriends: "Invite Friends",
      inviteSubtitle: "Invite via QR code, link or room code",
      showInvite: "Show room invite information",
      hideInvite: "Hide room invite information",
      inviteHidden: "Invite hidden for privacy",
      revealInvite: "Click to reveal QR & code",
      membersJoined: (current: number, max: number) => `${current} of ${max} members joined`,
      waitingMoreFriends: "Waiting for more friends to join...",
      shareCodePrompt: "Share the code or invite link above!",
      howItWorksStep1: "Everyone joins",
      howItWorksStep2: "Members get ready",
      howItWorksStep3: "Everyone fills preferences",
      howItWorksStep4: "AI suggests menus",
      viewDetails: "View details",
      memberList: "Member List",
      saveQr: "Save QR",
      shareQr: "Share QR",
      shareLinkBtn: "Share Link",
      closeInvite: "Close invite friends",
    },
  },
  th: {
    header: {
      back: "ย้อนกลับ",
      notifications: "การแจ้งเตือน",
      profile: "โปรไฟล์",
      allCaughtUp: "ไม่มีการแจ้งเตือนใหม่",
      home: "หน้าหลัก",
      signOut: "ออกจากระบบ",
    },
    create: {
      title: "สร้างห้อง",
      subtitle: "ตั้งค่าห้อง FoodFight ของคุณ",
      description: "กรอกข้อมูลด้านล่างเพื่อสร้างห้องสำหรับกลุ่มของคุณ",
      errorTitle: "ไม่สามารถสร้างห้องได้",
      genericError: "ไม่สามารถสร้างห้องได้ กรุณาลองใหม่อีกครั้ง",
      roomNameLabel: "ชื่อห้อง",
      roomNamePlaceholder: "เช่น มื้อค่ำวันเสาร์",
      roomNameHelp: "ชื่อนี้จะแสดงให้เพื่อนๆ ในกลุ่มเห็น",
      maxMembersLabel: "จำนวนสมาชิกสูงสุด",
      maxMembersBadge: "2 – 15 คน",
      maxMembersHelp: "กำหนดจำนวนสมาชิกสูงสุดที่สามารถเข้าร่วมได้",
      locationLabel: "สถานที่",
      searchRadiusLabel: "รัศมีการค้นหา",
      searchRadiusBadge: (radius: number) => `ภายใน ${radius} กม.`,
      searchRadiusHelp: "AI จะค้นหาร้านอาหารภายในระยะที่กำหนด",
      dateTimeLabel: "วันและเวลา",
      dateLabel: "วันที่",
      timeLabel: "เวลา",
      dateTimeHelp: "คุณและเพื่อนๆ วางแผนจะไปทานอาหารกันเมื่อไหร่?",
      afterCreateTitle: "หลังจากสร้างห้องแล้ว",
      afterCreateDesc:
        "ระบบจะสร้างรหัสห้อง ลิงก์เชิญ และ QR Code ให้คุณแชร์กับเพื่อนๆ ได้ทันที",
      submit: "สร้างห้อง",
      submitting: "กำลังสร้างห้อง",
      decreaseMembers: "ลดจำนวนสมาชิกสูงสุด",
      increaseMembers: "เพิ่มจำนวนสมาชิกสูงสุด",
      openDatePicker: "เปิดตัวเลือกวันที่",
      locationHelper:
        "ค้นหาสถานที่ ใช้ตำแหน่งปัจจุบัน หรือปักหมุดบนแผนที่",
      locationPlaceholder: "ค้นหาสถานที่หรือย่าน",
      locationSearching: "กำลังค้นหา...",
      noLocationsFound: "ไม่พบสถานที่",
      searchDataAttribution:
        "ข้อมูลค้นหา: OpenStreetMap contributors / Photon",
      hideMap: "ซ่อนแผนที่",
      pickOnMap: "เลือกบนแผนที่",
      useCurrentLocation: "ใช้ตำแหน่งปัจจุบัน",
      locating: "กำลังระบุตำแหน่ง...",
      sourceCurrent: "ตำแหน่งปัจจุบัน",
      sourceMap: "หมุดบนแผนที่",
      sourceSearch: "ผลการค้นหา",
      sourceSelected: "ตำแหน่งที่เลือก",
      mapPinInstruction: "คลิกหรือลากหมุดเพื่อเปลี่ยนตำแหน่ง",
      mapLoading: "กำลังโหลดแผนที่...",
      mapUnavailable:
        "แผนที่ไม่พร้อมใช้งานในขณะนี้ คุณยังสามารถค้นหาหรือระบุสถานที่ได้เอง",
      locationBlocked: "การเข้าถึงตำแหน่งถูกบล็อกในเบราว์เซอร์นี้",
    },

    join: {
      title: "เข้าร่วมห้อง",
      subtitle: "กรอกรหัสห้องเพื่อดำเนินการต่อ",
      cardTitle: "กรอกรหัสห้อง",
      cardDesc: "กรอกรหัสห้อง 6 หลักที่ได้รับจากหัวหน้าห้อง",
      errorTitle: "ไม่พบห้อง",
      inputPlaceholder: "F8K2Q9",
      helpText: "รหัสห้องประกอบด้วยตัวอักษรหรือตัวเลข 6 ตัว",
      submit: "เข้าร่วมห้อง",
      submitting: "กำลังค้นหาห้อง",
      invalidCode: "กรุณากรอกรหัสห้องให้ถูกต้อง",
      genericError: "ไม่พบห้อง กรุณาลองใหม่อีกครั้ง",
    },
    preview: {
      title: "ดูข้อมูลห้อง",
      subtitle: "ตรวจสอบรายละเอียดห้องก่อนเข้าร่วม",
      loading: "กำลังโหลดข้อมูลห้อง...",
      unavailableTitle: "ไม่สามารถเข้าห้องได้",
      foundBadge: "พบห้องแล้ว!",
      hostedBy: "สร้างโดย",
      members: "สมาชิก",
      location: "สถานที่",
      withinRadius: (radius: number) => `ภายใน ${radius} กม.`,
      date: "วันที่",
      time: "เวลา",
      unableToJoinTitle: "ไม่สามารถเข้าร่วมได้",
      loginToJoinTitle: "เข้าสู่ระบบเพื่อเข้าร่วมห้องนี้",
      loginAndReturn: "เข้าสู่ระบบแล้วกลับมายังห้องนี้",
      joinButton: "เข้าร่วมห้องนี้",
      joining: "กำลังเข้าร่วมห้อง",
      cancel: "ยกเลิก",
      genericError: "ไม่สามารถโหลดข้อมูลห้องนี้ได้ กรุณาลองใหม่อีกครั้ง",
      incompleteLink: "ลิงก์ดูข้อมูลห้องไม่สมบูรณ์",
    },
    lobby: {
      title: "ห้องล็อบบี้",
      subtitle: "ชวนเพื่อนๆ แล้วเตรียมพร้อม!",
      settingsHost: "ตั้งค่าห้อง",
      settingsHostOnly: "ตั้งค่าห้อง (เฉพาะหัวหน้าห้อง)",
      roomActions: "การจัดการห้อง",
      actionUnavailable: "ไม่สามารถดำเนินการได้",
      roomNotFound: "ไม่พบห้อง",
      genericError: "ไม่สามารถโหลดห้องได้",
      roomCode: "รหัสห้อง",
      copyCode: "คัดลอกรหัส",
      copied: "คัดลอกแล้ว!",
      shareLink: "แชร์ลิงก์เชิญ",
      details: "รายละเอียดห้อง",
      editRoom: "แก้ไขห้อง",
      membersTitle: "สมาชิก",
      readyBadge: "พร้อมแล้ว",
      notReadyBadge: "ยังไม่พร้อม",
      hostBadge: "หัวหน้าห้อง",
      youBadge: "คุณ",
      kickMember: "นำสมาชิกออก",
      transferHost: "โอนสิทธิ์หัวหน้าห้อง",
      howItWorksTitle: "วิธีเล่น FoodFight",
      readyPromptHost: "เมื่อสมาชิกทุกคนพร้อมแล้ว กดเริ่ม FoodFight ได้เลย!",
      readyPromptMember: "กดพร้อมเมื่อคุณพร้อมที่จะโหวตเลือกร้าน",
      startFoodFight: "เริ่ม FoodFight",
      starting: "กำลังเริ่ม...",
      iAmReady: "ฉันพร้อมแล้ว!",
      iAmNotReady: "ยกเลิกความพร้อม",
      waitingForMembers: "กำลังรอให้สมาชิกทุกคนพร้อม...",
      leaveRoom: "ออกจากห้อง",
      closeRoom: "ปิดห้อง",
      inviteFriends: "ชวนเพื่อนเข้าห้อง",
      inviteSubtitle: "ชวนด้วยคิวอาร์โค้ด ลิงก์ หรือรหัสห้อง",
      showInvite: "แสดงข้อมูลเชิญเข้าห้อง",
      hideInvite: "ซ่อนข้อมูลเชิญเข้าห้อง",
      inviteHidden: "ซ่อนข้อมูลเพื่อความเป็นส่วนตัว",
      revealInvite: "คลิกเพื่อแสดง QR และรหัสห้อง",
      membersJoined: (current: number, max: number) => `สมาชิกเข้าร่วมแล้ว ${current} จาก ${max} คน`,
      waitingMoreFriends: "กำลังรอให้เพื่อนๆ เข้าร่วม...",
      shareCodePrompt: "แชร์รหัสห้องหรือลิงก์เชิญด้านบนได้เลย!",
      howItWorksStep1: "ทุกคนเข้าร่วมห้อง",
      howItWorksStep2: "สมาชิกกดยืนยันพร้อม",
      howItWorksStep3: "ทุกคนเลือกความชอบอาหาร",
      howItWorksStep4: "AI ช่วยแนะนำเมนู",
      viewDetails: "ดูรายละเอียด",
      memberList: "รายชื่อสมาชิก",
      saveQr: "บันทึก QR",
      shareQr: "แชร์ QR",
      shareLinkBtn: "แชร์ลิงก์",
      closeInvite: "ปิดหน้าต่างชวนเพื่อน",
    },
  },
};
