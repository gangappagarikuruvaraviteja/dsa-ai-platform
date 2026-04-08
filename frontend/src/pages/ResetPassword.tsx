import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { USE_SPRING_BOOT } from '@/config/backend';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft, Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (USE_SPRING_BOOT) {
      setIsRecovery(true);
      return;
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      if (USE_SPRING_BOOT) {
        const token = new URLSearchParams(window.location.search).get('token') || '';
        if (!token) {
          throw new Error('Missing reset token. Please request forgot password again.');
        }
        await authApi.resetPassword(token, password);
      } else {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
      }
      toast.success('Password updated successfully!');
      navigate('/auth');
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

        <div className="absolute top-[18%] left-[10%] animate-fade-in opacity-20" style={{ animationDelay: '0.3s' }}>
          <div className="rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-3 font-mono text-xs text-muted-foreground">
            <span className="text-primary">password</span> = new_hash()
          </div>
        </div>
        <div className="absolute top-[38%] right-[8%] animate-fade-in opacity-20" style={{ animationDelay: '0.6s' }}>
          <div className="rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-3 font-mono text-xs text-muted-foreground">
            <span className="text-easy">✓ secure</span>
          </div>
        </div>
        <div className="absolute bottom-[28%] left-[15%] animate-fade-in opacity-20" style={{ animationDelay: '0.9s' }}>
          <div className="rounded-lg border border-border/30 bg-card/30 backdrop-blur-sm p-3 font-mono text-xs text-muted-foreground">
            <span className="text-medium">auth</span>.updateUser()
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 animate-fade-in">
          <img src={logoImg} alt="DSA Easy" className="h-20 w-20 mb-6 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-foreground mb-3">
            <span className="text-gradient-hero">DSA Easy</span>
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-10 max-w-sm">
            Almost there — set your new password
          </p>

          <div className="space-y-3 w-full max-w-xs">
            {[
              { icon: Lock, text: "Strong password required", delay: "0.4s" },
              { icon: ShieldCheck, text: "Encrypted & secure", delay: "0.6s" },
              { icon: CheckCircle, text: "Instant access after reset", delay: "0.8s" },
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
            <CardTitle className="text-2xl text-foreground">Set new password</CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">New password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="border-border bg-secondary text-foreground placeholder:text-muted-foreground transition-all focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button type="submit" className="w-full gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-all" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update password
              </Button>
            </form>
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

export default ResetPassword;
