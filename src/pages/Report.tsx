
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldIcon } from "@/components/ui/ShieldIcon";
import { Shield, UserRound, Eye, EyeOff, Upload, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Report = () => {
  const [reportType, setReportType] = useState("standard");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to an API
    setFormSubmitted(true);
    
    toast({
      title: "Report submitted successfully",
      description: "Your report has been received and will be processed immediately.",
      variant: "default",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Report an Incident</h1>

        <div className="max-w-3xl mx-auto">
          {formSubmitted ? (
            <Card className="border-guardian-success/30 bg-guardian-success/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldIcon variant="success" size={24} />
                  <CardTitle>Report Submitted</CardTitle>
                </div>
                <CardDescription>Your report has been successfully submitted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Thank you for your vigilance. Your report has been received and will be processed immediately by our team.</p>
                <p>A confirmation and reference number have been sent to the contact information you provided (if applicable).</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setFormSubmitted(false)}>Submit Another Report</Button>
                <Button className="bg-guardian-primary hover:bg-guardian-dark">View Report Status</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-guardian-primary" />
                  <CardTitle>Submit a Report</CardTitle>
                </div>
                <CardDescription>
                  Help us protect children by reporting suspicious activity or concerns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="standard" value={reportType} onValueChange={setReportType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="standard">Standard Report</TabsTrigger>
                    <TabsTrigger value="anonymous">Anonymous Report</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="standard" className="mt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Your contact information will be collected but kept confidential. This allows our team to follow up for additional details if needed.
                    </p>
                  </TabsContent>

                  <TabsContent value="anonymous" className="mt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      No personally identifiable information will be collected. This report will be encrypted and anonymized to protect your identity.
                    </p>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="anonymous-confirm" 
                        checked={isAnonymous} 
                        onCheckedChange={(checked) => {
                          if (checked) setIsAnonymous(true);
                          else setIsAnonymous(false);
                        }}
                      />
                      <label
                        htmlFor="anonymous-confirm"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I understand that I cannot be contacted for follow-up information
                      </label>
                    </div>
                  </TabsContent>

                  <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {reportType === "standard" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="Enter your name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number (Optional)</Label>
                          <Input id="phone" placeholder="Enter your phone number" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="location">Incident Location</Label>
                      <div className="relative">
                        <Input id="location" placeholder="Enter location or use current location" />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full"
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incident-type">Incident Type</Label>
                      <Select>
                        <SelectTrigger id="incident-type">
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suspicious-activity">Suspicious Activity</SelectItem>
                          <SelectItem value="potential-trafficking">Potential Trafficking</SelectItem>
                          <SelectItem value="missing-child">Missing Child</SelectItem>
                          <SelectItem value="child-at-risk">Child at Risk</SelectItem>
                          <SelectItem value="other">Other Concern</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Provide as much detail as possible about what you observed"
                        className="min-h-32"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evidence" className="block">Upload Evidence (Optional)</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop files here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports images, video, and audio files
                        </p>
                        <Input id="evidence" type="file" className="hidden" multiple />
                        <Button type="button" variant="outline" size="sm" className="mt-4">
                          Select Files
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I confirm that this report is being made in good faith
                      </label>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {reportType === "anonymous" ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                        <span>
                          {reportType === "anonymous" 
                            ? "Your identity will be protected" 
                            : "Your information is kept confidential"}
                        </span>
                      </div>
                      <Button 
                        type="submit" 
                        className="bg-guardian-primary hover:bg-guardian-dark"
                        disabled={reportType === "anonymous" && !isAnonymous}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Submit Report
                      </Button>
                    </div>
                  </form>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Report;
