import React, { useState } from 'react';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { payments, rooms, tenants } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { Download, Calendar, Filter } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('6months');

  // Generate monthly data for the past 6 months
  const getMonthlyData = () => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      
      const monthPayments = payments.filter(payment => {
        const paymentDate = new Date(payment.date);
        return paymentDate >= start && paymentDate <= end;
      });

      const revenue = monthPayments.reduce((sum, payment) => {
        return payment.status === 'paid' ? sum + payment.amount : sum;
      }, 0);

      const pending = monthPayments.reduce((sum, payment) => {
        return payment.status === 'pending' ? sum + payment.amount : sum;
      }, 0);

      const overdue = monthPayments.reduce((sum, payment) => {
        return payment.status === 'overdue' ? sum + payment.amount : sum;
      }, 0);

      return {
        month: format(date, 'MMM yyyy'),
        revenue,
        pending,
        overdue,
        occupancyRate: Math.round((rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100)
      };
    }).reverse();

    return months;
  };

  const monthlyData = getMonthlyData();

  // Calculate summary statistics
  const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
  const averageRevenue = totalRevenue / monthlyData.length;
  const totalPending = payments.reduce((sum, payment) => 
    payment.status === 'pending' ? sum + payment.amount : sum, 0
  );
  const totalOverdue = payments.reduce((sum, payment) => 
    payment.status === 'overdue' ? sum + payment.amount : sum, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Calendar size={16} />}>
            Custom Date Range
          </Button>
          <Button variant="outline" size="sm" icon={<Download size={16} />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="p-6">
            <h3 className="text-sm font-medium text-blue-600">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-blue-900">{formatCurrency(totalRevenue)}</p>
            <p className="mt-1 text-sm text-blue-600">Past 6 months</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="p-6">
            <h3 className="text-sm font-medium text-green-600">Average Monthly Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-green-900">{formatCurrency(averageRevenue)}</p>
            <p className="mt-1 text-sm text-green-600">Per month</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="p-6">
            <h3 className="text-sm font-medium text-yellow-600">Pending Payments</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-900">{formatCurrency(totalPending)}</p>
            <p className="mt-1 text-sm text-yellow-600">Current month</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <div className="p-6">
            <h3 className="text-sm font-medium text-red-600">Overdue Payments</h3>
            <p className="mt-2 text-3xl font-bold text-red-900">{formatCurrency(totalOverdue)}</p>
            <p className="mt-1 text-sm text-red-600">Total outstanding</p>
          </div>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                  labelStyle={{ color: '#111827' }}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.375rem'
                  }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="pending" fill="#EAB308" name="Pending" />
                <Bar dataKey="overdue" fill="#EF4444" name="Overdue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Occupancy Rate Trend */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Occupancy Rate Trend</h2>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  labelStyle={{ color: '#111827' }}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.375rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="occupancyRate" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Occupancy Rate"
                  dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;