import type { Locale } from "@/i18n/config";

export interface AuthTranslations {
  login: {
    back: string;
    brand: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    submit: string;
    or: string;
    noAccount: string;
    signUp: string;
    genericError: string;
    noticeTitle: string;
  };
  register: {
    back: string;
    brand: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    passwordDescription: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    termsAgree: string;
    termsOfService: string;
    and: string;
    privacyPolicy: string;
    submit: string;
    or: string;
    hasAccount: string;
    logIn: string;
    failedTitle: string;
    genericError: string;
    noVerificationInfo: string;
  };
  verifyEmail: {
    back: string;
    brand: string;
    title: string;
    subtitlePrefix: string;
    changeEmail: string;
    codeExpired: string;
    codeExpiresIn: (time: string) => string;
    submit: string;
    or: string;
    changeEmailButton: string;
    noticeTitle: string;
    successTitle: string;
    resendSuccess: string;
    resendGenericError: string;
    sessionNotFound: string;
    expiredNotice: string;
    unexpectedError: string;
    didntReceive: string;
    resendCode: string;
    resendCountdown: (time: string) => string;
    securityTitle: string;
    securityMessage: string;
  };
  verificationSuccess: {
    brand: string;
    title: string;
    bodyWithEmail: (email: string) => string;
    bodyWithoutEmail: string;
    accountReadyTitle: string;
    accountReadyDesc: string;
    continueToLogin: string;
  };
  forgotPassword: {
    back: string;
    brand: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    rememberPassword: string;
    logIn: string;
    noticeTitle: string;
    unexpectedError: string;
  };
  resetPassword: {
    title: string;
    subtitle: string;
    newPasswordLabel: string;
    newPasswordPlaceholder: string;
    confirmPasswordLabel: string;
    confirmPasswordPlaceholder: string;
    submit: string;
    failedTitle: string;
    missingSession: string;
    unexpectedError: string;
  };
  changeEmail: {
    back: string;
    brand: string;
    title: string;
    subtitle: string;
    currentRegistered: string;
    newEmailLabel: string;
    newEmailPlaceholder: string;
    advisoryNotice: string;
    submit: string;
    cancel: string;
    errorTitle: string;
    sessionNotFound: string;
    unexpectedError: string;
  };
  social: {
    google: string;
    line: string;
    googleError: string;
    lineUnconfigured: string;
  };
}

