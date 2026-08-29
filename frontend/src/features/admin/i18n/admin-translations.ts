import type { Locale } from "@/i18n/config";

export interface AdminTranslations {
  shell: {
    title: string;
    badge: string;
    backToApp: string;
    logout: string;
    verifyingAuth: string;
    nav: {
      dashboard: string;
      analytics: string;
      users: string;
      rooms: string;
      bills: string;
    };
  };
  dashboard: {
    title: string;
    subtitle: string;
    refresh: string;
    loading: string;
    errorTitle: string;
    retry: string;
    userMetrics: string;
    roomMetrics: string;
    totalUsers: string;
    totalUsersDesc: string;
    newUsers7d: string;
    newUsers7dDesc: string;
    totalRooms: string;
    totalRoomsDesc: string;
    activeRooms: string;
    activeRoomsDesc: string;
    completedRooms: string;
    completedRoomsDesc: string;
    cancelledRooms: string;
    cancelledRoomsDesc: string;
  };
  analytics: {
    title: string;
    subtitle: string;
    refresh: string;
    loading: string;
    errorTitle: string;
    retry: string;
    ranges: {
      "7d": string;
      "30d": string;
      all: string;
    };
    insightsTitle: string;
    noInsights: string;
    trendsTitle: string;
    charts: {
      users: string;
      rooms: string;
      bills: string;
      payments: string;
      newUsers: string;
      roomsCreated: string;
      reportedBillValue: string;
      completionRate: string;
    };
    metrics: {
      usersTitle: string;
      totalUsers: string;
      newUsers: string;
      growth: string;
      roomsTitle: string;
      roomsCreated: string;
      activeRooms: string;
      cancelledRooms: string;
      cancellationRate: string;
      billsTitle: string;
      billsCreated: string;
      billVolume: string;
      averageBill: string;
      paymentsTitle: string;
      totalPayments: string;
      paidPayments: string;
      unpaidPayments: string;
      completionRate: string;
    };
  };
  users: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allRoles: string;
    userRole: string;
    adminRole: string;
    loading: string;
    table: {
      user: string;
      role: string;
      status: string;
      joined: string;
      actions: string;
      view: string;
      verified: string;
      unverified: string;
      noUsers: string;
    };
    pagination: {
      showing: (start: number, end: number, total: number) => string;
      previous: string;
      next: string;
    };
  };
  userDetail: {
    title: string;
    subtitle: string;
    back: string;
    loading: string;
    notFound: string;
    profileSection: string;
    authProviders: string;
    activitySection: string;
    hostedRooms: string;
    joinedRooms: string;
    verified: string;
    unverified: string;
    role: string;
    email: string;
    joinedAt: string;
  };
  rooms: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allStatuses: string;
    loading: string;
    statuses: {
      LOBBY: string;
      IN_PROGRESS: string;
      COMPLETED: string;
      CANCELLED: string;
    };
    table: {
      room: string;
      code: string;
      host: string;
      members: string;
      status: string;
      created: string;
      actions: string;
      view: string;
      noRooms: string;
    };
    pagination: {
      showing: (start: number, end: number, total: number) => string;
      previous: string;
      next: string;
    };
  };
  roomDetail: {
    title: string;
    subtitle: string;
    back: string;
    loading: string;
    notFound: string;
    overviewSection: string;
    roomCode: string;
    host: string;
    status: string;
    createdAt: string;
    membersSection: string;
    table: {
      member: string;
      role: string;
      readyStatus: string;
      joinedAt: string;
      ready: string;
      notReady: string;
      hostBadge: string;
      memberBadge: string;
    };
  };
  bills: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allStatuses: string;
    loading: string;
    statuses: {
      DRAFT: string;
      SPLITTING: string;
      COMPLETED: string;
      CLOSED: string;
      CANCELLED: string;
    };
    table: {
      bill: string;
      creator: string;
      total: string;
      completion: string;
      status: string;
      created: string;
      actions: string;
      view: string;
      noBills: string;
    };
    pagination: {
      showing: (start: number, end: number, total: number) => string;
      previous: string;
      next: string;
    };
  };
  billDetail: {
    title: string;
    subtitle: string;
    back: string;
    loading: string;
    notFound: string;
    overviewSection: string;
    billId: string;
    creator: string;
    status: string;
    totalAmount: string;
    completionRate: string;
    createdAt: string;
    closedAt: string;
    paymentsSection: string;
    table: {
      payer: string;
      amount: string;
      status: string;
      paidAt: string;
      paid: string;
      unpaid: string;
      noPayments: string;
    };
  };
}

