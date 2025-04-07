
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, AlertCircle, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface MappingField {
  id: string;
  sourceField: string;
  sourceFile: string;
  targetField: string;
  targetCategory: string;
  status: 'success' | 'warning' | 'error';
  statusMessage?: string;
}

interface MappingPreviewProps {
  isComplete: boolean;
}

const MappingPreview = ({ isComplete }: MappingPreviewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - in a real application, this would come from your state management
  const mockMappings: MappingField[] = [
    {
      id: '1',
      sourceField: 'Total Energy Consumption (kWh)',
      sourceFile: 'energy_data_2024.xlsx',
      targetField: 'Energy-Int',
      targetCategory: 'Energy',
      status: 'success',
    },
    {
      id: '2',
      sourceField: 'Scope 1 GHG Emissions',
      sourceFile: 'emissions_report.pdf',
      targetField: 'GHG-Dir-Abs',
      targetCategory: 'GHG Emissions',
      status: 'success',
    },
    {
      id: '3',
      sourceField: 'Water Usage (m³)',
      sourceFile: 'water_consumption.csv',
      targetField: 'Water-Abs',
      targetCategory: 'Water',
      status: 'success',
    },
    {
      id: '4',
      sourceField: 'Waste to Landfill (tonnes)',
      sourceFile: 'waste_management.xlsx',
      targetField: 'Waste-Abs',
      targetCategory: 'Waste',
      status: 'warning',
      statusMessage: 'Units need conversion',
    },
    {
      id: '5',
      sourceField: 'Renewable Energy Production',
      sourceFile: 'energy_data_2024.xlsx',
      targetField: 'Energy-Renewable',
      targetCategory: 'Energy',
      status: 'error',
      statusMessage: 'Missing measurement unit',
    },
    {
      id: '6',
      sourceField: 'Building Certification Type',
      sourceFile: 'certifications.pdf',
      targetField: 'Cert-Tot',
      targetCategory: 'Building Certifications',
      status: 'success',
    },
    {
      id: '7',
      sourceField: 'Scope 2 GHG Emissions',
      sourceFile: 'emissions_report.pdf',
      targetField: 'GHG-Indir-Abs',
      targetCategory: 'GHG Emissions',
      status: 'warning',
      statusMessage: 'Verification needed',
    },
    {
      id: '8',
      sourceField: 'Recycled Waste (tonnes)',
      sourceFile: 'waste_management.xlsx',
      targetField: 'Waste-Recycled',
      targetCategory: 'Waste',
      status: 'success',
    },
  ];

  const getStatusIcon = (status: MappingField['status']) => {
    switch(status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const filteredMappings = mockMappings.filter(mapping => 
    mapping.sourceField.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.targetField.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapping.targetCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = {
    success: mockMappings.filter(m => m.status === 'success').length,
    warning: mockMappings.filter(m => m.status === 'warning').length,
    error: mockMappings.filter(m => m.status === 'error').length
  };

  if (!isComplete) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>GRESB Mapping Preview</CardTitle>
        <CardDescription>
          View how your data is mapped to GRESB schema fields
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all" className="text-xs">All Mappings ({mockMappings.length})</TabsTrigger>
              <TabsTrigger value="success" className="text-xs">Matched ({statusCounts.success})</TabsTrigger>
              <TabsTrigger value="issues" className="text-xs">Issues ({statusCounts.warning + statusCounts.error})</TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search fields..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="all">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Source Field</TableHead>
                    <TableHead>Source File</TableHead>
                    <TableHead>GRESB Field</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings.length > 0 ? (
                    filteredMappings.map((mapping) => (
                      <TableRow key={mapping.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(mapping.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{mapping.sourceField}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{mapping.sourceFile}</TableCell>
                        <TableCell>{mapping.targetField}</TableCell>
                        <TableCell>{mapping.targetCategory}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No matching fields found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="success">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Source Field</TableHead>
                    <TableHead>Source File</TableHead>
                    <TableHead>GRESB Field</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings
                    .filter(mapping => mapping.status === 'success')
                    .map((mapping) => (
                      <TableRow key={mapping.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(mapping.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{mapping.sourceField}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{mapping.sourceFile}</TableCell>
                        <TableCell>{mapping.targetField}</TableCell>
                        <TableCell>{mapping.targetCategory}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="issues">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Source Field</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>GRESB Field</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMappings
                    .filter(mapping => mapping.status === 'warning' || mapping.status === 'error')
                    .map((mapping) => (
                      <TableRow key={mapping.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(mapping.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{mapping.sourceField}</TableCell>
                        <TableCell className="text-sm">
                          <span className={`${mapping.status === 'error' ? 'text-destructive' : 'text-warning'}`}>
                            {mapping.statusMessage}
                          </span>
                        </TableCell>
                        <TableCell>{mapping.targetField}</TableCell>
                        <TableCell>{mapping.targetCategory}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Fix</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MappingPreview;