export const authTranslations: Record<Locale, AuthTranslations> = {
  en: {
    login: {
      back: "Back",
      brand: "FoodFighter",
      title: "Welcome back",
      subtitle: "Enter your credentials to access your account.",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      forgotPassword: "Forgot password?",
      submit: "LOG IN",
      or: "OR",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      genericError: "An unexpected error occurred during login. Please try again.",
      noticeTitle: "Login Notice",
    },
    register: {
      back: "Back",
      brand: "FoodFighter",
      title: "Create your account",
      subtitle: "Join FoodFighter to decide group meals easily with AI.",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Somchai Dee",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",
      passwordDescription:
        "At least 8 characters with lowercase, uppercase, a number, and a special character.",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "••••••••",
      termsAgree: "I agree to the",
      termsOfService: "Terms of Service",
      and: "and",
      privacyPolicy: "Privacy Policy",
      submit: "CREATE ACCOUNT",
      or: "OR",
      hasAccount: "Already have an account?",
      logIn: "Log in",
      failedTitle: "Registration Failed",
      genericError:
        "An unexpected error occurred during registration. Please try again.",
      noVerificationInfo:
        "Registration succeeded, but verification information was not returned.",
    },
    verifyEmail: {
      back: "Back",
      brand: "FoodFighter",
      title: "Verify your email",
      subtitlePrefix: "We've sent a 6-digit code to ",
      changeEmail: "Change email",
      codeExpired: "Code has expired",
      codeExpiresIn: (time: string) => `Code expires in ${time}`,
      submit: "VERIFY OTP",
      or: "OR",
      changeEmailButton: "CHANGE EMAIL",
      noticeTitle: "Verification Notice",
      successTitle: "Success",
      resendSuccess: "A new verification code has been sent to your email.",
      resendGenericError: "Failed to resend verification code. Please try again.",
      sessionNotFound: "Verification session not found. Please register again.",
      expiredNotice:
        "Your code has expired. Please request a new verification code below.",
      unexpectedError:
        "An unexpected error occurred during verification. Please try again.",
      didntReceive: "Didn't receive the code?",
      resendCode: "Resend code",
      resendCountdown: (time: string) => `Resend code in ${time}`,
      securityTitle: "For your security",
      securityMessage:
        "Never share your 6-digit verification code with anyone. FoodFighter will never ask for your code.",
    },
    verificationSuccess: {
      brand: "FoodFighter",
      title: "Email verified!",
      bodyWithEmail: (email: string) =>
        `Your email ${email} has been successfully verified.`,
      bodyWithoutEmail:
        "Your email has been successfully verified. Your account is ready.",
      accountReadyTitle: "Account ready",
      accountReadyDesc:
        "You can now log in with your credentials and start using FoodFighter to decide group meals.",
      continueToLogin: "Continue to Login",
    },
    forgotPassword: {
      back: "Back",
      brand: "FoodFighter",
      title: "Forgot password?",
      subtitle:
        "Enter your registered email address and we'll help you reset your password.",
      emailLabel: "Email Address",
      emailPlaceholder: "you@example.com",
      submit: "SEND RESET LINK",
      rememberPassword: "Remember your password?",
      logIn: "Log in",
      noticeTitle: "Reset Notice",
      unexpectedError: "An unexpected error occurred. Please try again.",
    },
    resetPassword: {
      title: "Reset password",
      subtitle: "Enter your new password.",
      newPasswordLabel: "New Password",
      newPasswordPlaceholder: "••••••••",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "••••••••",
      submit: "RESET PASSWORD",
      failedTitle: "Reset Password Failed",
      missingSession:
        "Password reset session is missing or invalid. Please request a new reset code.",
      unexpectedError: "Unable to reset password. Please try again.",
    },
    changeEmail: {
      back: "Back",
      brand: "FoodFighter",
      title: "Change email",
      subtitle:
        "Enter your new email address. We'll send a fresh 6-digit verification code to confirm.",
      currentRegistered: "Current registered email: ",
      newEmailLabel: "New email address",
      newEmailPlaceholder: "new.email@example.com",
      advisoryNotice:
        "Changing your email address will immediately invalidate the previous verification code.",
      submit: "SEND CODE",
      cancel: "Cancel",
      errorTitle: "Error",
      sessionNotFound:
        "Verification session not found. Please register again.",
      unexpectedError:
        "An unexpected error occurred while changing email. Please try again.",
    },
    social: {
      google: "Continue with Google",
      line: "Continue with LINE",
      googleError: "Google authentication failed. Please try again.",
      lineUnconfigured: "LINE authentication is not configured.",
    },
  },
  th: {
    login: {
      back: "ย้อนกลับ",
      brand: "FoodFighter",
      title: "ยินดีต้อนรับกลับมา",
      subtitle: "กรอกข้อมูลของคุณเพื่อเข้าสู่ระบบ",
      emailLabel: "อีเมล",
      emailPlaceholder: "you@example.com",
      passwordLabel: "รหัสผ่าน",
      passwordPlaceholder: "••••••••",
      forgotPassword: "ลืมรหัสผ่าน?",
      submit: "เข้าสู่ระบบ",
      or: "หรือ",
      noAccount: "ยังไม่มีบัญชีใช่ไหม?",
      signUp: "สมัครสมาชิก",
      genericError: "เกิดข้อผิดพลาดที่ไม่คาดคิดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง",
      noticeTitle: "แจ้งเตือนการเข้าสู่ระบบ",
    },
    register: {
      back: "ย้อนกลับ",
      brand: "FoodFighter",
      title: "สร้างบัญชีของคุณ",
      subtitle: "เข้าร่วม FoodFighter เพื่อช่วยกันตัดสินใจเลือกมื้ออาหารได้ง่ายขึ้นด้วย AI",
      nameLabel: "ชื่อ-นามสกุล",
      namePlaceholder: "เช่น สมชาย ดีใจ",
      emailLabel: "อีเมล",
      emailPlaceholder: "you@example.com",
      passwordLabel: "รหัสผ่าน",
      passwordPlaceholder: "••••••••",
      passwordDescription:
        "ความยาวอย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ",
      confirmPasswordLabel: "ยืนยันรหัสผ่าน",
      confirmPasswordPlaceholder: "••••••••",
      termsAgree: "ฉันยอมรับ",
      termsOfService: "ข้อกำหนดการใช้งาน",
      and: "และ",
      privacyPolicy: "นโยบายความเป็นส่วนตัว",
      submit: "สร้างบัญชี",
      or: "หรือ",
      hasAccount: "มีบัญชีอยู่แล้วใช่ไหม?",
      logIn: "เข้าสู่ระบบ",
      failedTitle: "การสมัครสมาชิกล้มเหลว",
      genericError:
        "เกิดข้อผิดพลาดที่ไม่คาดคิดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง",
      noVerificationInfo:
        "การสมัครสมาชิกสำเร็จ แต่ไม่ได้รับข้อมูลการยืนยัน",
    },
    verifyEmail: {
      back: "ย้อนกลับ",
      brand: "FoodFighter",
      title: "ยืนยันอีเมลของคุณ",
      subtitlePrefix: "เราได้ส่งรหัส 6 หลักไปยัง ",
      changeEmail: "เปลี่ยนอีเมล",
      codeExpired: "รหัสหมดอายุแล้ว",
      codeExpiresIn: (time: string) => `รหัสจะหมดอายุใน ${time}`,
      submit: "ยืนยันรหัส OTP",
      or: "หรือ",
      changeEmailButton: "เปลี่ยนอีเมล",
      noticeTitle: "แจ้งเตือนการยืนยัน",
      successTitle: "สำเร็จ",
      resendSuccess: "ส่งรหัสยืนยันชุดใหม่ไปยังอีเมลของคุณเรียบร้อยแล้ว",
      resendGenericError: "ไม่สามารถส่งรหัสยืนยันใหม่ได้ กรุณาลองใหม่อีกครั้ง",
      sessionNotFound: "ไม่พบเซสชันการยืนยัน กรุณาสมัครสมาชิกใหม่อีกครั้ง",
      expiredNotice:
        "รหัสของคุณหมดอายุแล้ว กรุณากดขอรหัสยืนยันใหม่ด้านล่าง",
      unexpectedError:
        "เกิดข้อผิดพลาดที่ไม่คาดคิดในการยืนยัน กรุณาลองใหม่อีกครั้ง",
      didntReceive: "ไม่ได้รับรหัสใช่ไหม?",
      resendCode: "ส่งรหัสอีกครั้ง",
      resendCountdown: (time: string) => `ส่งรหัสอีกครั้งใน ${time}`,
      securityTitle: "เพื่อความปลอดภัยของคุณ",
      securityMessage:
        "ห้ามเปิดเผยรหัสยืนยัน 6 หลักนี้แก่ผู้อื่น FoodFighter จะไม่ขอรหัสของคุณอย่างเด็ดขาด",
    },
    verificationSuccess: {
      brand: "FoodFighter",
      title: "ยืนยันอีเมลสำเร็จ!",
      bodyWithEmail: (email: string) =>
        `อีเมล ${email} ของคุณได้รับการยืนยันเรียบร้อยแล้ว`,
      bodyWithoutEmail:
        "อีเมลของคุณได้รับการยืนยันเรียบร้อยแล้ว บัญชีของคุณพร้อมใช้งาน",
      accountReadyTitle: "บัญชีพร้อมใช้งาน",
      accountReadyDesc:
        "คุณสามารถเข้าสู่ระบบด้วยข้อมูลของคุณ และเริ่มใช้งาน FoodFighter เพื่อเลือกมื้ออาหารร่วมกับเพื่อนๆ ได้ทันที",
      continueToLogin: "ดำเนินการเข้าสู่ระบบ",
    },
    forgotPassword: {
      back: "ย้อนกลับ",
      brand: "FoodFighter",
      title: "ลืมรหัสผ่าน?",
      subtitle:
        "กรอกอีเมลที่ลงทะเบียนไว้ แล้วเราจะช่วยคุณรีเซ็ตรหัสผ่าน",
      emailLabel: "อีเมล",
      emailPlaceholder: "you@example.com",
      submit: "ส่งลิงก์รีเซ็ต",
      rememberPassword: "จำรหัสผ่านได้แล้วใช่ไหม?",
      logIn: "เข้าสู่ระบบ",
      noticeTitle: "แจ้งเตือนการรีเซ็ต",
      unexpectedError: "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง",
    },
    resetPassword: {
      title: "ตั้งรหัสผ่านใหม่",
      subtitle: "กรอกรหัสผ่านใหม่ของคุณ",
      newPasswordLabel: "รหัสผ่านใหม่",
      newPasswordPlaceholder: "••••••••",
      confirmPasswordLabel: "ยืนยันรหัสผ่านใหม่",
      confirmPasswordPlaceholder: "••••••••",
      submit: "บันทึกรหัสผ่านใหม่",
      failedTitle: "การรีเซ็ตรหัสผ่านล้มเหลว",
      missingSession:
        "ไม่พบเซสชันการรีเซ็ตรหัสผ่านหรือหมดอายุ กรุณาขอรหัสรีเซ็ตใหม่อีกครั้ง",
      unexpectedError: "ไม่สามารถรีเซ็ตรหัสผ่านได้ กรุณาลองใหม่อีกครั้ง",
    },
    changeEmail: {
      back: "ย้อนกลับ",
      brand: "FoodFighter",
      title: "เปลี่ยนอีเมล",
      subtitle:
        "กรอกอีเมลใหม่ของคุณ เราจะส่งรหัสยืนยัน 6 หลักชุดใหม่เพื่อตรวจสอบ",
      currentRegistered: "อีเมลปัจจุบันที่ลงทะเบียนไว้: ",
      newEmailLabel: "อีเมลใหม่",
      newEmailPlaceholder: "new.email@example.com",
      advisoryNotice:
        "การเปลี่ยนอีเมลจะทำให้รหัสยืนยันเดิมหมดอายุทันที",
      submit: "ส่งรหัส",
      cancel: "ยกเลิก",
      errorTitle: "ข้อผิดพลาด",
      sessionNotFound:
        "ไม่พบเซสชันการยืนยัน กรุณาสมัครสมาชิกใหม่อีกครั้ง",
      unexpectedError:
        "เกิดข้อผิดพลาดที่ไม่คาดคิดในการเปลี่ยนอีเมล กรุณาลองใหม่อีกครั้ง",
    },
    social: {
      google: "ดำเนินการต่อด้วย Google",
      line: "ดำเนินการต่อด้วย LINE",
      googleError: "การเข้าสู่ระบบด้วย Google ล้มเหลว กรุณาลองใหม่อีกครั้ง",
      lineUnconfigured: "ยังไม่ได้ตั้งค่าการเข้าสู่ระบบด้วย LINE",
    },
  },
};
