
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BarChart3, Database, FileText, Settings, User } from "lucide-react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('data');
  
  const navItems = [
    { id: 'data', label: 'Data', icon: <Database size={16} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> }
  ];

  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <div className="text-primary font-semibold text-2xl mr-10 flex items-center">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-2">
              <span className="font-bold">G</span>
            </div>
            GRESB Mapper
          </div>
          <nav className="flex space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "secondary" : "ghost"}
                className={`flex items-center px-3 py-2 text-sm font-medium ${
                  activeTab === item.id 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            Help
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
