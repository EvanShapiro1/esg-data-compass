
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, Database, Cloud, Link, FileCheck, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DataSource {
  id: string;
  name: string;
  type: 'file' | 'database' | 'cloud' | 'api';
  description: string;
  icon: React.ReactNode;
}

const DataUpload = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const { toast } = useToast();
  
  const dataSources: DataSource[] = [
    {
      id: 'energy-consumption',
      name: 'Energy Consumption Data',
      type: 'database',
      description: 'Annual energy usage by property and type',
      icon: <Database className="h-10 w-10 text-blue-500" />
    },
    {
      id: 'water-usage',
      name: 'Water Usage Metrics',
      type: 'cloud',
      description: 'Quarterly water consumption records',
      icon: <Cloud className="h-10 w-10 text-sky-500" />
    },
    {
      id: 'waste-management',
      name: 'Waste Management Reports',
      type: 'file',
      description: 'Waste disposal and recycling data',
      icon: <FileSpreadsheet className="h-10 w-10 text-green-500" />
    },
    {
      id: 'carbon-footprint',
      name: 'Carbon Footprint Analysis',
      type: 'api',
      description: 'CO2 emissions by facility and activity',
      icon: <Link className="h-10 w-10 text-purple-500" />
    },
    {
      id: 'sustainability-reports',
      name: 'Sustainability Reports',
      type: 'file',
      description: 'Annual sustainability PDF reports',
      icon: <FileText className="h-10 w-10 text-red-500" />
    }
  ];

  const toggleSourceSelection = (id: string) => {
    setSelectedSources(prev => {
      if (prev.includes(id)) {
        return prev.filter(sourceId => sourceId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const processSelectedSources = () => {
    if (selectedSources.length === 0) {
      toast({
        title: "No sources selected",
        description: "Please select at least one data source to process",
        variant: "destructive"
      });
      return;
    }
    
    // Create mock files to maintain compatibility with existing code
    const mockFiles = selectedSources.map(id => {
      const source = dataSources.find(s => s.id === id)!;
      // Create a mock File object
      return new File(
        ["mock content"], 
        `${source.name}.${source.type === 'file' ? (source.name.includes('PDF') ? 'pdf' : 'xlsx') : 'json'}`,
        { type: source.type === 'file' ? (source.name.includes('PDF') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') : 'application/json' }
      );
    });
    
    onUpload(mockFiles);
    
    toast({
      title: "Processing started",
      description: `${selectedSources.length} data source(s) selected for analysis`,
      variant: "default"
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Sources</CardTitle>
        <CardDescription>
          Select ESG data sources to process for GRESB mapping
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dataSources.map(source => (
            <div 
              key={source.id}
              className={`p-4 border rounded-md transition-all cursor-pointer flex items-center gap-4 hover:bg-muted/50 ${
                selectedSources.includes(source.id) ? 'border-primary bg-muted/50' : 'border-border'
              }`}
              onClick={() => toggleSourceSelection(source.id)}
            >
              <div className="flex-shrink-0">
                {source.icon}
              </div>
              <div className="flex-grow">
                <h4 className="text-base font-medium">{source.name}</h4>
                <p className="text-sm text-muted-foreground">{source.description}</p>
              </div>
              {selectedSources.includes(source.id) && (
                <div className="flex-shrink-0 text-primary">
                  <FileCheck className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedSources.length > 0 ? (
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm font-medium">
              {selectedSources.length} source{selectedSources.length !== 1 ? 's' : ''} selected
            </p>
            <Button 
              onClick={processSelectedSources}
              className="flex items-center"
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Process Sources
            </Button>
          </div>
        ) : (
          <Alert className="mt-4">
            <FileText className="h-4 w-4" />
            <AlertTitle>No data sources selected</AlertTitle>
            <AlertDescription>
              Select one or more ESG data sources to begin the AI-powered GRESB mapping process.
            </AlertDescription>
          </Alert>
        )}

        <Button 
          variant="outline" 
          className="w-full mt-4 flex items-center justify-center text-muted-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Data Source
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataUpload;
