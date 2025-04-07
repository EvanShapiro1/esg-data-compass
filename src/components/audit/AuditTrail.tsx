
import React from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Info, Code, History, ArrowLeft, FileOutput } from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  sourceFile: string;
  description: string;
  type: 'file' | 'transform' | 'export';
}

interface AuditTrailProps {
  isVisible: boolean;
  onClose: () => void;
}

const AuditTrail = ({ isVisible, onClose }: AuditTrailProps) => {
  // Mock audit trail data - in a real application, this would come from your API
  const auditTrail: AuditEntry[] = [
    {
      id: '1',
      timestamp: '2023-04-07T10:15:32',
      action: 'File Upload',
      sourceFile: 'energy_data_2024.xlsx',
      description: 'Uploaded Excel spreadsheet with energy consumption data',
      type: 'file'
    },
    {
      id: '2',
      timestamp: '2023-04-07T10:15:45',
      action: 'File Upload',
      sourceFile: 'emissions_report.pdf',
      description: 'Uploaded PDF with emissions reporting',
      type: 'file'
    },
    {
      id: '3',
      timestamp: '2023-04-07T10:16:12',
      action: 'File Upload',
      sourceFile: 'water_consumption.csv',
      description: 'Uploaded CSV with water usage metrics',
      type: 'file'
    },
    {
      id: '4',
      timestamp: '2023-04-07T10:18:03',
      action: 'AI Processing',
      sourceFile: 'energy_data_2024.xlsx',
      description: 'Extracted 24 energy data points from spreadsheet',
      type: 'transform'
    },
    {
      id: '5',
      timestamp: '2023-04-07T10:18:14',
      action: 'AI Processing',
      sourceFile: 'emissions_report.pdf',
      description: 'Parsed PDF and extracted 12 emissions metrics',
      type: 'transform'
    },
    {
      id: '6',
      timestamp: '2023-04-07T10:18:22',
      action: 'AI Processing',
      sourceFile: 'water_consumption.csv',
      description: 'Processed 8 water consumption metrics',
      type: 'transform'
    },
    {
      id: '7',
      timestamp: '2023-04-07T10:19:45',
      action: 'Schema Mapping',
      sourceFile: 'All Files',
      description: 'Mapped 44 source fields to GRESB schema',
      type: 'transform'
    },
    {
      id: '8',
      timestamp: '2023-04-07T10:21:02',
      action: 'Validation',
      sourceFile: 'All Files',
      description: 'Completed validation with 39 passes and 5 issues flagged',
      type: 'transform'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const getActionIcon = (type: AuditEntry['type']) => {
    switch(type) {
      case 'file':
        return <FileText className="h-4 w-4" />;
      case 'transform':
        return <Code className="h-4 w-4" />;
      case 'export':
        return <FileOutput className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-80 sm:w-96 bg-background border-l border-border shadow-lg z-20 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-semibold">Audit Trail</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="text-sm font-medium text-muted-foreground">Source Data Traceability</div>
          
          {auditTrail.map((entry, index) => (
            <div key={entry.id} className="relative">
              {index !== 0 && <Separator className="absolute left-3.5 -top-4 h-4 w-px bg-border" />}
              <div className="flex gap-3">
                <div className={`mt-1 h-7 w-7 rounded-full flex items-center justify-center 
                  ${entry.type === 'file' 
                    ? 'bg-blue-100 text-blue-700' 
                    : entry.type === 'transform'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-green-100 text-green-700'}`}>
                  {getActionIcon(entry.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{entry.action}</p>
                    <time className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</time>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{entry.sourceFile}</p>
                  <p className="text-xs mt-1">{entry.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" size="sm">
          Export Full Audit Trail
        </Button>
      </div>
    </div>
  );
};

export default AuditTrail;
