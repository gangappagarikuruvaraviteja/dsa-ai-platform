import { User, Mail, Calendar, Flame, CheckCircle, TrendingUp, Loader2, Edit2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

const Profile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: solvedCount = 0 } = useQuery({
    queryKey: ["profile-solved-count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count } = await supabase
        .from("user_problem_progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("solved", true);
      return count || 0;
    },
  });

  const startEditing = () => {
    setDisplayName(profile?.display_name || "");
    setUsername(profile?.username || "");
    setBio(profile?.bio || "");
    setEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim() || null,
          username: username.trim() || null,
          bio: bio.trim() || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Profile updated!");
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["navbar-profile"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    } catch (e: any) {
      toast.error(e.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl px-4 pb-10 pt-24 text-center">
        <p className="text-muted-foreground">Please sign in to view your profile.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-2xl px-4 pb-10 pt-24 flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const email = user.email || "";
  const avatarUrl = user.user_metadata?.avatar_url;
  const joinedDate = profile?.created_at ? format(new Date(profile.created_at), "MMMM yyyy") : "Unknown";

  return (
    <div className="container mx-auto max-w-2xl px-4 pb-10 pt-24">
      <div className="rounded-xl border border-border bg-card p-8 shadow-card">
        {/* Avatar & Name */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover border border-border" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
            )}
            <div>
              {editing ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Display name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="h-8 text-sm"
                  />
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-foreground">
                    {profile?.display_name || user.user_metadata?.full_name || "Anonymous"}
                  </h1>
                  {profile?.username && (
                    <p className="text-sm text-muted-foreground">@{profile.username}</p>
                  )}
                </>
              )}
            </div>
          </div>
          {!editing && (
            <Button variant="outline" size="sm" onClick={startEditing} className="border-border text-foreground hover:bg-secondary">
              <Edit2 className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
          )}
        </div>

        {/* Bio */}
        {editing ? (
          <div className="mb-6">
            <Input
              placeholder="Write a short bio..."
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="text-sm"
            />
            <div className="mt-3 flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={saving} className="gradient-hero text-primary-foreground">
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)} className="border-border text-foreground">
                Cancel
              </Button>
            </div>
          </div>
        ) : profile?.bio ? (
          <p className="mb-6 text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
        ) : null}

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <CheckCircle className="mx-auto mb-2 h-5 w-5 text-primary" />
            <div className="text-2xl font-bold text-foreground">{solvedCount}</div>
            <div className="text-xs text-muted-foreground">Solved</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <Flame className="mx-auto mb-2 h-5 w-5 text-medium" />
            <div className="text-2xl font-bold text-foreground">{profile?.streak || 0}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="rounded-lg bg-secondary/50 p-4 text-center">
            <TrendingUp className="mx-auto mb-2 h-5 w-5 text-info" />
            <div className="text-2xl font-bold text-foreground">
              {profile?.problems_solved || 0}
            </div>
            <div className="text-xs text-muted-foreground">Total Score</div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" /> {email}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" /> Joined {joinedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
