"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Settings,
  Trophy,
  BarChart3,
  Clock,
  Target,
  Star,
  Award,
  Calendar,
  Edit3,
  Camera,
  Mail,
  Shield,
} from "lucide-react"
import { BottomNavigation } from "./bottom-navigation"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
}

interface ProfileSystemProps {
  onBack: () => void
  userPreferences: {
    firstName: string
    language: string
    goal: string
  }
  onNavigate?: (section: string) => void
}

export function ProfileSystem({ onBack, userPreferences, onNavigate }: ProfileSystemProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: userPreferences.firstName,
    lastName: "Smith",
    email: "user@example.com",
    joinDate: "2024-01-15",
    language: userPreferences.language,
    dailyGoal: userPreferences.goal,
  })

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    soundEffects: true,
    darkMode: false,
    practiceReminders: true,
    weeklyReports: true,
  })

  const achievements: Achievement[] = [
    {
      id: "first-lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-15",
    },
    {
      id: "week-streak",
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: "🔥",
      earned: true,
      earnedDate: "2024-01-22",
    },
    {
      id: "hundred-signs",
      title: "Sign Master",
      description: "Learn 100 different signs",
      icon: "👑",
      earned: false,
      progress: 23,
      maxProgress: 100,
    },
    {
      id: "perfect-score",
      title: "Perfectionist",
      description: "Get 100% on 5 quizzes",
      icon: "⭐",
      earned: false,
      progress: 2,
      maxProgress: 5,
    },
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Practice before 8 AM for 5 days",
      icon: "🌅",
      earned: false,
      progress: 1,
      maxProgress: 5,
    },
    {
      id: "social-learner",
      title: "Social Learner",
      description: "Share your progress 3 times",
      icon: "🤝",
      earned: false,
      progress: 0,
      maxProgress: 3,
    },
  ]

  const learningStats = {
    totalLessons: 23,
    totalPracticeTime: 145, // minutes
    averageScore: 87,
    currentStreak: 5,
    longestStreak: 12,
    signsLearned: 23,
    totalXP: 1240,
    level: 3,
    nextLevelXP: 1500,
  }

  const recentActivity = [
    { date: "2024-01-20", activity: "Completed Greetings Quiz", score: 95 },
    { date: "2024-01-19", activity: "Practiced Mirror Mode", duration: "15 min" },
    { date: "2024-01-18", activity: "Learned 3 new signs", signs: ["HELLO", "GOODBYE", "THANK YOU"] },
    { date: "2024-01-17", activity: "Completed Chapter 1", score: 88 },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile data logic here
  }

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [setting]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted pb-20">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-foreground">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-muted-foreground">Learning {profileData.language}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(profileData.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dailyGoal">Daily Goal</Label>
                  <Input
                    id="dailyGoal"
                    value={profileData.dailyGoal}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, dailyGoal: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 mt-6">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{activity.activity}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      {activity.score && <Badge variant="secondary">{activity.score}%</Badge>}
                      {activity.duration && <Badge variant="outline">{activity.duration}</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            {/* Level Progress */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Level Progress</h3>
                <Badge className="bg-primary text-primary-foreground">Level {learningStats.level}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="text-foreground">
                    {learningStats.totalXP} / {learningStats.nextLevelXP}
                  </span>
                </div>
                <Progress value={(learningStats.totalXP / learningStats.nextLevelXP) * 100} className="h-3" />
              </div>
            </Card>

            {/* Learning Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{learningStats.totalLessons}</div>
                    <div className="text-sm text-muted-foreground">Lessons</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{learningStats.totalPracticeTime}m</div>
                    <div className="text-sm text-muted-foreground">Practice Time</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{learningStats.averageScore}%</div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{learningStats.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Detailed Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Learning Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signs Learned</span>
                    <span className="font-semibold text-foreground">{learningStats.signsLearned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total XP</span>
                    <span className="font-semibold text-foreground">{learningStats.totalXP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Level</span>
                    <span className="font-semibold text-foreground">{learningStats.level}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longest Streak</span>
                    <span className="font-semibold text-foreground">{learningStats.longestStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Practice Time</span>
                    <span className="font-semibold text-foreground">
                      {Math.floor(learningStats.totalPracticeTime / 60)}h {learningStats.totalPracticeTime % 60}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Score</span>
                    <span className="font-semibold text-foreground">{learningStats.averageScore}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Your Achievements</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`p-4 ${achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/30"}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`text-3xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                          {achievement.earned && (
                            <Badge className="bg-primary text-primary-foreground">
                              <Award className="w-3 h-3 mr-1" />
                              Earned
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && achievement.earnedDate && (
                          <p className="text-xs text-muted-foreground">
                            Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                        {!achievement.earned && achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground">
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-foreground">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about your learning progress</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-foreground">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">Get weekly progress reports via email</p>
                  </div>
                  <Switch
                    checked={settings.emailUpdates}
                    onCheckedChange={(checked) => handleSettingChange("emailUpdates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-foreground">Practice Reminders</Label>
                    <p className="text-sm text-muted-foreground">Daily reminders to practice</p>
                  </div>
                  <Switch
                    checked={settings.practiceReminders}
                    onCheckedChange={(checked) => handleSettingChange("practiceReminders", checked)}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">App Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-foreground">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">Play sounds for interactions and feedback</p>
                  </div>
                  <Switch
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => handleSettingChange("soundEffects", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-foreground">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark theme for the app</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Change Email
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent"
                >
                  <User className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentSection="profile" onNavigate={onNavigate || (() => {})} />
    </div>
  )
}
