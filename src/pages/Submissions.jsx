import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { CheckCircle, Clock, Star, ExternalLink, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function Submissions() {
  const { user } = useOutletContext();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("pending");
  const [reviewing, setReviewing] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");

  useEffect(() => {
    base44.entities.Submission.list("-created_date", 50).then(data => {
      setSubmissions(data);
      setLoading(false);
    });
  }, []);

  const handleGrade = async (sub) => {
    setReviewing(sub.id);
    await base44.entities.Submission.update(sub.id, {
      status: "graded",
      feedback,
      grade,
    });
    setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, status: "graded", feedback, grade } : s));
    setFeedback("");
    setGrade("");
    setReviewing(null);
    toast({ title: "Graded!", description: `Feedback sent to ${sub.student_name}` });
  };

  const filtered = submissions.filter(s => s.status === tab);

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-poppins font-bold text-2xl text-foreground">Submissions</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Review, grade, and provide feedback on student work</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-muted">
          <TabsTrigger value="pending" className="gap-1.5">
            <Clock size={13} /> Pending ({submissions.filter(s => s.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="gap-1.5">
            <CheckCircle size={13} /> Reviewed
          </TabsTrigger>
          <TabsTrigger value="graded" className="gap-1.5">
            <Star size={13} /> Graded
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <Card className="p-8 text-center border-dashed">
          <p className="text-muted-foreground text-sm">No {tab} submissions.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map(sub => (
            <Card key={sub.id} className="p-5 border-border/60 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-poppins font-bold flex-shrink-0">
                    {sub.student_name?.charAt(0) || "S"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-poppins font-semibold text-sm text-foreground">{sub.student_name || "Student"}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {sub.submitted_date && format(new Date(sub.submitted_date), "MMM d, yyyy")}
                    </p>
                    {sub.text_response && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-xl text-sm text-foreground/80">
                        {sub.text_response}
                      </div>
                    )}
                    {sub.file_url && (
                      <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary text-xs mt-2 hover:underline">
                        <ExternalLink size={12} /> View attached file
                      </a>
                    )}
                    {sub.feedback && (
                      <div className="mt-3 p-3 bg-secondary/10 border border-secondary/20 rounded-xl">
                        <p className="text-xs font-semibold text-secondary mb-1">Your Feedback</p>
                        <p className="text-sm text-foreground">{sub.feedback}</p>
                        {sub.grade && <p className="text-sm font-bold text-primary mt-1">Grade: {sub.grade}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {sub.status === "pending" && (
                <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                  <div className="flex gap-3">
                    <Input
                      value={grade}
                      onChange={e => setGrade(e.target.value)}
                      placeholder="Grade (e.g., 95, A+, Pass)"
                      className="text-sm w-44"
                    />
                  </div>
                  <Textarea
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    placeholder="Write feedback for the student..."
                    className="min-h-[80px] text-sm"
                  />
                  <Button
                    onClick={() => handleGrade(sub)}
                    disabled={reviewing === sub.id || !feedback.trim()}
                    className="bg-primary text-white rounded-xl gap-2 text-sm"
                  >
                    {reviewing === sub.id ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
                    Submit Feedback
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}