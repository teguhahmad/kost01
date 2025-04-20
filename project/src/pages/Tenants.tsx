import React, { useState } from 'react';
import TenantsList from '../components/tenants/TenantsList';
import { tenants } from '../data/mockData';

const Tenants: React.FC = () => {
  const [allTenants, setAllTenants] = useState(tenants);

  const handleAddTenant = () => {
    // In a real application, you would open a modal or navigate to a form
    alert('Open add tenant form');
  };

  const handleEditTenant = (id: string) => {
    // In a real application, you would open a modal or navigate to a form
    alert(`Edit tenant with ID: ${id}`);
  };

  const handleDeleteTenant = (id: string) => {
    // In a real application, you would show a confirmation dialog
    if (confirm('Are you sure you want to delete this tenant?')) {
      setAllTenants(allTenants.filter(tenant => tenant.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tenants</h1>
      <TenantsList
        tenants={allTenants}
        onAddTenant={handleAddTenant}
        onEditTenant={handleEditTenant}
        onDeleteTenant={handleDeleteTenant}
      />
    </div>
  );
};

export default Tenants;