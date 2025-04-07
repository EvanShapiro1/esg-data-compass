
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Filter, BarChart3, PieChart } from "lucide-react";

const Reports = () => {
  // Sample report data
  const recentReports = [
    { id: 1, name: "Q1 2025 ESG Summary", date: "Apr 1, 2025", type: "Quarterly", status: "Completed" },
    { id: 2, name: "GRESB Submission Report", date: "Mar 15, 2025", type: "Compliance", status: "Completed" },
    { id: 3, name: "Carbon Footprint Analysis", date: "Feb 28, 2025", type: "Analysis", status: "Completed" },
    { id: 4, name: "Water Usage Trends", date: "Jan 10, 2025", type: "Analysis", status: "Draft" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar activeTabProp="reports" />
      <div className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ESG Reports</h1>
            <p className="text-gray-500 mt-1">Access and generate standardized ESG reports</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <Button className="flex items-center gap-2">
              <FileText size={16} />
              New Report
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-900">Quick Reports</CardTitle>
              <CardDescription>Generate instant reports based on your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 size={16} className="mr-2 text-blue-600" />
                  Energy Consumption
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart size={16} className="mr-2 text-blue-600" />
                  Carbon Emissions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  GRESB Compliance
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Your most recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">View All Reports</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
