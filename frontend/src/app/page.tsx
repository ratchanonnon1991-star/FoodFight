"use client";

import * as React from "react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FormField, FormLabel, FormDescription, FormError } from "@/components/ui/form-field";
import { PageContainer } from "@/components/layout/page-container";
import {
  Sparkles,
  ShieldCheck,
  Send,
  Heart,
  Settings,
  Mail,
  User,
  Coffee,
} from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [textInputVal, setTextInputVal] = React.useState("pure@example.com");
  const [errorInputVal, setErrorInputVal] = React.useState("invalid-email");

  return (
    <main className="min-h-screen py-12 bg-background">
      <PageContainer maxWidth="lg" className="space-y-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="space-y-3 border-b border-border pb-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="md">
              Design System V1
            </Badge>
            <Badge variant="petal" size="md">
              Pastel Petal #FFC6D9
            </Badge>
            <Badge variant="apricot" size="md">
              Soft Apricot #FFE1C6
            </Badge>
            <Badge variant="custard" size="md">
              Vanilla Custard #FFF7AE
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary">
            FoodFighter Design System V1
          </h1>
          <p className="text-base text-text-secondary max-w-2xl">
            Foundational UI primitives, semantic tokens, accessible form controls, responsive layouts,
            and restrained motion for FoodFighter.
          </p>
        </motion.div>

        {/* Color Palette Section */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Sparkles className="size-5 text-brand-secondary" />
            Approved Brand Palette & Semantic Mapping
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <motion.div variants={staggerItem} className="p-4 rounded-md border border-border bg-surface space-y-2">
              <div className="h-12 w-full rounded-sm bg-[#FFC6D9] border border-black/10" />
              <div className="text-sm font-semibold text-text-primary">Pastel Petal</div>
              <div className="text-xs text-text-muted">#FFC6D9</div>
              <div className="text-xs text-text-secondary">Selected tint / Accent</div>
            </motion.div>

            <motion.div variants={staggerItem} className="p-4 rounded-md border border-border bg-surface space-y-2">
              <div className="h-12 w-full rounded-sm bg-[#FFE1C6] border border-black/10" />
              <div className="text-sm font-semibold text-text-primary">Soft Apricot</div>
              <div className="text-xs text-text-muted">#FFE1C6</div>
              <div className="text-xs text-text-secondary">Warm surface / Accent</div>
            </motion.div>

            <motion.div variants={staggerItem} className="p-4 rounded-md border border-border bg-surface space-y-2">
              <div className="h-12 w-full rounded-sm bg-[#FFF7AE] border border-black/10" />
              <div className="text-sm font-semibold text-text-primary">Vanilla Custard</div>
              <div className="text-xs text-text-muted">#FFF7AE</div>
              <div className="text-xs text-text-secondary">Highlight / Accent</div>
            </motion.div>

            <motion.div variants={staggerItem} className="p-4 rounded-md border border-border bg-surface space-y-2">
              <div className="h-12 w-full rounded-sm bg-[#48284A] text-white" />
              <div className="text-sm font-semibold text-text-primary">Blackberry Cream</div>
              <div className="text-xs text-text-muted">#48284A</div>
              <div className="text-xs text-text-secondary">Brand Primary / Text</div>
            </motion.div>

            <motion.div variants={staggerItem} className="p-4 rounded-md border border-border bg-surface space-y-2">
              <div className="h-12 w-full rounded-sm bg-[#916C80] text-white" />
              <div className="text-sm font-semibold text-text-primary">Dusty Mauve</div>
              <div className="text-xs text-text-muted">#916C80</div>
              <div className="text-xs text-text-secondary">Secondary / Focus Ring</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Buttons Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Buttons & IconButtons</h2>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsLoading((prev) => !prev)}
            >
              Toggle Loading State
            </Button>
          </div>
          <Card padding="md" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Button Variants
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" loading={isLoading} leftIcon={<Send className="size-4" />}>
                  Primary Button
                </Button>
                <Button variant="secondary" loading={isLoading} leftIcon={<Sparkles className="size-4" />}>
                  Secondary Button
                </Button>
                <Button variant="outline" loading={isLoading}>
                  Outline Button
                </Button>
                <Button variant="ghost" loading={isLoading}>
                  Ghost Button
                </Button>
                <Button variant="destructive" loading={isLoading}>
                  Destructive
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Button Sizes
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium (md)</Button>
                <Button size="lg" variant="primary">Large (lg)</Button>
                <IconButton aria-label="Settings" variant="outline" size="sm" icon={<Settings className="size-3.5" />} />
                <IconButton aria-label="Favorites" variant="secondary" size="md" icon={<Heart className="size-4" />} />
                <IconButton aria-label="Profile" variant="primary" size="lg" icon={<User className="size-5" />} />
              </div>
            </div>
          </Card>
        </section>

        {/* Form Controls Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Form Controls & FormField System</h2>
          <Card padding="md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="email">
                <FormLabel required>Email Address (อีเมล)</FormLabel>
                <Input
                  value={textInputVal}
                  onChange={(e) => setTextInputVal(e.target.value)}
                  leftAdornment={<Mail className="size-4" />}
                  placeholder="name@example.com"
                />
                <FormDescription>
                  We will send a 6-digit verification OTP to this email.
                </FormDescription>
              </FormField>

              <FormField name="password">
                <FormLabel required>Password (รหัสผ่าน)</FormLabel>
                <PasswordInput placeholder="Enter your password" />
                <FormDescription>
                  Must be at least 8 characters with letters and numbers.
                </FormDescription>
              </FormField>

              <FormField name="invalid-demo" isInvalid>
                <FormLabel required>Validation Error Example</FormLabel>
                <Input
                  invalid
                  value={errorInputVal}
                  onChange={(e) => setErrorInputVal(e.target.value)}
                  leftAdornment={<Mail className="size-4" />}
                />
                <FormError error="Please enter a valid email address." />
              </FormField>

              <div className="space-y-4 pt-4">
                <Checkbox
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                  label="I agree to Terms of Service & Privacy Policy"
                  description="ยอมรับข้อกำหนดและเงื่อนไขการใช้งาน FoodFighter"
                />

                <Checkbox
                  disabled
                  defaultChecked
                  label="Disabled Checked Preference"
                  description="This option cannot be modified."
                />
              </div>
            </div>
          </Card>
        </section>

        {/* Badges & Alerts Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Badges, Status Indicators & Alerts</h2>
          <Card padding="md" className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Badges
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="brand" dot>Brand Primary</Badge>
                <Badge variant="brand-secondary">Brand Secondary</Badge>
                <Badge variant="petal">Petal Accent</Badge>
                <Badge variant="apricot">Apricot Accent</Badge>
                <Badge variant="custard">Custard Accent</Badge>
                <Badge variant="success" dot>Success</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="danger" dot>Danger</Badge>
                <Badge variant="info" dot>Info</Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Alerts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert variant="info">
                  <AlertTitle>Food Profile Required</AlertTitle>
                  <AlertDescription>
                    Please complete your food allergies and preferences before joining a session.
                  </AlertDescription>
                </Alert>

                <Alert variant="success">
                  <AlertTitle>Ready Confirmed</AlertTitle>
                  <AlertDescription>
                    You are now an active member in the FoodFight session.
                  </AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <AlertTitle>Time Remaining</AlertTitle>
                  <AlertDescription>
                    Voting session will close in 30 seconds.
                  </AlertDescription>
                </Alert>

                <Alert variant="error">
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>
                    Invalid email or password. Please try again.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Card>
        </section>

        {/* Separator & Spinners */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Separators & Spinners</h2>
          <Card padding="md" className="space-y-6">
            <div className="max-w-md mx-auto space-y-4">
              <p className="text-sm text-center text-text-secondary">Social Auth Separator Example:</p>
              <Separator text="OR CONTINUE WITH" />
              <div className="flex justify-center gap-4 py-2">
                <Spinner size="sm" variant="primary" label="Loading small" />
                <Spinner size="md" variant="secondary" label="Loading medium" />
                <Spinner size="lg" variant="primary" label="Loading large" />
              </div>
            </div>
          </Card>
        </section>

        {/* Cards & Thai Typography Verification */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-text-primary">Card Composition & Thai / English Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="petal">ห้องเลือกอาหาร</Badge>
                  <Coffee className="size-4 text-brand-primary" />
                </div>
                <CardTitle as="h3">มื้อเย็นวันเสาร์</CardTitle>
                <CardDescription>Created by Pure · 4/8 Members</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary">
                  AI กำลังเตรียมวิเคราะห์เงื่อนไขอาหารของสมาชิกทุกคนเพื่อแนะนำ 2 เมนูที่เหมาะสมที่สุด
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs text-text-muted">รัศมี 5 km</span>
                <Button size="sm" variant="primary">เข้าร่วมห้อง</Button>
              </CardFooter>
            </Card>

            <Card variant="subtle">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="custard">AI Recommendation</Badge>
                  <Sparkles className="size-4 text-brand-primary" />
                </div>
                <CardTitle as="h3">ชาบูต้มยำ & สุกี้โบราณ</CardTitle>
                <CardDescription>Match Score 95%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary">
                  เหมาะสมกับงบประมาณเฉลี่ย 300-500 บาท และตรงตามเงื่อนไขไม่มีอาหารทะเล
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs font-medium text-status-success-text">สมาชิกพร้อม 4/4</span>
                <Button size="sm" variant="secondary">OK</Button>
              </CardFooter>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success">Final Choice</Badge>
                  <ShieldCheck className="size-4 text-status-success-icon" />
                </div>
                <CardTitle as="h3">ร้านอาหารแนะนำ</CardTitle>
                <CardDescription>ระยะห่าง 1.2 กม. จากจุดนัดพบ</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-text-secondary">
                  เปิดบริการ 11:00 - 22:00 น. มีที่จอดรถและรองรับการชำระเงินแบบไร้เงินสด
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-xs text-text-muted">Tel: 02-xxx-xxxx</span>
                <Button size="sm" variant="outline">ดูแผนที่</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </PageContainer>
    </main>
  );
}
