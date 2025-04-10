
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Download, Code, FileJson, FileOutput, BookOpen, Bolt, CloudSnow, Droplet } from "lucide-react";

interface ExportActionsProps {
  isComplete: boolean;
  onShowAudit: () => void;
}

const ExportActions = ({ isComplete, onShowAudit }: ExportActionsProps) => {
  if (!isComplete) {
    return null;
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Export & Actions</CardTitle>
        <CardDescription>
          Export your mapped data to ESG frameworks or access via API
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button className="h-auto py-4 px-6 flex flex-col items-center justify-center space-y-2 text-center">
          <FileOutput className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Export to GRESB</span>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Bolt className="h-3 w-3" />
            <CloudSnow className="h-3 w-3" />
            <Droplet className="h-3 w-3" />
          </div>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center justify-center space-y-2 text-center" onClick={onShowAudit}>
          <FileJson className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">View Audit Trail</span>
          <span className="text-xs text-muted-foreground">View data sources</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center justify-center space-y-2 text-center">
          <Download className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Download Report</span>
          <span className="text-xs text-muted-foreground">PDF or Excel format</span>
        </Button>
        
        <Button className="h-auto py-4 px-6 flex flex-col items-center justify-center space-y-2 text-center bg-purple-600 hover:bg-purple-700">
          <BookOpen className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">Export to SFDR</span>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Bolt className="h-3 w-3" />
            <CloudSnow className="h-3 w-3" />
            <Droplet className="h-3 w-3" />
          </div>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center justify-center space-y-2 text-center">
          <Code className="h-6 w-6 mb-2" />
          <span className="text-sm font-medium">API Access</span>
          <span className="text-xs text-muted-foreground">Generate endpoint</span>
          <ArrowUpRight className="h-3 w-3 mt-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExportActions;
