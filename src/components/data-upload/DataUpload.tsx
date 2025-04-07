
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, Upload, X, FileCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'application/pdf':
      return <FileText className="h-10 w-10 text-red-500" />;
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'text/csv':
      return <FileSpreadsheet className="h-10 w-10 text-green-500" />;
    default:
      return <FileText className="h-10 w-10 text-gray-500" />;
  }
};

const DataUpload = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    // Filter for only allowed file types
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
    const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file format",
        description: "Only PDF, Excel, and CSV files are supported.",
        variant: "destructive"
      });
    }
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast({
        title: "Files added",
        description: `${validFiles.length} file(s) ready for processing`,
        variant: "default"
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const processFiles = () => {
    if (uploadedFiles.length === 0) return;
    
    onUpload(uploadedFiles);
    
    toast({
      title: "Processing started",
      description: `${uploadedFiles.length} file(s) sent for AI analysis`,
      variant: "default"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Upload</CardTitle>
        <CardDescription>
          Upload your ESG data files for AI processing and GRESB mapping
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`drag-drop-zone mb-4 ${isDragging ? 'active' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileSelect}
            className="sr-only"
            accept=".pdf,.csv,.xls,.xlsx"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-lg font-medium mb-1">Drag files here or click to browse</p>
            <p className="text-sm text-muted-foreground">
              Upload PDFs, spreadsheets, or CSVs with your ESG data
            </p>
          </label>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Uploaded Files ({uploadedFiles.length})</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto px-1 mb-4">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`} 
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                >
                  <div className="flex items-center">
                    <FileTypeIcon type={file.type} />
                    <div className="ml-3">
                      <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={processFiles}
                className="flex items-center"
              >
                <FileCheck className="mr-2 h-4 w-4" />
                Process Files
              </Button>
            </div>
          </div>
        )}
        
        {uploadedFiles.length === 0 && (
          <Alert className="mt-4">
            <FileText className="h-4 w-4" />
            <AlertTitle>No files uploaded</AlertTitle>
            <AlertDescription>
              Upload your ESG data files to begin the AI-powered GRESB mapping process.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default DataUpload;
