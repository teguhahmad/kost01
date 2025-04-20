import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import RoomForm from '../components/rooms/RoomForm';
import { Room } from '../types';
import { rooms as initialRooms } from '../data/mockData';
import { formatCurrency, getRoomStatusColor } from '../utils/formatters';
import { Plus, Search, Wifi, Droplet, Music, Tv, Wind } from 'lucide-react';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | undefined>();
  
  // Filter rooms based on search query and status filter
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.number.includes(searchQuery) || 
                         room.floor.includes(searchQuery);
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && room.status === filter;
  });

  // Get facility icon based on facility name
  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'wifi':
        return <Wifi size={16} />;
      case 'bathroom':
        return <Droplet size={16} />;
      case 'tv':
        return <Tv size={16} />;
      case 'ac':
        return <Wind size={16} />;
      default:
        return <Music size={16} />;
    }
  };

  const handleAddRoom = () => {
    setEditingRoom(undefined);
    setShowForm(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleFormSubmit = (data: Partial<Room>) => {
    if (editingRoom) {
      // Update existing room
      setRooms(rooms.map(room => 
        room.id === editingRoom.id ? { ...room, ...data } : room
      ));
    } else {
      // Add new room
      const newRoom: Room = {
        id: Math.random().toString(36).substr(2, 9),
        ...data as Omit<Room, 'id'>
      };
      setRooms([...rooms, newRoom]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Rooms</h1>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Room Management</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <Button icon={<Plus size={16} />} onClick={handleAddRoom}>
              Add Room
            </Button>
          </div>
        </CardHeader>

        <div className="px-6 pb-2 flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'occupied' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('occupied')}
          >
            Occupied
          </Button>
          <Button 
            variant={filter === 'vacant' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('vacant')}
          >
            Vacant
          </Button>
          <Button 
            variant={filter === 'maintenance' ? 'primary' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('maintenance')}
          >
            Maintenance
          </Button>
        </div>
        
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRooms.map((room) => (
              <div 
                key={room.id} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className={`h-2 ${
                    room.status === 'occupied' 
                      ? 'bg-blue-500' 
                      : room.status === 'vacant' 
                        ? 'bg-green-500' 
                        : 'bg-yellow-500'
                  }`}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">Room {room.number}</h3>
                      <p className="text-sm text-gray-500">Floor {room.floor}</p>
                    </div>
                    <Badge className={getRoomStatusColor(room.status)}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-gray-600">{room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room</p>
                    <p className="text-lg font-semibold text-blue-600">{formatCurrency(room.price)}/month</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {room.facilities.map((facility, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {getFacilityIcon(facility)}
                        {facility}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleEditRoom(room)}>
                      Edit
                    </Button>
                    <Button 
                      variant={room.status === 'occupied' ? 'secondary' : 'primary'} 
                      size="sm"
                    >
                      {room.status === 'occupied' ? 'View Tenant' : 'Assign Tenant'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <RoomForm
          room={editingRoom}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Rooms;