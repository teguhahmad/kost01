import React from 'react';
import { MaintenanceRequest, Room } from '../../types';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { formatDate, getMaintenancePriorityColor, getMaintenanceStatusColor } from '../../utils/formatters';
import { ChevronRight } from 'lucide-react';

interface MaintenanceOverviewProps {
  maintenanceRequests: MaintenanceRequest[];
  rooms: Room[];
  onViewAllClick: () => void;
}

const MaintenanceOverview: React.FC<MaintenanceOverviewProps> = ({ 
  maintenanceRequests, 
  rooms, 
  onViewAllClick 
}) => {
  // Get room number from room id
  const getRoomNumber = (roomId: string): string => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.number : 'Unknown';
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Maintenance Requests</h2>
        <span className="text-sm text-gray-500">Recent Issues</span>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {maintenanceRequests.map((request) => (
            <div key={request.id} className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{request.title}</h3>
                  <p className="text-sm text-gray-500">Room {getRoomNumber(request.roomId)}</p>
                </div>
                <Badge className={getMaintenancePriorityColor(request.priority)}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{request.description}</p>
              <div className="flex justify-between items-center">
                <Badge className={getMaintenanceStatusColor(request.status)}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ')}
                </Badge>
                <span className="text-xs text-gray-500">{formatDate(request.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full flex justify-center items-center" 
          onClick={onViewAllClick}
        >
          View All Requests
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceOverview;