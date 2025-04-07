
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from "recharts";
import { Calendar, Download, Share2, ArrowUpRight } from "lucide-react";

const Analytics = () => {
  // Sample data for charts
  const emissionsData = [
    { name: 'Jan', amount: 12 },
    { name: 'Feb', amount: 19 },
    { name: 'Mar', amount: 15 },
    { name: 'Apr', amount: 8 },
    { name: 'May', amount: 15 },
    { name: 'Jun', amount: 20 },
  ];
  
  const energyData = [
    { name: 'Jan', consumption: 400 },
    { name: 'Feb', consumption: 380 },
    { name: 'Mar', consumption: 470 },
    { name: 'Apr', consumption: 520 },
    { name: 'May', consumption: 430 },
    { name: 'Jun', consumption: 400 },
  ];
  
  const resourceData = [
    { name: 'Energy', value: 40 },
    { name: 'Water', value: 25 },
    { name: 'Waste', value: 20 },
    { name: 'Transport', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar activeTabProp="analytics" />
      <div className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ESG Analytics</h1>
            <p className="text-gray-500 mt-1">Visualize and analyze your ESG data performance</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar size={16} />
              Last 6 Months
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Carbon Emissions</span>
                <ArrowUpRight size={18} className="text-green-500" />
              </CardTitle>
              <CardDescription>Metric tons of CO2e</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.2 tCO2e</div>
              <div className="text-sm text-green-600 font-medium">-12% from previous period</div>
              <div className="h-[180px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#0088FE" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Energy Consumption</span>
                <ArrowUpRight size={18} className="text-amber-500" />
              </CardTitle>
              <CardDescription>kWh per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">430 kWh</div>
              <div className="text-sm text-amber-600 font-medium">+2% from previous period</div>
              <div className="h-[180px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="consumption" 
                      stroke="#00C49F" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Resource Distribution</span>
                <Share2 size={16} className="text-gray-500" />
              </CardTitle>
              <CardDescription>By usage type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[210px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={resourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {resourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ESG Performance Trends</CardTitle>
            <CardDescription>Year-over-year comparison of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Environmental", current: 78, previous: 65 },
                    { name: "Social", current: 82, previous: 75 },
                    { name: "Governance", current: 90, previous: 85 },
                    { name: "Overall ESG", current: 83, previous: 75 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="previous" name="Previous Year" fill="#8884d8" />
                  <Bar dataKey="current" name="Current Year" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
