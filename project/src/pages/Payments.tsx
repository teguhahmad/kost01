import React from 'react';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { payments, tenants, rooms } from '../data/mockData';
import { formatCurrency, formatDate, getPaymentStatusColor } from '../utils/formatters';
import { Plus, Search, Filter, Download, Calendar, ArrowDownUp } from 'lucide-react';

const Payments: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  
  // Find tenant and room data for each payment
  const enhancedPayments = payments.map(payment => {
    const tenant = tenants.find(t => t.id === payment.tenantId);
    const room = rooms.find(r => r.id === payment.roomId);
    
    return {
      ...payment,
      tenantName: tenant ? tenant.name : 'Unknown',
      roomNumber: room ? room.number : 'Unknown'
    };
  });
  
  // Filter payments based on search query and status filter
  const filteredPayments = enhancedPayments.filter(payment => {
    const matchesSearch = 
      payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.roomNumber.includes(searchQuery);
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && payment.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Payment Records</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <Button icon={<Plus size={16} />}>
              Record Payment
            </Button>
          </div>
        </CardHeader>

        <div className="px-6 pb-2 flex flex-wrap justify-between">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={statusFilter === 'all' ? 'primary' : 'outline'} 
              size="sm" 
              onClick={() => setStatusFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={statusFilter === 'paid' ? 'primary' : 'outline'} 
              size="sm" 
              onClick={() => setStatusFilter('paid')}
            >
              Paid
            </Button>
            <Button 
              variant={statusFilter === 'pending' ? 'primary' : 'outline'} 
              size="sm" 
              onClick={() => setStatusFilter('pending')}
            >
              Pending
            </Button>
            <Button 
              variant={statusFilter === 'overdue' ? 'primary' : 'outline'} 
              size="sm" 
              onClick={() => setStatusFilter('overdue')}
            >
              Overdue
            </Button>
          </div>
          
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" icon={<Calendar size={16} />}>
              Date Range
            </Button>
            <Button variant="outline" size="sm" icon={<Download size={16} />}>
              Export
            </Button>
          </div>
        </div>
        
        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Tenant
                    <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Room
                    <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Amount
                    <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Due Date
                    <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center cursor-pointer hover:text-gray-700">
                    Payment Date
                    <ArrowDownUp size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{payment.tenantName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">Room {payment.roomNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{formatDate(payment.dueDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{payment.date ? formatDate(payment.date) : '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {payment.status === 'pending' || payment.status === 'overdue' ? (
                        <Button
                          variant="success"
                          size="sm"
                        >
                          Record Payment
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Details
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No payment records found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;