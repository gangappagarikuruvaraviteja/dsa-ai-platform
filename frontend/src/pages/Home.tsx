import { Link } from "react-router-dom";
import {
  ArrowRight, Code2, Brain, Zap, BookOpen, Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/logo.png";

const features = [
  { icon: Terminal, title: "Clean Problem Detail", description: "Read the problem statement, examples, and constraints in a distraction-free interface." },
  { icon: Brain, title: "AI Tutor", description: "Ask for approach, optimized solution ideas, and complexity explanation." },
  { icon: Zap, title: "LeetCode Redirect", description: "Open the exact LeetCode page for each question with one click." },
  { icon: BookOpen, title: "Topic-Based Learning", description: "Practice by topic from Arrays to Dynamic Programming with curated sets." },
  { icon: Code2, title: "Progress Tracking", description: "Mark solved questions and monitor your growth over time." },
];


// Stats shown in the hero
const stats = [
  { value: "250", label: "Target Questions" },
  { value: "18", label: "Topics" },
  { value: "1", label: "LeetCode Link per Problem" },
];

const Home = () => {



  return (
    <div className="min-h-screen pt-16">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pb-16 pt-20 lg:pb-24 lg:pt-28">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-accent/5 blur-[100px]" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl animate-slide-up">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              AI-Powered DSA Interview Prep
            </div>

            {/* Logo + Title */}
            <div className="mb-6 flex items-center justify-center gap-4">
              <img src={logoImg} alt="DSA Easy" className="h-16 w-16 lg:h-20 lg:w-20" />
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-foreground lg:text-7xl">
                <span className="text-gradient-hero">DSA Easy</span>
              </h1>
            </div>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
              Practice curated DSA problems with clear explanations and AI help.
              Open each question on LeetCode directly when you are ready to solve.
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link to="/problems">
                <Button size="lg" className="gradient-hero text-primary-foreground font-semibold px-8 shadow-glow hover:opacity-90 transition-opacity">
                  Start Practicing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary">
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 lg:gap-12">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-foreground lg:text-3xl">{value}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              Everything You Need to <span className="text-gradient-hero">Ace Interviews</span>
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground lg:text-lg">
              A complete platform designed to sharpen your problem-solving skills.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-lg">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Ready to Level Up?</h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of developers preparing for their dream job.
            </p>
            <Link to="/problems">
              <Button size="lg" className="gradient-hero text-primary-foreground font-semibold px-8 shadow-glow hover:opacity-90 transition-opacity">
                Browse Problems
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
