import React, { useState } from 'react';

export default function Dashboard({ currentUser, onLogout }) {
  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample clients list
  const [clientsList] = useState([
    { id: 'CL-101', name: 'Czone Technologies', code: 'CZ-001', acFileRef: 'AC_CZONE_01', status: 'Linked' },
    { id: 'CL-102', name: 'Acme Global Tech', code: 'AC-002', acFileRef: 'AC_ACME_02', status: 'Linked' },
    { id: 'CL-103', name: 'Global Logistics', code: 'GL-003', acFileRef: 'AC_GL_03', status: 'Pending' },
  ]);

  // Summary cards data
  const summaryCards = [
    { title: 'Sale Overview', value: 'PKR 1,250,000', count: '48 Invoices', key: 'sale', color: '#2563eb', bg: '#eff6ff' },
    { title: 'Sales Return', value: 'PKR 45,000', count: '3 Credit Notes', key: 'return', color: '#dc2626', bg: '#fef2f2' },
    { title: 'Quotations / Estimate', value: 'PKR 680,000', count: '12 Active', key: 'estimate', color: '#d97706', bg: '#fffbeb' },
    { title: 'Purchases', value: 'PKR 890,000', count: '18 POs', key: 'purchase', color: '#059669', bg: '#ecfdf5' },
    { title: 'General Ledger', value: 'PKR 3,120,000', count: 'Acfile Live', key: 'ledger', color: '#7c3aed', bg: '#f5f3ff' },
    { title: 'Trial Balance', value: 'Balanced (0.00 Diff)', count: 'Trans / Invdet', key: 'trial', color: '#0891b2', bg: '#ecfeff' },
  ];

  // Check if any client matches the search query
  const isClientSearched = searchQuery.trim().length > 0;
  const filteredClients = clientsList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif', color: '#0f172a' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '250px', backgroundColor: '#0f172a', color: '#f8fafc', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '24px', borderBottom: '1px solid #1e293b', marginBottom: '16px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>NL</div>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>NexusLedger</h2>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>ERP Sync Dashboard</span>
          </div>
        </div>

        {[
          { name: 'Dashboard Home', key: 'dashboard', icon: '📊' },
          { name: 'Sales', key: 'sale', icon: '📈' },
          { name: 'Returns', key: 'return', icon: '🔄' },
          { name: 'Estimates', key: 'estimate', icon: '📝' },
          { name: 'Purchases', key: 'purchase', icon: '🛍️' },
          { name: 'Ledger Accounts', key: 'ledger', icon: '📖' },
          { name: 'Trial Balance', key: 'trial', icon: '⚖️' },
          { name: 'Clients Directory', key: 'clients', icon: '👥' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activePage === item.key ? '#2563eb' : 'transparent',
              color: activePage === item.key ? '#ffffff' : '#94a3b8',
              fontWeight: activePage === item.key ? '600' : '400',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '13px',
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        
        {/* TOP NAVBAR WITH CLIENT SEARCH */}
        <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: '340px' }}>
            <input
              type="text"
              placeholder="🔍 Search by Client Name or Account ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
              <span style={{ display: 'block', fontSize: '13px', fontWeight: '600' }}>{currentUser?.email || 'admin@nexus.com'}</span>
              <span style={{ fontSize: '10px', fontWeight: '700', color: '#2563eb', textTransform: 'uppercase' }}>{currentUser?.role || 'Super Admin'}</span>
            </div>

            <button onClick={onLogout} style={{ padding: '8px 12px', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </header>

        {/* VIEW PAGES CONTENT */}
        <main style={{ padding: '32px', maxWidth: '1400px', width: '100%', boxSizing: 'border-box' }}>
          
          {activePage === 'dashboard' && (
            <div>
              {/* CONDITIONAL RENDERING: AGAR CLIENT SEARCH NAHI KIYA TOH HIDE RAHEGA */}
              {!isClientSearched ? (
                <div style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '12px', 
                  border: '1px solid #e2e8f0', 
                  padding: '60px 20px', 
                  textAlign: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>No Client Searched</h3>
                  <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
                    Please search for a client name or account ID in the top search bar to view financial records, summary cards, and ERP data.
                  </p>
                </div>
              ) : (
                /* JAB CLIENT SEARCH HOJAYEGA TOH SAARA DATA SHOW HOGA */
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 6px 0' }}>
                      ERP Financial & Inventory Overview <span style={{ fontSize: '14px', color: '#2563eb', fontWeight: 'normal' }}>(Filtered for: "{searchQuery}")</span>
                    </h2>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Live metrics synced from Acfile, Inventory, Invdet, Invsumm, and Trans files.</p>
                  </div>

                  {/* 6 SUMMARY CARDS GRID */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                    {summaryCards.map((card) => (
                      <div
                        key={card.key}
                        style={{
                          backgroundColor: card.bg,
                          border: `1px solid ${card.color}30`,
                          borderRadius: '12px',
                          padding: '20px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                      >
                        <span style={{ fontSize: '12px', fontWeight: '600', color: card.color }}>{card.title}</span>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '8px 0 4px 0', color: '#0f172a' }}>{card.value}</h3>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{card.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* SEARCHED CLIENTS MATCHING TABLE */}
                  <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Matching Client Records</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
                          <th style={{ padding: '12px' }}>Client ID</th>
                          <th style={{ padding: '12px' }}>Client Name</th>
                          <th style={{ padding: '12px' }}>Account Code</th>
                          <th style={{ padding: '12px' }}>Linked Acfile Ref</th>
                          <th style={{ padding: '12px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClients.length > 0 ? (
                          filteredClients.map((c) => (
                            <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '12px', fontWeight: '600' }}>{c.id}</td>
                              <td style={{ padding: '12px' }}>{c.name}</td>
                              <td style={{ padding: '12px' }}>{c.code}</td>
                              <td style={{ padding: '12px', color: '#64748b' }}>{c.acFileRef}</td>
                              <td style={{ padding: '12px' }}>
                                <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '700', backgroundColor: '#dcfce7', color: '#15803d' }}>
                                  {c.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" style={{ padding: '16px', textAlign: 'center', color: '#64748b' }}>
                              No client found matching "{searchQuery}"
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OTHER SUB-PAGES */}
          {activePage !== 'dashboard' && (
            <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', textTransform: 'capitalize' }}>{activePage} Management Page</h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '8px' }}>
                Viewing detailed records for <strong>{activePage.toUpperCase()}</strong> synced from local ERP files.
              </p>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}