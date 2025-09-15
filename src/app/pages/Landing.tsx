import { useState } from "react";
import { Button } from "../../shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shared/ui/card";
import { Input } from "../../shared/ui/input";
import { Label } from "../../shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shared/ui/tabs";
import { Badge } from "../../shared/ui/badge";
import { 
  Play, 
  Trophy, 
  Bot, 
  Heart, 
  Star, 
  Check, 
  Download,
  Menu,
  Video
} from "lucide-react";

interface LandingProps {
  onGetStarted?: () => void;
  onGoToDashboard?: () => void;
}

const Landing = ({ onGetStarted, onGoToDashboard }: LandingProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      alert("Đăng ký thành công! Chuyển đến onboarding...");
      onGetStarted?.();
      setLoading(false);
    }, 1000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signin process
    setTimeout(() => {
      alert("Đăng nhập thành công! Chuyển đến dashboard...");
      onGetStarted?.();
      setLoading(false);
    }, 1000);
  };

  const handleGetStarted = () => {
    onGetStarted?.();
  };

  const handleGoToDashboard = () => {
    onGoToDashboard?.();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-secondary/20">
      {/* Header */}
      <header className="px-6 py-4 bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">GL</span>
              </div>
              <span className="text-2xl font-bold text-foreground">GoLearn</span>
            </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Giới thiệu</a>
            <a href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">Khóa học</a>
            <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Cộng đồng</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">Về chúng tôi</a>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => setShowAuthModal(true)}
              >
                Đăng nhập
              </Button>
               <Button 
                 onClick={() => setShowAuthModal(true)}
                 className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90"
               >
                 Đăng ký
               </Button>
            </div>
          </nav>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4" />
                <span>Ứng dụng học ngôn ngữ ký hiệu #1 Việt Nam</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Học ngôn ngữ ký hiệu Việt Nam –{" "}
                <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  vui, hiệu quả và đầy kết nối!
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Khám phá thế giới giao tiếp bằng ký hiệu qua video HD, bài học tương tác và trò chơi ngôn ngữ.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button 
                 size="lg" 
                 className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 shadow-lg"
                 onClick={handleGetStarted}
               >
                 <Play className="mr-2 h-5 w-5" />
                 Bắt đầu ngay
               </Button>
               <Button 
                 variant="outline" 
                 size="lg" 
                 className="text-lg px-8 py-6"
                 onClick={handleGoToDashboard}
               >
                 Tôi đã có tài khoản
               </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-muted-foreground">học viên</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-muted-foreground">bài học ký hiệu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-muted-foreground">hài lòng</div>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-8xl">👋</div>
                <p className="text-xl font-semibold text-foreground">Xin chào!</p>
                <p className="text-muted-foreground">Học cùng những người bạn mới</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Tại sao chọn GoLearn?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chúng tôi kết hợp công nghệ hiện đại với phương pháp giảng dạy hiệu quả
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Video className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Video trực quan</h3>
              <p className="text-muted-foreground">Bài học HD, được hoạt hình hoá với giáo viên chuyên nghiệp</p>
            </Card>

            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Trophy className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Gamification</h3>
              <p className="text-muted-foreground">XP, streak, bảng xếp hạng, huy hiệu để duy trì động lực</p>
            </Card>

            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI feedback</h3>
              <p className="text-muted-foreground">Hệ thống nhận diện cử chỉ, gợi ý sửa sai thông minh</p>
            </Card>

            <Card className="text-center space-y-4 p-6 hover:shadow-lg transition-shadow border-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Cộng đồng</h3>
              <p className="text-muted-foreground">Học cùng người điếc và người nghe trong môi trường thân thiện</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Học viên nói gì về GoLearn</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Minh An",
                role: "Học viên",
                content: "GoLearn giúp tôi học ngôn ngữ ký hiệu một cách tự nhiên và thú vị. Video rất rõ ràng!",
                rating: 5
              },
              {
                name: "Thúy Hằng", 
                role: "Giáo viên",
                content: "Ứng dụng tuyệt vời để kết nối cộng đồng người điếc và người nghe. Rất recommend!",
                rating: 5
              },
              {
                name: "Đức Anh",
                role: "Phụ huynh", 
                content: "Con tôi rất thích học với GoLearn. Bé tiến bộ rất nhanh và luôn hào hứng.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-foreground">Chọn gói học phù hợp</h2>
            <p className="text-xl text-muted-foreground">Bắt đầu miễn phí, nâng cấp khi cần</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 space-y-6 border-2">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">GoLearn Free</h3>
                <p className="text-muted-foreground">Học miễn phí với quảng cáo</p>
                <div className="text-3xl font-bold text-foreground">Miễn phí</div>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Truy cập 100+ bài học cơ bản",
                  "Video HD chất lượng cao", 
                  "Gamification cơ bản",
                  "Cộng đồng học tập"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
               <Button className="w-full" variant="outline" onClick={handleGetStarted}>
                 Bắt đầu miễn phí
               </Button>
            </Card>

            <Card className="p-8 space-y-6 border-2 border-blue-600 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                Phổ biến nhất
              </Badge>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">GoLearn Plus</h3>
                <p className="text-muted-foreground">Trải nghiệm học tập toàn diện</p>
                <div className="text-3xl font-bold text-foreground">
                  199.000đ<span className="text-lg text-muted-foreground">/tháng</span>
                </div>
              </div>
              
              <ul className="space-y-3">
                {[
                  "Tất cả tính năng Free",
                  "Không quảng cáo",
                  "Tải offline",
                  "AI feedback nâng cao",
                  "Thống kê chi tiết",
                  "Ưu tiên hỗ trợ"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-blue-600" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
               <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500" onClick={handleGetStarted}>
                 Dùng thử 14 ngày miễn phí
               </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 rounded-3xl p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-foreground">Học mọi lúc, mọi nơi</h2>
                <p className="text-xl text-muted-foreground">
                  Tải ứng dụng GoLearn để học ngôn ngữ ký hiệu ngay cả khi offline
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex items-center space-x-2 px-6 py-3">
                    <Download className="h-5 w-5" />
                    <span>App Store</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 px-6 py-3">
                    <Download className="h-5 w-5" />
                    <span>Google Play</span>
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-8xl">📱</div>
                <p className="text-muted-foreground mt-4">Mascot với ba lô cầm điện thoại</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">GL</span>
              </div>
              <span className="text-2xl font-bold text-foreground">GoLearn</span>
            </div>
              <p className="text-muted-foreground max-w-sm">
                Ứng dụng học ngôn ngữ ký hiệu Việt Nam hàng đầu, kết nối cộng đồng người điếc và người nghe.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Về chúng tôi</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Giới thiệu</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Đội ngũ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tin tức</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Sản phẩm</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Ngôn ngữ ký hiệu Việt Nam</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Hỗ trợ phụ huynh</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Người học khiếm thính</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Giáo viên</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Hỗ trợ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Liên hệ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Điều khoản sử dụng</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-muted-foreground">
              © 2024 GoLearn. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">YouTube</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Bắt đầu học ngay</CardTitle>
              <CardDescription>
                Tạo tài khoản miễn phí để bắt đầu hành trình học ngôn ngữ ký hiệu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Đăng ký</TabsTrigger>
                  <TabsTrigger value="signin">Đăng nhập</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input
                        id="email-signup"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Mật khẩu</Label>
                      <Input
                        id="password-signup"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Đang đăng ký..." : "Tạo tài khoản miễn phí"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-signin">Email</Label>
                      <Input
                        id="email-signin"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signin">Mật khẩu</Label>
                      <Input
                        id="password-signin"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <div className="p-6 pt-0">
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={() => setShowAuthModal(false)}
              >
                Đóng
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Landing;
