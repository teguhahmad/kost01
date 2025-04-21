import React, { useState } from 'react';
import { format } from 'date-fns';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Bell, CheckCircle, AlertTriangle, Clock, Settings } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'maintenance' | 'system' | 'tenant';
  priority: 'high' | 'normal' | 'low';
  date: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'Overdue Payment',
    message: 'Room 201 payment is overdue by 5 days',
    type: 'payment',
    priority: 'high',
    date: '2024-03-15T10:00:00',
    read: false
  },
  {
    id: '2',
    title: 'Maintenance Request Update',
    message: 'AC repair in Room 103 has been completed',
    type: 'maintenance',
    priority: 'normal',
    date: '2024-03-15T09:30:00',
    read: false
  },
  {
    id: '3',
    title: 'New Tenant Check-in',
    message: 'New tenant will be checking in to Room 302 tomorrow',
    type: 'tenant',
    priority: 'normal',
    date: '2024-03-15T08:45:00',
    read: true
  },
  {
    id: '4',
    title: 'System Maintenance',
    message: 'System will undergo maintenance tonight at 00:00',
    type: 'system',
    priority: 'low',
    date: '2024-03-14T20:00:00',
    read: true
  }
];

const Notifications: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <AlertTriangle className="text-red-500" size={20} />;
      case 'maintenance':
        return <Clock className="text-blue-500" size={20} />;
      case 'system':
        return <Settings className="text-gray-500" size={20} />;
      case 'tenant':
        return <Bell className="text-green-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (showUnreadOnly && notification.read) return false;
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <Button variant="outline" size="sm" icon={<CheckCircle size={16} />}>
          Mark All as Read
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Recent Notifications</h2>
            <Badge className="bg-blue-100 text-blue-800">
              {notifications.filter(n => !n.read).length} New
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'payment' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('payment')}
            >
              Payments
            </Button>
            <Button 
              variant={filter === 'maintenance' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('maintenance')}
            >
              Maintenance
            </Button>
            <Button 
              variant={filter === 'tenant' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('tenant')}
            >
              Tenants
            </Button>
            <Button 
              variant={filter === 'system' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setFilter('system')}
            >
              System
            </Button>
          </div>
        </CardHeader>

        <div className="px-6 pb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">Show unread only</span>
          </label>
        </div>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{notification.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      </div>
                      <Badge className={getNotificationColor(notification.priority)}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {format(new Date(notification.date), 'MMM d, yyyy HH:mm')}
                      </span>
                      {!notification.read && (
                        <Button variant="outline" size="sm">
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;