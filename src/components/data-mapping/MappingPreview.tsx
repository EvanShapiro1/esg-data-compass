
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, AlertCircle, HelpCircle, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface MappingField {
  id: string;
  sourceField: string;
  sourceFile: string;
  targetField: string;
  targetCategory: string;
  frameworkType: 'GRESB' | 'SFDR';
  status: 'success' | 'warning' | 'error';
  statusMessage?: string;
}

interface MappingPreviewProps {
  isComplete: boolean;
}

const MappingPreview = ({ isComplete }: MappingPreviewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [frameworkFilter, setFrameworkFilter] = useState<'all' | 'GRESB' | 'SFDR'>('all');
  
  // Mock data - in a real application, this would come from your state management
  const mockMappings: MappingField[] = [
    // GRESB mappings
    {
      id: '1',
      sourceField: 'Total Energy Consumption (kWh)',
      sourceFile: 'energy_data_2024.xlsx',
      targetField: 'Energy-Int',
      targetCategory: 'Energy',
      frameworkType: 'GRESB',
      status: 'success',
    },
    {
      id: '2',
      sourceField: 'Scope 1 GHG Emissions',
      sourceFile: 'emissions_report.pdf',
      targetField: 'GHG-Dir-Abs',
      targetCategory: 'GHG Emissions',
      frameworkType: 'GRESB',
      status: 'success',
    },
    {
      id: '3',
      sourceField: 'Water Usage (m³)',
      sourceFile: 'water_consumption.csv',
      targetField: 'Water-Abs',
      targetCategory: 'Water',
      frameworkType: 'GRESB',
      status: 'success',
    },
    {
      id: '4',
      sourceField: 'Waste to Landfill (tonnes)',
      sourceFile: 'waste_management.xlsx',
      targetField: 'Waste-Abs',
      targetCategory: 'Waste',
      frameworkType: 'GRESB',
      status: 'warning',
      statusMessage: 'Units need conversion',
    },
    // SFDR mappings
    {
      id: '5',
      sourceField: 'Renewable Energy Production',
      sourceFile: 'energy_data_2024.xlsx',
      targetField: 'E.1 - Renewable Energy Share',
      targetCategory: 'Climate and Environment',
      frameworkType: 'SFDR',
      status: 'error',
      statusMessage: 'Missing measurement unit',
    },
    {
      id: '6',
      sourceField: 'Building Certification Type',
      sourceFile: 'certifications.pdf',
      targetField: 'Cert-Tot',
      targetCategory: 'Building Certifications',
      frameworkType: 'GRESB',
      status: 'success',
    },
    {
      id: '7',
      sourceField: 'Scope 2 GHG Emissions',
      sourceFile: 'emissions_report.pdf',
      targetField: 'GHG-Indir-Abs',
      targetCategory: 'GHG Emissions',
      frameworkType: 'GRESB',
      status: 'warning',
      statusMessage: 'Verification needed',
    },
    {
      id: '8',
      sourceField: 'Recycled Waste (tonnes)',
      sourceFile: 'waste_management.xlsx',
      targetField: 'Waste-Recycled',
      targetCategory: 'Waste',
      frameworkType: 'GRESB',
      status: 'success',
    },
    // Additional SFDR mappings
    {
      id: '9',
      sourceField: 'Gender Pay Gap',
      sourceFile: 'hr_data.xlsx',
      targetField: 'S.1 - Gender Pay Gap',
      targetCategory: 'Social and Employee Matters',
      frameworkType: 'SFDR',
      status: 'success',
    },
    {
      id: '10',
      sourceField: 'Board Gender Diversity',
      sourceFile: 'governance_report.pdf',
      targetField: 'S.2 - Board Gender Diversity',
      targetCategory: 'Social and Employee Matters',
      frameworkType: 'SFDR',
      status: 'success',
    },
    {
      id: '11',
      sourceField: 'Human Rights Policy',
      sourceFile: 'policies.pdf',
      targetField: 'S.9 - Human Rights Policy',
      targetCategory: 'Social and Employee Matters',
      frameworkType: 'SFDR',
      status: 'warning',
      statusMessage: 'Policy needs updating',
    },
    {
      id: '12',
      sourceField: 'Anti-corruption Measures',
      sourceFile: 'governance_report.pdf',
      targetField: 'G.2 - Anti-corruption and Anti-bribery',
      targetCategory: 'Governance',
      frameworkType: 'SFDR',
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

  const filteredMappings = mockMappings.filter(mapping => (
    (frameworkFilter === 'all' || mapping.frameworkType === frameworkFilter) &&
    (
      mapping.sourceField.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.targetField.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.targetCategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ));

  const statusCounts = {
    success: filteredMappings.filter(m => m.status === 'success').length,
    warning: filteredMappings.filter(m => m.status === 'warning').length,
    error: filteredMappings.filter(m => m.status === 'error').length
  };

  const getFrameworkBadge = (framework: 'GRESB' | 'SFDR') => {
    return (
      <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full ${
        framework === 'GRESB' 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      }`}>
        {framework}
      </span>
    );
  };

  if (!isComplete) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ESG Framework Mapping</CardTitle>
        <CardDescription>
          View how your data is mapped to GRESB and SFDR schema fields
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <TabsList>
                <TabsTrigger value="all" className="text-xs">All Mappings ({mockMappings.length})</TabsTrigger>
                <TabsTrigger value="success" className="text-xs">Matched ({statusCounts.success})</TabsTrigger>
                <TabsTrigger value="issues" className="text-xs">Issues ({statusCounts.warning + statusCounts.error})</TabsTrigger>
              </TabsList>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setFrameworkFilter(frameworkFilter === 'all' ? 'GRESB' : frameworkFilter === 'GRESB' ? 'SFDR' : 'all')}
                className="ml-2 gap-1"
              >
                <Filter className="h-3.5 w-3.5" />
                {frameworkFilter === 'all' ? 'All Frameworks' : frameworkFilter}
              </Button>
            </div>
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
                    <TableHead>Target Field</TableHead>
                    <TableHead>Framework</TableHead>
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
                        <TableCell>{getFrameworkBadge(mapping.frameworkType)}</TableCell>
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
                      <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
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
                    <TableHead>Target Field</TableHead>
                    <TableHead>Framework</TableHead>
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
                        <TableCell>{getFrameworkBadge(mapping.frameworkType)}</TableCell>
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
                    <TableHead>Target Field</TableHead>
                    <TableHead>Framework</TableHead>
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
                        <TableCell>{getFrameworkBadge(mapping.frameworkType)}</TableCell>
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
