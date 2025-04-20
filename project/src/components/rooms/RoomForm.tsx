import React from 'react';
import { Room } from '../../types';
import Button from '../ui/Button';
import { X } from 'lucide-react';

interface RoomFormProps {
  room?: Room;
  onSubmit: (data: Partial<Room>) => void;
  onClose: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSubmit, onClose }) => {
  const [formData, setFormData] = React.useState<Partial<Room>>({
    number: room?.number || '',
    floor: room?.floor || '',
    type: room?.type || 'single',
    price: room?.price || 0,
    status: room?.status || 'vacant',
    facilities: room?.facilities || []
  });

  const [facilityInput, setFacilityInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddFacility = () => {
    if (facilityInput.trim() && !formData.facilities?.includes(facilityInput.trim())) {
      setFormData(prev => ({
        ...prev,
        facilities: [...(prev.facilities || []), facilityInput.trim()]
      }));
      setFacilityInput('');
    }
  };

  const handleRemoveFacility = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities?.filter(f => f !== facility) || []
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {room ? 'Edit Room' : 'Add New Room'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Number
            </label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Floor
            </label>
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (per month)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="vacant">Vacant</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facilities
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={facilityInput}
                onChange={(e) => setFacilityInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add facility"
              />
              <Button type="button" onClick={handleAddFacility}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.facilities?.map((facility) => (
                <span
                  key={facility}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {facility}
                  <button
                    type="button"
                    onClick={() => handleRemoveFacility(facility)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {room ? 'Update Room' : 'Add Room'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;