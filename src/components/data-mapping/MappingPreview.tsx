
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, AlertCircle, HelpCircle, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface MappingField {
  id: string;
  assetId: string;
  assetName: string;
  country: string;
  buildingType: string;
  month: string;
  grossInternalArea: string;
  electricityConsumption: string;
  fuelConsumption: string;
  districtHeating: string;
  renewableEnergy: string;
  scope1Emissions: string;
  scope2Emissions: string;
  waterConsumption: string;
  waterSourceType: string;
  totalWaste: string;
  recycledWaste: string;
  landfillWaste: string;
  dataSource: string;
  dataCoverage: string;
  greenBuildingCert: string;
  certificationExpiry: string;
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
      assetId: 'A001',
      assetName: 'Office Tower A',
      country: 'United Kingdom',
      buildingType: 'Office',
      month: 'Jan-2024',
      grossInternalArea: '15,000',
      electricityConsumption: '120,000',
      fuelConsumption: '45,000',
      districtHeating: '0',
      renewableEnergy: '25,000',
      scope1Emissions: '8.2',
      scope2Emissions: '32.4',
      waterConsumption: '1,200',
      waterSourceType: 'Municipal',
      totalWaste: '24.5',
      recycledWaste: '18.2',
      landfillWaste: '6.3',
      dataSource: 'energy_data_2024.xlsx',
      dataCoverage: '95%',
      greenBuildingCert: 'BREEAM Excellent',
      certificationExpiry: '2026-05-15',
      frameworkType: 'GRESB',
      status: 'success',
    },
    {
      id: '2',
      assetId: 'A002',
      assetName: 'Retail Park B',
      country: 'France',
      buildingType: 'Retail',
      month: 'Jan-2024',
      grossInternalArea: '8,500',
      electricityConsumption: '95,000',
      fuelConsumption: '32,000',
      districtHeating: '12,000',
      renewableEnergy: '8,000',
      scope1Emissions: '6.1',
      scope2Emissions: '25.3',
      waterConsumption: '950',
      waterSourceType: 'Municipal',
      totalWaste: '18.7',
      recycledWaste: '12.5',
      landfillWaste: '6.2',
      dataSource: 'emissions_report.pdf',
      dataCoverage: '92%',
      greenBuildingCert: 'HQE',
      certificationExpiry: '2025-08-22',
      frameworkType: 'GRESB',
      status: 'warning',
      statusMessage: 'Units need conversion',
    },
    {
      id: '3',
      assetId: 'A003',
      assetName: 'Logistics Center C',
      country: 'Germany',
      buildingType: 'Industrial',
      month: 'Jan-2024',
      grossInternalArea: '22,000',
      electricityConsumption: '180,000',
      fuelConsumption: '55,000',
      districtHeating: '25,000',
      renewableEnergy: '32,000',
      scope1Emissions: '10.5',
      scope2Emissions: '42.7',
      waterConsumption: '820',
      waterSourceType: 'Groundwater',
      totalWaste: '32.1',
      recycledWaste: '25.8',
      landfillWaste: '6.3',
      dataSource: 'water_consumption.csv',
      dataCoverage: '98%',
      greenBuildingCert: 'DGNB Gold',
      certificationExpiry: '2027-03-10',
      frameworkType: 'SFDR',
      status: 'error',
      statusMessage: 'Missing measurement unit',
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
      mapping.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.buildingType.toLowerCase().includes(searchTerm.toLowerCase())
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
            <div className="flex gap-2 items-center">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3.5 w-3.5" />
                Export Data
              </Button>
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
          </div>
          
          <TabsContent value="all">
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Asset ID</TableHead>
                    <TableHead className="whitespace-nowrap">Asset Name</TableHead>
                    <TableHead className="whitespace-nowrap">Country</TableHead>
                    <TableHead className="whitespace-nowrap">Building Type</TableHead>
                    <TableHead className="whitespace-nowrap">Month</TableHead>
                    <TableHead className="whitespace-nowrap">Gross Internal Area (m²)</TableHead>
                    <TableHead className="whitespace-nowrap">Electricity (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Fuel (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">District Heating (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Renewable Energy (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Scope 1 (tCO₂e)</TableHead>
                    <TableHead className="whitespace-nowrap">Scope 2 (tCO₂e)</TableHead>
                    <TableHead className="whitespace-nowrap">Water (m³)</TableHead>
                    <TableHead className="whitespace-nowrap">Water Source</TableHead>
                    <TableHead className="whitespace-nowrap">Total Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Recycled Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Landfill Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Data Source</TableHead>
                    <TableHead className="whitespace-nowrap">Coverage (%)</TableHead>
                    <TableHead className="whitespace-nowrap">Green Building Cert.</TableHead>
                    <TableHead className="whitespace-nowrap">Cert. Expiry Date</TableHead>
                    <TableHead className="whitespace-nowrap">Framework</TableHead>
                    <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
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
                        <TableCell className="whitespace-nowrap">{mapping.assetId}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.assetName}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.country}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.buildingType}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.month}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.grossInternalArea}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.electricityConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.fuelConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.districtHeating}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.renewableEnergy}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.scope1Emissions}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.scope2Emissions}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.waterConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.waterSourceType}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.totalWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.recycledWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.landfillWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.dataSource}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.dataCoverage}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.greenBuildingCert}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.certificationExpiry}</TableCell>
                        <TableCell>{getFrameworkBadge(mapping.frameworkType)}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={23} className="text-center py-4 text-muted-foreground">
                        No matching fields found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="success">
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Asset ID</TableHead>
                    <TableHead className="whitespace-nowrap">Asset Name</TableHead>
                    <TableHead className="whitespace-nowrap">Country</TableHead>
                    <TableHead className="whitespace-nowrap">Building Type</TableHead>
                    <TableHead className="whitespace-nowrap">Month</TableHead>
                    <TableHead className="whitespace-nowrap">Gross Internal Area (m²)</TableHead>
                    <TableHead className="whitespace-nowrap">Electricity (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Fuel (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">District Heating (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Renewable Energy (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Scope 1 (tCO₂e)</TableHead>
                    <TableHead className="whitespace-nowrap">Scope 2 (tCO₂e)</TableHead>
                    <TableHead className="whitespace-nowrap">Water (m³)</TableHead>
                    <TableHead className="whitespace-nowrap">Water Source</TableHead>
                    <TableHead className="whitespace-nowrap">Total Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Recycled Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Landfill Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Data Source</TableHead>
                    <TableHead className="whitespace-nowrap">Coverage (%)</TableHead>
                    <TableHead className="whitespace-nowrap">Green Building Cert.</TableHead>
                    <TableHead className="whitespace-nowrap">Cert. Expiry Date</TableHead>
                    <TableHead className="whitespace-nowrap">Framework</TableHead>
                    <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
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
                        <TableCell className="whitespace-nowrap">{mapping.assetId}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.assetName}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.country}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.buildingType}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.month}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.grossInternalArea}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.electricityConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.fuelConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.districtHeating}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.renewableEnergy}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.scope1Emissions}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.scope2Emissions}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.waterConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.waterSourceType}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.totalWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.recycledWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.landfillWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.dataSource}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.dataCoverage}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.greenBuildingCert}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.certificationExpiry}</TableCell>
                        <TableCell>{getFrameworkBadge(mapping.frameworkType)}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
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
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Asset ID</TableHead>
                    <TableHead className="whitespace-nowrap">Asset Name</TableHead>
                    <TableHead className="whitespace-nowrap">Country</TableHead>
                    <TableHead className="whitespace-nowrap">Issue</TableHead>
                    <TableHead className="whitespace-nowrap">Month</TableHead>
                    <TableHead className="whitespace-nowrap">Gross Internal Area (m²)</TableHead>
                    <TableHead className="whitespace-nowrap">Electricity (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Fuel (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">District Heating (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Renewable Energy (kWh)</TableHead>
                    <TableHead className="whitespace-nowrap">Scope 1 (tCO₂e)</TableHead>
                    <TableHead className="whitespace-nowrap">Scope 2 (tCO₂e)</TableHead>
                    <TableHead className="whitespace-nowrap">Water (m³)</TableHead>
                    <TableHead className="whitespace-nowrap">Water Source</TableHead>
                    <TableHead className="whitespace-nowrap">Total Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Recycled Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Landfill Waste (tonnes)</TableHead>
                    <TableHead className="whitespace-nowrap">Data Source</TableHead>
                    <TableHead className="whitespace-nowrap">Coverage (%)</TableHead>
                    <TableHead className="whitespace-nowrap">Green Building Cert.</TableHead>
                    <TableHead className="whitespace-nowrap">Cert. Expiry Date</TableHead>
                    <TableHead className="whitespace-nowrap">Framework</TableHead>
                    <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
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
                        <TableCell className="whitespace-nowrap">{mapping.assetId}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.assetName}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.country}</TableCell>
                        <TableCell className="whitespace-nowrap text-sm">
                          <span className={`${mapping.status === 'error' ? 'text-destructive' : 'text-amber-600'}`}>
                            {mapping.statusMessage}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.month}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.grossInternalArea}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.electricityConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.fuelConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.districtHeating}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.renewableEnergy}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.scope1Emissions}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.scope2Emissions}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.waterConsumption}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.waterSourceType}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.totalWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.recycledWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.landfillWaste}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.dataSource}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.dataCoverage}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.greenBuildingCert}</TableCell>
                        <TableCell className="whitespace-nowrap">{mapping.certificationExpiry}</TableCell>
                        <TableCell>{getFrameworkBadge(mapping.frameworkType)}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
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

