
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import DataUpload from "@/components/data-upload/DataUpload";
import AiProcessing from "@/components/data-processing/AiProcessing";
import MappingPreview from "@/components/data-mapping/MappingPreview";
import AuditTrail from "@/components/audit/AuditTrail";
import ExportActions from "@/components/actions/ExportActions";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    startProcessing();
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setProcessingProgress(0);
    setIsComplete(false);
    
    // Simulate processing steps
    simulateProcessing();
  };

  const simulateProcessing = () => {
    let step = 0;
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 5;
      
      if (progress > 100) {
        progress = 0;
        step += 1;
        
        if (step > 3) {
          clearInterval(interval);
          setIsComplete(true);
          setIsProcessing(false);
          
          toast({
            title: "Processing complete",
            description: "Your ESG data has been successfully mapped to GRESB schema",
            variant: "default",
          });
          
          return;
        }
        
        setCurrentStep(step);
      }
      
      setProcessingProgress(progress);
    }, 150);
  };

  const toggleAuditTrail = () => {
    setShowAuditTrail(!showAuditTrail);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar activeTabProp="data" />
      <div className="flex-1 container mx-auto py-6 px-4 relative">
        <div className="grid gap-6 md:gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <DataUpload onUpload={handleFileUpload} />
            <AiProcessing 
              files={files}
              isProcessing={isProcessing}
              currentStep={currentStep}
              processingProgress={processingProgress}
            />
          </div>
          
          <MappingPreview isComplete={isComplete} />
          
          <ExportActions 
            isComplete={isComplete} 
            onShowAudit={toggleAuditTrail} 
          />
        </div>
      </div>
      
      <AuditTrail 
        isVisible={showAuditTrail} 
        onClose={toggleAuditTrail} 
      />
    </div>
  );
};

export default Index;
