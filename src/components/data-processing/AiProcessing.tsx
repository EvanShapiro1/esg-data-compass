
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Braces, Cable, FileSearch, LineChart, Server } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  status: 'waiting' | 'processing' | 'complete' | 'error';
}

interface AiProcessingProps {
  files: File[];
  isProcessing: boolean;
  currentStep: number;
  processingProgress: number;
}

const AiProcessing = ({ files, isProcessing, currentStep, processingProgress }: AiProcessingProps) => {
  const steps: ProcessingStep[] = [
    {
      id: 'extract',
      title: 'Data Extraction',
      description: 'Extracting structured data from your files',
      icon: <FileSearch className="h-5 w-5" />,
      progress: currentStep >= 0 ? (currentStep === 0 ? processingProgress : 100) : 0,
      status: 
        currentStep > 0 ? 'complete' : 
        currentStep === 0 ? 'processing' : 'waiting'
    },
    {
      id: 'analyze',
      title: 'Data Analysis',
      description: 'Analyzing and categorizing ESG metrics',
      icon: <LineChart className="h-5 w-5" />,
      progress: currentStep >= 1 ? (currentStep === 1 ? processingProgress : 100) : 0,
      status: 
        currentStep > 1 ? 'complete' : 
        currentStep === 1 ? 'processing' : 'waiting'
    },
    {
      id: 'schema',
      title: 'Schema Mapping',
      description: 'Mapping to GRESB schema',
      icon: <Braces className="h-5 w-5" />,
      progress: currentStep >= 2 ? (currentStep === 2 ? processingProgress : 100) : 0,
      status: 
        currentStep > 2 ? 'complete' : 
        currentStep === 2 ? 'processing' : 'waiting'
    },
    {
      id: 'validation',
      title: 'Data Validation',
      description: 'Validating against GRESB requirements',
      icon: <Cable className="h-5 w-5" />,
      progress: currentStep >= 3 ? (currentStep === 3 ? processingProgress : 100) : 0,
      status: 
        currentStep === 4 ? 'complete' : 
        currentStep === 3 ? 'processing' : 'waiting'
    }
  ];

  const getStatusClass = (status: ProcessingStep['status']) => {
    switch(status) {
      case 'complete':
        return 'text-success';
      case 'processing':
        return 'text-primary animate-pulse';
      case 'error':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  if (!isProcessing && files.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="mr-2 h-5 w-5" />
          AI Processing
        </CardTitle>
        <CardDescription>
          {isProcessing 
            ? `Processing ${files.length} file${files.length !== 1 ? 's' : ''} with AI-powered data extraction`
            : 'Ready to process your ESG data files'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center">
                <div className={`mr-3 ${getStatusClass(step.status)}`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-medium">{step.title}</h4>
                    <span className="text-xs font-medium">
                      {step.status === 'complete' ? '100%' : step.status === 'processing' ? `${Math.round(step.progress)}%` : ''}
                    </span>
                  </div>
                  <Progress value={step.progress} className="h-1.5" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground pl-8">{step.description}</p>
            </div>
          ))}

          {isProcessing && currentStep === 3 && processingProgress > 90 && (
            <div className="text-sm text-success font-medium mt-4">
              Almost complete! Finalizing your GRESB mapping...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiProcessing;
