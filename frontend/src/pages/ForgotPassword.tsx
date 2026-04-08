import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { USE_SPRING_BOOT } from '@/config/backend';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Mail, ShieldCheck, KeyRound } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (USE_SPRING_BOOT) {
        const response = await authApi.forgotPassword(email);
        setResetToken(response.resetToken || '');
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
      }
      setSent(true);
      toast.success(USE_SPRING_BOOT ? 'Reset token generated for local development' : 'Check your email for the reset link');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="absolute top-[20%] left-[12%] animate-fade-in opacity-20" style={{ animationDelay: '0.3s' }}>
          <div className="rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-3 font-mono text-xs text-muted-foreground">
            <span className="text-primary">reset</span>(credentials)
          </div>
        </div>
        <div className="absolute top-[40%] right-[10%] animate-fade-in opacity-20" style={{ animationDelay: '0.6s' }}>
          <div className="rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-3 font-mono text-xs text-muted-foreground">
            <span className="text-easy">✓ verified</span>
          </div>
        </div>
        <div className="absolute bottom-[30%] left-[18%] animate-fade-in opacity-20" style={{ animationDelay: '0.9s' }}>
          <div className="rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-3 font-mono text-xs text-muted-foreground">
            <span className="text-medium">auth</span>.recover()
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 animate-fade-in">
          <img src={logoImg} alt="DSA Easy" className="h-20 w-20 mb-6 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-foreground mb-3">
            <span className="text-gradient-hero">DSA Easy</span>
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-10 max-w-sm">
            Don't worry — we'll help you get back in
          </p>

          <div className="space-y-3 w-full max-w-xs">
            {[
              { icon: Mail, text: "Reset link via email", delay: "0.4s" },
              { icon: ShieldCheck, text: "Secure password recovery", delay: "0.6s" },
              { icon: KeyRound, text: "Set a new password instantly", delay: "0.8s" },
            ].map(({ icon: Icon, text, delay }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-4 py-3 animate-fade-in"
                style={{ animationDelay: delay }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-border bg-card animate-scale-in shadow-lg">
          <CardHeader className="text-center">
            <div className="lg:hidden mb-4">
              <img src={logoImg} alt="DSA Easy" className="mx-auto h-14 w-14" />
            </div>
            <CardTitle className="text-2xl text-foreground">
              {sent ? 'Check your email' : 'Reset your password'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {sent
                ? `We sent a password reset link to ${email}`
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="space-y-4 text-center animate-fade-in">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-2">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                {USE_SPRING_BOOT && resetToken && (
                  <div className="rounded-md border border-border bg-secondary p-3 text-left">
                    <p className="mb-1 text-xs text-muted-foreground">Local reset token:</p>
                    <p className="break-all font-mono text-xs text-foreground">{resetToken}</p>
                    <Link
                      to={`/reset-password?token=${encodeURIComponent(resetToken)}`}
                      className="mt-2 inline-block text-xs text-primary hover:underline"
                    >
                      Continue to reset page
                    </Link>
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full border-border text-foreground hover:bg-secondary/80 transition-all"
                  onClick={() => setSent(false)}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="border-border bg-secondary text-foreground placeholder:text-muted-foreground transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <Button type="submit" className="w-full gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-all" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send reset link
                </Button>
              </form>
            )}
            <div className="mt-6 text-center">
              <Link to="/auth" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