export const adminTranslations: Record<Locale, AdminTranslations> = {
  en: {
    shell: {
      title: "FoodFighter",
      badge: "Admin",
      backToApp: "Back to FoodFighter",
      logout: "Logout",
      verifyingAuth: "Verifying admin authorization...",
      nav: {
        dashboard: "Dashboard",
        analytics: "Analytics",
        users: "Users",
        rooms: "Rooms",
        bills: "Bills",
      },
    },
    dashboard: {
      title: "System Overview",
      subtitle: "Platform usage and operational metrics.",
      refresh: "Refresh",
      loading: "Loading dashboard metrics...",
      errorTitle: "Dashboard Error",
      retry: "Retry",
      userMetrics: "User Metrics",
      roomMetrics: "Room Metrics",
      totalUsers: "Total Users",
      totalUsersDesc: "Registered accounts across the platform",
      newUsers7d: "New Users (Last 7 Days)",
      newUsers7dDesc: "Users registered within the past 7 days",
      totalRooms: "Total Rooms",
      totalRoomsDesc: "Cumulative created rooms",
      activeRooms: "Active Rooms",
      activeRoomsDesc: "Rooms currently in lobby or in progress",
      completedRooms: "Completed Rooms",
      completedRoomsDesc: "Successfully completed dining sessions",
      cancelledRooms: "Cancelled Rooms",
      cancelledRoomsDesc: "Rooms cancelled or abandoned",
    },
    analytics: {
      title: "Platform Analytics",
      subtitle: "Comprehensive trends, metrics, and automated insights.",
      refresh: "Refresh",
      loading: "Loading platform analytics...",
      errorTitle: "Analytics Error",
      retry: "Retry",
      ranges: {
        "7d": "Last 7 Days",
        "30d": "Last 30 Days",
        all: "All Time",
      },
      insightsTitle: "Automated Insights",
      noInsights: "No critical insights detected for this timeframe.",
      trendsTitle: "Growth & Activity Trends",
      charts: {
        users: "New User Registration Trend",
        rooms: "Room Creation Trend",
        bills: "Bill Volume Trend",
        payments: "Payment Completion Trend",
        newUsers: "New Users",
        roomsCreated: "Rooms Created",
        reportedBillValue: "Reported Value (฿)",
        completionRate: "Completion Rate (%)",
      },
      metrics: {
        usersTitle: "User Acquisition",
        totalUsers: "Total Platform Users",
        newUsers: "New Users in Period",
        growth: "Period-over-Period Growth",
        roomsTitle: "Room & Session Activity",
        roomsCreated: "Rooms Created",
        activeRooms: "Currently Active Rooms",
        cancelledRooms: "Cancelled Rooms",
        cancellationRate: "Room Cancellation Rate",
        billsTitle: "Billing Operations",
        billsCreated: "Bills Created",
        billVolume: "Total Volume",
        averageBill: "Average Bill Value",
        paymentsTitle: "Payment Settlements",
        totalPayments: "Total Payment Records",
        paidPayments: "Settled Payments",
        unpaidPayments: "Pending Payments",
        completionRate: "Payment Settlement Rate",
      },
    },
    users: {
      title: "Users Management",
      subtitle: "Directory of registered accounts and permission levels.",
      searchPlaceholder: "Search by display name or email...",
      allRoles: "All Roles",
      userRole: "User",
      adminRole: "Admin",
      loading: "Loading user directory...",
      table: {
        user: "User",
        role: "Role",
        status: "Email Status",
        joined: "Joined",
        actions: "Actions",
        view: "View Details",
        verified: "Verified",
        unverified: "Unverified",
        noUsers: "No users found matching query.",
      },
      pagination: {
        showing: (start, end, total) => `Showing ${start} to ${end} of ${total} users`,
        previous: "Previous",
        next: "Next",
      },
    },
    userDetail: {
      title: "User Profile",
      subtitle: "Detailed account information and activity summary.",
      back: "Back to Users",
      loading: "Loading user profile...",
      notFound: "User account not found.",
      profileSection: "Account Details",
      authProviders: "Connected Authentication Providers",
      activitySection: "Platform Activity",
      hostedRooms: "Rooms Hosted",
      joinedRooms: "Rooms Joined",
      verified: "Verified",
      unverified: "Unverified",
      role: "System Role",
      email: "Email Address",
      joinedAt: "Account Created",
    },
    rooms: {
      title: "Rooms Directory",
      subtitle: "Manage and monitor FoodFight dining sessions.",
      searchPlaceholder: "Search by room name or code...",
      allStatuses: "All Statuses",
      loading: "Loading rooms directory...",
      statuses: {
        LOBBY: "Lobby",
        IN_PROGRESS: "In Progress",
        COMPLETED: "Completed",
        CANCELLED: "Cancelled",
      },
      table: {
        room: "Room Name",
        code: "Code",
        host: "Host",
        members: "Members",
        status: "Status",
        created: "Created",
        actions: "Actions",
        view: "View Details",
        noRooms: "No rooms found matching query.",
      },
      pagination: {
        showing: (start, end, total) => `Showing ${start} to ${end} of ${total} rooms`,
        previous: "Previous",
        next: "Next",
      },
    },
    roomDetail: {
      title: "Room Details",
      subtitle: "Full configuration and participant list for session.",
      back: "Back to Rooms",
      loading: "Loading room details...",
      notFound: "Room not found.",
      overviewSection: "Room Overview",
      roomCode: "Room Code",
      host: "Room Host",
      status: "Session Status",
      createdAt: "Creation Timestamp",
      membersSection: "Session Participants",
      table: {
        member: "Member",
        role: "Room Role",
        readyStatus: "Readiness",
        joinedAt: "Joined At",
        ready: "Ready",
        notReady: "Not Ready",
        hostBadge: "Host",
        memberBadge: "Member",
      },
    },
    bills: {
      title: "Bills Management",
      subtitle: "Track dining receipts, split status, and payments.",
      searchPlaceholder: "Search by bill ID...",
      allStatuses: "All Statuses",
      loading: "Loading bills directory...",
      statuses: {
        DRAFT: "Draft",
        SPLITTING: "Splitting",
        COMPLETED: "Completed",
        CLOSED: "Closed",
        CANCELLED: "Cancelled",
      },
      table: {
        bill: "Bill ID",
        creator: "Created By",
        total: "Total Amount",
        completion: "Payment Rate",
        status: "Status",
        created: "Created",
        actions: "Actions",
        view: "View Details",
        noBills: "No bills found matching query.",
      },
      pagination: {
        showing: (start, end, total) => `Showing ${start} to ${end} of ${total} bills`,
        previous: "Previous",
        next: "Next",
      },
    },
    billDetail: {
      title: "Bill Details",
      subtitle: "Itemization breakdown, receipt data, and payment ledger.",
      back: "Back to Bills",
      loading: "Loading bill details...",
      notFound: "Bill not found.",
      overviewSection: "Bill Summary",
      billId: "Bill Reference",
      creator: "Bill Creator",
      status: "Settlement Status",
      totalAmount: "Total Value",
      completionRate: "Settlement Progress",
      createdAt: "Created",
      closedAt: "Closed",
      paymentsSection: "Participant Payment Ledger",
      table: {
        payer: "Participant",
        amount: "Assigned Amount",
        status: "Payment Status",
        paidAt: "Paid Timestamp",
        paid: "Paid",
        unpaid: "Unpaid",
        noPayments: "No payment records found.",
      },
    },
  },
  th: {
    shell: {
      title: "FoodFighter",
      badge: "ผู้ดูแลระบบ",
      backToApp: "กลับไป FoodFighter",
      logout: "ออกจากระบบ",
      verifyingAuth: "กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...",
      nav: {
        dashboard: "แดชบอร์ด",
        analytics: "สถิติและการวิเคราะห์",
        users: "ผู้ใช้งาน",
        rooms: "ห้องอาหาร",
        bills: "บิลและการชำระเงิน",
      },
    },
    dashboard: {
      title: "ภาพรวมระบบ",
      subtitle: "สถิติการใช้งานและตัวชี้วัดการดำเนินงานของแพลตฟอร์ม",
      refresh: "รีเฟรช",
      loading: "กำลังโหลดข้อมูลแดชบอร์ด...",
      errorTitle: "ข้อผิดพลาดของแดชบอร์ด",
      retry: "ลองใหม่อีกครั้ง",
      userMetrics: "ตัวชี้วัดผู้ใช้งาน",
      roomMetrics: "ตัวชี้วัดห้องอาหาร",
      totalUsers: "ผู้ใช้งานทั้งหมด",
      totalUsersDesc: "บัญชีที่ลงทะเบียนทั้งหมดบนแพลตฟอร์ม",
      newUsers7d: "ผู้ใช้ใหม่ (7 วันล่าสุด)",
      newUsers7dDesc: "ผู้ใช้งานที่ลงทะเบียนภายใน 7 วันที่ผ่านมา",
      totalRooms: "ห้องทั้งหมด",
      totalRoomsDesc: "จำนวนห้องที่สร้างขึ้นทั้งหมดสะสม",
      activeRooms: "ห้องที่กำลังใช้งาน",
      activeRoomsDesc: "ห้องที่อยู่ในล็อบบี้หรือกำลังดำเนินการ",
      completedRooms: "ห้องที่เสร็จสิ้น",
      completedRoomsDesc: "มื้ออาหารที่เสร็จสมบูรณ์เรียบร้อยแล้ว",
      cancelledRooms: "ห้องที่ยกเลิก",
      cancelledRoomsDesc: "ห้องที่ถูกยกเลิกหรือปิดก่อนเสร็จสิ้น",
    },
    analytics: {
      title: "สถิติและการวิเคราะห์แพลตฟอร์ม",
      subtitle: "แนวโน้ม ตัวชี้วัด และข้อคิดเห็นเชิงลึกอัตโนมัติ",
      refresh: "รีเฟรช",
      loading: "กำลังโหลดข้อมูลการวิเคราะห์...",
      errorTitle: "ข้อผิดพลาดของการวิเคราะห์",
      retry: "ลองใหม่อีกครั้ง",
      ranges: {
        "7d": "7 วันล่าสุด",
        "30d": "30 วันล่าสุด",
        all: "ทั้งหมด",
      },
      insightsTitle: "ข้อมูลเชิงลึกอัตโนมัติ",
      noInsights: "ไม่พบประเด็นสำคัญที่ต้องแจ้งเตือนในช่วงเวลานี้",
      trendsTitle: "แนวโน้มการเติบโตและกิจกรรม",
      charts: {
        users: "แนวโน้มการลงทะเบียนผู้ใช้ใหม่",
        rooms: "แนวโน้มการสร้างห้องอาหาร",
        bills: "แนวโน้มยอดรวมบิล",
        payments: "แนวโน้มอัตราการชำระเงินสำเร็จ",
        newUsers: "ผู้ใช้ใหม่",
        roomsCreated: "ห้องที่สร้าง",
        reportedBillValue: "ยอดเงินรวม (บาท)",
        completionRate: "อัตราความสำเร็จ (%)",
      },
      metrics: {
        usersTitle: "การเติบโตของผู้ใช้",
        totalUsers: "ผู้ใช้ทั้งหมดในระบบ",
        newUsers: "ผู้ใช้ใหม่ในช่วงเวลา",
        growth: "อัตราเติบโตเทียบรอบก่อนหน้า",
        roomsTitle: "กิจกรรมห้องอาหาร",
        roomsCreated: "ห้องที่สร้างขึ้น",
        activeRooms: "ห้องที่กำลังใช้งานอยู่",
        cancelledRooms: "ห้องที่ถูกยกเลิก",
        cancellationRate: "อัตราการยกเลิกห้อง",
        billsTitle: "การจัดการบิล",
        billsCreated: "บิลที่สร้างขึ้น",
        billVolume: "ยอดรวมธุรกรรม",
        averageBill: "ยอดเฉลี่ยต่อบิล",
        paymentsTitle: "การชำระเงิน",
        totalPayments: "รายการชำระเงินทั้งหมด",
        paidPayments: "ชำระเงินเรียบร้อย",
        unpaidPayments: "รอการชำระเงิน",
        completionRate: "อัตราการชำระเงินสำเร็จ",
      },
    },
    users: {
      title: "จัดการผู้ใช้งาน",
      subtitle: "รายชื่อบัญชีผู้ใช้และระดับสิทธิ์การเข้าถึงระบบ",
      searchPlaceholder: "ค้นหาด้วยชื่อหรืออีเมล...",
      allRoles: "ทุกระดับสิทธิ์",
      userRole: "ผู้ใช้ทั่วไป",
      adminRole: "ผู้ดูแลระบบ",
      loading: "กำลังโหลดรายชื่อผู้ใช้...",
      table: {
        user: "ผู้ใช้งาน",
        role: "สิทธิ์",
        status: "สถานะอีเมล",
        joined: "วันที่เข้าร่วม",
        actions: "การจัดการ",
        view: "ดูรายละเอียด",
        verified: "ยืนยันแล้ว",
        unverified: "ยังไม่ยืนยัน",
        noUsers: "ไม่พบผู้ใช้งานตามเงื่อนไขที่ค้นหา",
      },
      pagination: {
        showing: (start, end, total) => `แสดง ${start} ถึง ${end} จากทั้งหมด ${total} คน`,
        previous: "ก่อนหน้า",
        next: "ถัดไป",
      },
    },
    userDetail: {
      title: "ข้อมูลผู้ใช้งาน",
      subtitle: "รายละเอียดบัญชีและประวัติกิจกรรมบนแพลตฟอร์ม",
      back: "กลับสู่รายชื่อผู้ใช้",
      loading: "กำลังโหลดข้อมูลผู้ใช้...",
      notFound: "ไม่พบบัญชีผู้ใช้งานนี้ในระบบ",
      profileSection: "ข้อมูลบัญชี",
      authProviders: "ผู้ให้บริการเข้าสู่ระบบที่เชื่อมต่อ",
      activitySection: "กิจกรรมบนแพลตฟอร์ม",
      hostedRooms: "ห้องที่เป็นหัวหน้าห้อง",
      joinedRooms: "ห้องที่เข้าร่วม",
      verified: "ยืนยันแล้ว",
      unverified: "ยังไม่ยืนยัน",
      role: "ระดับสิทธิ์",
      email: "อีเมล",
      joinedAt: "วันที่สร้างบัญชี",
    },
    rooms: {
      title: "รายการห้องอาหาร",
      subtitle: "ตรวจสอบและจัดการห้องกิจกรรม FoodFight ทั้งหมด",
      searchPlaceholder: "ค้นหาด้วยชื่อห้องหรือรหัสห้อง...",
      allStatuses: "ทุกสถานะ",
      loading: "กำลังโหลดรายการห้อง...",
      statuses: {
        LOBBY: "รอล็อบบี้",
        IN_PROGRESS: "กำลังดำเนินการ",
        COMPLETED: "เสร็จสิ้น",
        CANCELLED: "ยกเลิกแล้ว",
      },
      table: {
        room: "ชื่อห้อง",
        code: "รหัสห้อง",
        host: "หัวหน้าห้อง",
        members: "สมาชิก",
        status: "สถานะ",
        created: "วันที่สร้าง",
        actions: "การจัดการ",
        view: "ดูรายละเอียด",
        noRooms: "ไม่พบห้องอาหารตามเงื่อนไขที่ค้นหา",
      },
      pagination: {
        showing: (start, end, total) => `แสดง ${start} ถึง ${end} จากทั้งหมด ${total} ห้อง`,
        previous: "ก่อนหน้า",
        next: "ถัดไป",
      },
    },
    roomDetail: {
      title: "รายละเอียดห้องอาหาร",
      subtitle: "ข้อมูลการตั้งค่าและรายชื่อสมาชิกในห้องกิจกรรม",
      back: "กลับสู่รายการห้อง",
      loading: "กำลังโหลดรายละเอียดห้อง...",
      notFound: "ไม่พบห้องอาหารนี้",
      overviewSection: "ข้อมูลภาพรวม",
      roomCode: "รหัสห้อง",
      host: "หัวหน้าห้อง",
      status: "สถานะห้อง",
      createdAt: "เวลาที่สร้าง",
      membersSection: "รายชื่อสมาชิกในห้อง",
      table: {
        member: "สมาชิก",
        role: "บทบาท",
        readyStatus: "ความพร้อม",
        joinedAt: "เวลาที่เข้าร่วม",
        ready: "พร้อมแล้ว",
        notReady: "ยังไม่พร้อม",
        hostBadge: "หัวหน้าห้อง",
        memberBadge: "สมาชิก",
      },
    },
    bills: {
      title: "จัดการบิลและการชำระเงิน",
      subtitle: "ติดตามรายการบิล การหารค่าอาหาร และสถานะการชำระเงิน",
      searchPlaceholder: "ค้นหาด้วยรหัสบิล...",
      allStatuses: "ทุกสถานะ",
      loading: "กำลังโหลดรายการบิล...",
      statuses: {
        DRAFT: "ฉบับร่าง",
        SPLITTING: "กำลังหารบิล",
        COMPLETED: "เสร็จสิ้น",
        CLOSED: "ปิดบิลแล้ว",
        CANCELLED: "ยกเลิกแล้ว",
      },
      table: {
        bill: "รหัสบิล",
        creator: "ผู้สร้างบิล",
        total: "ยอดเงินรวม",
        completion: "อัตราการจ่าย",
        status: "สถานะ",
        created: "วันที่สร้าง",
        actions: "การจัดการ",
        view: "ดูรายละเอียด",
        noBills: "ไม่พบรายการบิลตามเงื่อนไขที่ค้นหา",
      },
      pagination: {
        showing: (start, end, total) => `แสดง ${start} ถึง ${end} จากทั้งหมด ${total} บิล`,
        previous: "ก่อนหน้า",
        next: "ถัดไป",
      },
    },
    billDetail: {
      title: "รายละเอียดบิล",
      subtitle: "รายการสรุปยอด ใบเสร็จ และบันทึกการชำระเงินรายบุคคล",
      back: "กลับสู่รายการบิล",
      loading: "กำลังโหลดรายละเอียดบิล...",
      notFound: "ไม่พบข้อมูลบิลนี้",
      overviewSection: "สรุปข้อมูลบิล",
      billId: "รหัสอ้างอิงบิล",
      creator: "ผู้เปิดบิล",
      status: "สถานะการชำระเงิน",
      totalAmount: "ยอดเงินรวม",
      completionRate: "ความคืบหน้าการชำระเงิน",
      createdAt: "วันที่สร้าง",
      closedAt: "วันที่ปิดบิล",
      paymentsSection: "รายการชำระเงินของสมาชิก",
      table: {
        payer: "ผู้ชำระ",
        amount: "ยอดที่ต้องชำระ",
        status: "สถานะ",
        paidAt: "เวลาที่ชำระ",
        paid: "ชำระแล้ว",
        unpaid: "ยังไม่ชำระ",
        noPayments: "ไม่พบรายการชำระเงิน",
      },
    },
  },
};
