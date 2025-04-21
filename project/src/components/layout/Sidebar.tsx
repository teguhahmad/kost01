import React from 'react';
import { 
  Home, 
  Users, 
  DoorClosed, 
  CreditCard, 
  ClipboardList, 
  BarChart, 
  Settings, 
  Bell, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'tenants', label: 'Tenants', icon: <Users size={20} /> },
    { id: 'rooms', label: 'Rooms', icon: <DoorClosed size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
    { id: 'maintenance', label: 'Maintenance', icon: <ClipboardList size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-md fixed left-0 top-0 z-30">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">KostManager</h1>
      </div>
      
      <div className="py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onItemClick(item.id)}
                className={`w-full flex items-center px-6 py-3 text-sm ${
                  activeItem === item.id
                    ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="absolute bottom-0 w-full border-t border-gray-200">
        <button className="w-full flex items-center px-6 py-3 text-sm text-gray-600 hover:bg-gray-50">
          <span className="mr-3"><LogOut size={20} /></span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;