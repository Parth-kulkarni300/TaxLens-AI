'use client'

import { useState } from 'react'
import {
  AlertTriangle, ArrowDownRight, ArrowUpRight, Bell, Bot, Check, ChevronDown,
  CircleHelp, FileCheck2, FileSearch, FileText, Home, Inbox, LayoutDashboard,
  LifeBuoy, Menu, MessageSquare, MoreHorizontal, Paperclip, Plus, Search,
  Settings, ShieldCheck, Sparkles, Upload, X, Zap, Send, Download, Share2,
  ClipboardCheck, Landmark, History, SlidersHorizontal, Mic, ChevronRight,
  Edit3, CheckCircle2, ArrowRight, RefreshCw, Copy, ExternalLink, HelpCircle
} from 'lucide-react'

interface Invoice {
  no: string
  supplier: string
  gstin: string
  date: string
  total: string
  status: 'red' | 'yellow' | 'green'
  pos?: string
}

const initialInvoices: Invoice[] = [
  { no: 'INV-2026-089', supplier: 'Rajesh Electronics Mumbai', gstin: '27AABCR4567K1Z5', date: '28 Oct 2026', total: '₹58,880.00', status: 'red', pos: '27-Maharashtra' },
  { no: 'INV-2026-088', supplier: 'Shree Ganesh Textiles', gstin: '24AACFS2189P1Z2', date: '27 Oct 2026', total: '₹1,24,500.00', status: 'green', pos: '24-Gujarat' },
  { no: 'INV-2026-087', supplier: 'Patel Packaging Works', gstin: '27AAEFP9021C1Z8', date: '26 Oct 2026', total: '₹32,860.00', status: 'yellow', pos: '27-Maharashtra' },
  { no: 'INV-2026-086', supplier: 'Omkar Stationery Mart', gstin: '27AAGFO7112D1Z0', date: '24 Oct 2026', total: '₹18,240.00', status: 'green', pos: '27-Maharashtra' },
  { no: 'INV-2026-085', supplier: 'Bharat Hardware & Tools', gstin: '27AAAFB8830E1Z6', date: '23 Oct 2026', total: '₹76,410.00', status: 'green', pos: '27-Maharashtra' },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Audit new invoice', icon: Upload },
  { label: 'Audit results', icon: ClipboardCheck },
  { label: 'GST assistant', icon: Bot },
  { label: 'Invoice history', icon: History },
]

function StatusBadge({ status }: { status: string }) {
  const data = status === 'red' 
    ? { label: 'Discrepancy detected', cls: 'status-red', icon: AlertTriangle } 
    : status === 'yellow' 
    ? { label: 'Review required', cls: 'status-yellow', icon: AlertTriangle } 
    : { label: 'Verified clean', cls: 'status-green', icon: Check }
  const Icon = data.icon
  return <span className={`status ${data.cls}`}><Icon />{data.label}</span>
}

function StatCard({ label, value, sub, tone, icon: Icon }: any) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className={`stat-icon ${tone}`}><Icon /></span>
        <MoreHorizontal className="muted-icon" />
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-sub ${tone === 'danger' ? 'danger-text' : tone === 'warning' ? 'warning-text' : 'positive-text'}`}>
        {tone === 'danger' ? <ArrowDownRight /> : <ArrowUpRight />}
        {sub}
      </div>
    </div>
  )
}

function Sidebar({ active, setActive, collapsed, setCollapsed }: any) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><ShieldCheck /></div>
        {!collapsed && (
          <div>
            <strong>TaxLens<span> AI</span></strong>
            <small>GST intelligence</small>
          </div>
        )}
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
          <Menu />
        </button>
      </div>

      <div className="workspace">
        {!collapsed && (
          <>
            <div className="workspace-label">WORKSPACE</div>
            <div className="workspace-switch">
              <div className="store-avatar">KG</div>
              <div>
                <strong>Sharma General Stores</strong>
                <small>MSME · Maharashtra</small>
              </div>
              <ChevronDown />
            </div>
          </>
        )}
      </div>

      <nav>
        {navItems.map(({ label, icon: Icon }) => (
          <button 
            key={label} 
            className={`nav-item ${active === label ? 'active' : ''}`} 
            onClick={() => setActive(label)} 
            title={label}
          >
            <Icon />
            {!collapsed && <span>{label}</span>}
            {label === 'Audit results' && !collapsed && <span className="nav-count">2</span>}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><LifeBuoy /></div>
            <strong>Need a hand?</strong>
            <p>Ask our GST expert anything.</p>
            <button onClick={() => setActive('GST assistant')}>Open AI assistant <ChevronRight /></button>
          </div>
          <button className="nav-item"><Settings /><span>Settings</span></button>
          <div className="user-row">
            <div className="user-avatar">AK</div>
            <div><strong>Aditya Sharma</strong><small>Owner</small></div>
            <MoreHorizontal />
          </div>
        </div>
      )}
    </aside>
  )
}

function Header({ active, searchQuery, setSearchQuery }: { active: string; searchQuery: string; setSearchQuery: (q: string) => void }) {
  return (
    <header className="topbar">
      <div>
        <div className="crumb">Workspace <ChevronRight /> <strong>{active}</strong></div>
        <h1>{active === 'Dashboard' ? 'Good morning, Aditya' : active}</h1>
      </div>
      <div className="header-actions">
        <div className="search">
          <Search />
          <input 
            placeholder="Search invoices, suppliers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <span className="fy-badge">FY 2026–27 <ChevronDown /></span>
        <button className="icon-btn" aria-label="Notifications"><Bell /><i /></button>
        <div className="top-avatar">AK</div>
      </div>
    </header>
  )
}

function Dashboard({ go }: { go: (x: string) => void }) {
  return (
    <div className="page-content">
      <div className="welcome-row">
        <p>Here&apos;s what&apos;s happening with your GST audits.</p>
        <div className="state-select"><Landmark /> Maharashtra (27) <ChevronDown /></div>
      </div>
      
      <div className="stats-grid">
        <StatCard label="Total invoices audited" value="142" sub="12% this month" tone="primary" icon={FileCheck2} />
        <StatCard label="Verified clean" value="118" sub="83% of all invoices" tone="success" icon={Check} />
        <StatCard label="Flagged discrepancies" value="16" sub="Potential savings: ₹34,820" tone="danger" icon={AlertTriangle} />
        <StatCard label="Needs manual review" value="8" sub="5.6% of all invoices" tone="warning" icon={CircleHelp} />
      </div>

      <div className="quick-actions">
        <span>Quick actions</span>
        <button className="primary-btn" onClick={() => go('Audit new invoice')}><Upload /> Audit new invoice</button>
        <button onClick={() => go('GST assistant')}><Bot /> Ask GST AI agent</button>
        <button onClick={() => go('GST assistant')}><FileText /> Explain GST circular</button>
      </div>

      <div className="analytics-grid">
        <div className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>Audit activity</h2>
              <p>Monthly audited invoices & discrepancy rate</p>
            </div>
            <button className="select-btn">Last 6 months <ChevronDown /></button>
          </div>
          <div className="chart-legend">
            <span><i className="blue-dot" />Invoices audited</span>
            <span><i className="amber-dot" />Discrepancy rate</span>
          </div>
          <div className="bar-chart">
            {[38,52,43,68,57,82].map((h,i) => (
              <div className="bar-group" key={i}>
                <div className="bar" style={{height:`${h}%`}}>
                  <span>{[18,27,22,34,29,42][i]}</span>
                </div>
                <small>{['May','Jun','Jul','Aug','Sep','Oct'][i]}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="panel donut-panel">
          <div className="panel-head">
            <div>
              <h2>Discrepancy breakdown</h2>
              <p>16 flagged invoices</p>
            </div>
            <button className="more-btn"><MoreHorizontal /></button>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div><strong>16</strong><small>flagged</small></div>
            </div>
            <div className="legend">
              <span><i style={{background:'#2563eb'}} />Rate mismatch <b>45%</b></span>
              <span><i style={{background:'#14b8a6'}} />IGST error <b>30%</b></span>
              <span><i style={{background:'#f59e0b'}} />Calculation mismatch <b>15%</b></span>
              <span><i style={{background:'#e2e8f0'}} />Invalid HSN <b>10%</b></span>
            </div>
          </div>
        </div>
      </div>

      <div className="panel invoice-panel">
        <div className="panel-head">
          <div>
            <h2>Recent invoices</h2>
            <p>Your latest GST audit activity</p>
          </div>
          <button className="outline-btn" onClick={() => go('Invoice history')}>View all invoices <ChevronRight /></button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice number</th>
                <th>Supplier</th>
                <th>GSTIN</th>
                <th>Date</th>
                <th>Total amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialInvoices.map(inv => (
                <tr key={inv.no}>
                  <td><strong>{inv.no}</strong></td>
                  <td>{inv.supplier}</td>
                  <td className="mono">{inv.gstin}</td>
                  <td>{inv.date}</td>
                  <td><strong>{inv.total}</strong></td>
                  <td><StatusBadge status={inv.status} /></td>
                  <td>
                    <button className="row-action" onClick={() => go(inv.status === 'red' ? 'Audit results' : 'Invoice history')}>
                      View audit <ChevronRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function UploadView({ go }: { go: (x: string) => void }) {
  const [step, setStep] = useState<'upload' | 'review'>('upload')
  const [isProcessing, setIsProcessing] = useState(false)
  const [items, setItems] = useState([
    { id: 1, desc: 'Computer Monitors 24" LED', hsn: '8471', qty: 10, rate: 4600, taxable: 46000, gstRate: 28, cgst: 6440, sgst: 6440, igst: 0, total: 58880 },
    { id: 2, desc: 'USB Optical Mouse Ergonomic', hsn: '8471', qty: 20, rate: 500, taxable: 10000, gstRate: 18, cgst: 900, sgst: 900, igst: 0, total: 11800 },
  ])

  const handleLoadSample = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setStep('review')
    }, 600)
  }

  return (
    <div className="page-content upload-page">
      <div className="intro">
        <p>Upload an invoice and let TaxLens extract, verify, and audit every tax charge.</p>
      </div>

      {step === 'upload' ? (
        <>
          <div className="upload-grid">
            <div className="panel upload-card">
              <div className="upload-icon"><Upload /></div>
              <h2>Drop your invoice here</h2>
              <p>PDF, PNG, or JPG up to 10MB</p>
              
              <button className="primary-btn" onClick={handleLoadSample} disabled={isProcessing}>
                {isProcessing ? <RefreshCw className="animate-spin" /> : <Upload />} 
                {isProcessing ? 'Processing OCR...' : 'Choose file or drag here'}
              </button>
              
              <div className="or"><span />or<span /></div>
              
              <button className="text-btn" onClick={handleLoadSample}>
                <FileText /> Paste raw invoice text
              </button>
              
              <div className="sample" onClick={handleLoadSample} style={{cursor: 'pointer'}}>
                <Sparkles />
                <div>
                  <strong>Try a sample discrepancy invoice</strong>
                  <small>Inter-state hardware invoice with wrong 28% GST rate (#INV-2026-089)</small>
                </div>
                <ChevronRight />
              </div>
            </div>

            <div className="panel steps-card">
              <div className="panel-head">
                <div>
                  <h2>How it works</h2>
                  <p>From invoice to insight in seconds.</p>
                </div>
              </div>
              {[
                ['1','Reading invoice text','OCR extracts every line item & header'],
                ['2','Parsing GSTIN details','Validates seller, buyer & state code'],
                ['3','Extracting line items','Matches HSN database & applicable tax slabs'],
                ['4','Running deep audit','Deterministic tax recalculation & discrepancy check'],
              ].map(([n,t,s],i)=>(
                <div className={`step ${i===0?'done':''}`} key={n}>
                  <span>{i===0?<Check />:n}</span>
                  <div>
                    <strong>{t}</strong>
                    <small>{s}</small>
                  </div>
                  {i===0&&<span className="step-check"><Check /></span>}
                </div>
              ))}
            </div>
          </div>

          <div className="tip">
            <Zap /> 
            <span><strong>Pro tip:</strong> Clear, well-lit invoice scans give the most accurate extraction. You can review and correct all values before auditing.</span>
          </div>
          
          <button className="ghost-link" onClick={() => go('Audit results')}>
            Preview sample audit result directly <ChevronRight />
          </button>
        </>
      ) : (
        /* Step 2: OCR Extraction Review & Editable Table */
        <div className="panel" style={{marginTop: 10, padding: 22}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
            <div>
              <span className="status status-green" style={{marginBottom: 6, display: 'inline-flex'}}>
                <CheckCircle2 style={{width: 12, height: 12}} /> OCR Extraction Successful (Confidence: 97.4%)
              </span>
              <h2 style={{fontSize: 16, margin: '4px 0'}}>Review & Correct Extracted Invoice Data</h2>
              <p style={{color: '#64748b', fontSize: 11, margin: 0}}>Verify line items and tax heads before running the deterministic GST audit.</p>
            </div>
            <div style={{display: 'flex', gap: 8}}>
              <button className="outline-btn" onClick={() => setStep('upload')}>
                Upload different file
              </button>
              <button className="primary-btn" onClick={() => go('Audit results')}>
                <Sparkles /> Run Deep GST Audit →
              </button>
            </div>
          </div>

          {/* Header Metadata Cards */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20}}>
            <div style={{background: '#f8fafc', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0'}}>
              <small style={{color: '#94a3b8', fontSize: 10}}>Seller Name & GSTIN</small>
              <strong style={{display: 'block', fontSize: 12, marginTop: 2}}>Rajesh Electronics Mumbai</strong>
              <span className="mono" style={{color: '#2563eb', fontSize: 10}}>27AABCR4567K1Z5 (MH)</span>
            </div>
            <div style={{background: '#f8fafc', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0'}}>
              <small style={{color: '#94a3b8', fontSize: 10}}>Buyer Name & GSTIN</small>
              <strong style={{display: 'block', fontSize: 12, marginTop: 2}}>Sharma General Stores</strong>
              <span className="mono" style={{color: '#2563eb', fontSize: 10}}>27AAACS1234D1Z9 (MH)</span>
            </div>
            <div style={{background: '#f8fafc', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0'}}>
              <small style={{color: '#94a3b8', fontSize: 10}}>Invoice No & Date</small>
              <strong style={{display: 'block', fontSize: 12, marginTop: 2}}>INV-2026-089</strong>
              <span style={{color: '#64748b', fontSize: 10}}>28 Oct 2026</span>
            </div>
            <div style={{background: '#f8fafc', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0'}}>
              <small style={{color: '#94a3b8', fontSize: 10}}>Place of Supply & Supply Type</small>
              <strong style={{display: 'block', fontSize: 12, marginTop: 2}}>Gujarat (24) → Maharashtra (27)</strong>
              <span className="status status-yellow" style={{fontSize: 9, padding: '2px 5px', marginTop: 3}}>Inter-state Supply (IGST)</span>
            </div>
          </div>

          {/* Editable Line Items Table */}
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Description</th>
                  <th>HSN Code</th>
                  <th>Qty</th>
                  <th>Unit Rate (₹)</th>
                  <th>Taxable Value (₹)</th>
                  <th>GST Rate</th>
                  <th>CGST (₹)</th>
                  <th>SGST (₹)</th>
                  <th>Item Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={it.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <input 
                        type="text" 
                        value={it.desc} 
                        onChange={(e) => {
                          const n = [...items]
                          n[idx].desc = e.target.value
                          setItems(n)
                        }}
                        style={{border: '1px solid #cbd5e1', borderRadius: 4, padding: '4px 6px', width: '100%', fontSize: 10}}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        value={it.hsn} 
                        onChange={(e) => {
                          const n = [...items]
                          n[idx].hsn = e.target.value
                          setItems(n)
                        }}
                        className="mono"
                        style={{border: '1px solid #cbd5e1', borderRadius: 4, padding: '4px 6px', width: 65, fontSize: 10}}
                      />
                    </td>
                    <td>{it.qty}</td>
                    <td>₹{it.rate.toLocaleString('en-IN')}</td>
                    <td><strong>₹{it.taxable.toLocaleString('en-IN')}</strong></td>
                    <td>
                      <span className="tax-pill" style={{background: it.gstRate === 28 ? '#fee2e2' : '#e0f2fe', color: it.gstRate === 28 ? '#b91c1c' : '#0369a1'}}>
                        {it.gstRate}%
                      </span>
                    </td>
                    <td>₹{it.cgst.toLocaleString('en-IN')}</td>
                    <td>₹{it.sgst.toLocaleString('en-IN')}</td>
                    <td><strong>₹{it.total.toLocaleString('en-IN')}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10}}>
            <button className="outline-btn" onClick={() => setStep('upload')}>Cancel</button>
            <button className="primary-btn" onClick={() => go('Audit results')}>
              <Sparkles /> Proceed with Audit Findings →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AuditResults({ go }: { go: (x: string) => void }) {
  const [copiedShare, setCopiedShare] = useState(false)

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `TaxLens Audit Report for Invoice #INV-2026-089\nSupplier: Rajesh Electronics Mumbai\nExpected: ₹54,280.00 | Invoiced: ₹58,880.00\nDiscrepancy: +₹4,600.00 overcharged due to 28% GST on HSN 8471 (Applicable rate: 18%) and CGST/SGST charged on inter-state supply instead of IGST.`
    )
    setCopiedShare(true)
    setTimeout(() => setCopiedShare(false), 2500)
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="page-content audit-page">
      <div className="audit-banner">
        <div className="alert-symbol"><AlertTriangle /></div>
        <div className="banner-copy">
          <div className="banner-title">
            <span className="red-label">RED</span>
            <h2>2 discrepancies detected</h2>
          </div>
          <p>We found issues that resulted in an overcharge on this invoice.</p>
          <div className="amount-row">
            <span>Expected total <strong>₹54,280.00</strong></span>
            <ChevronRight className="amount-arrow" />
            <span>Invoiced total <strong>₹58,880.00</strong></span>
            <em>+₹4,600.00 overcharged</em>
          </div>
        </div>
        <div className="banner-actions">
          <button className="outline-light" onClick={handleDownload} title="Print or save as PDF">
            <Download /> Download report
          </button>
          <button className="outline-light" onClick={handleShare}>
            {copiedShare ? <Check /> : <Share2 />} 
            {copiedShare ? 'Copied summary!' : 'Share with supplier'}
          </button>
        </div>
      </div>

      <div className="audit-columns">
        <div className="discrepancies">
          <div className="section-heading">
            <div>
              <h2>Audit findings</h2>
              <p>Invoice <strong>#INV-2026-089</strong> · Rajesh Electronics Mumbai</p>
            </div>
            <button className="outline-btn">All findings <ChevronDown /></button>
          </div>

          {/* Finding 1: Rate Mismatch */}
          <div className="finding-card red-edge">
            <div className="finding-top">
              <span className="finding-number red-bg">01</span>
              <div>
                <h3>Rate mismatch on HSN 8471</h3>
                <p>Computer monitors · 10 units</p>
              </div>
              <span className="status status-red">Discrepancy</span>
            </div>
            <div className="finding-grid">
              <div>
                <small>Invoiced rate</small>
                <strong className="red-text">28%</strong>
              </div>
              <div>
                <small>Reference GST rate</small>
                <strong className="green-text">18%</strong>
              </div>
              <div>
                <small>Tax impact</small>
                <strong>₹4,600.00 extra</strong>
              </div>
            </div>
            <div className="recommendation">
              <Sparkles />
              <div>
                <strong>Recommended action</strong>
                <p>Request an amended credit note or revised invoice under Section 34 of the CGST Act.</p>
              </div>
            </div>
            <button className="finding-link" onClick={() => go('GST assistant')}>
              View CBIC Notification No. 14/2019 reference <ChevronRight />
            </button>
          </div>

          {/* Finding 2: Tax Type Error */}
          <div className="finding-card yellow-edge">
            <div className="finding-top">
              <span className="finding-number yellow-bg">02</span>
              <div>
                <h3>Tax type error: IGST vs CGST/SGST</h3>
                <p>Place of supply: Maharashtra (27) · Seller: Gujarat (24)</p>
              </div>
              <span className="status status-yellow">Review required</span>
            </div>
            <div className="tax-compare">
              <div>
                <small>Charged on invoice</small>
                <strong>
                  <span className="tax-pill">CGST 14%</span>
                  <span className="tax-pill">SGST 14%</span>
                </strong>
              </div>
              <ChevronRight />
              <div>
                <small>Should be charged</small>
                <strong>
                  <span className="tax-pill blue-pill">IGST 18%</span>
                </strong>
              </div>
            </div>
            <div className="recommendation" style={{marginTop: 14, background: '#fffbeb', color: '#b45309'}}>
              <Zap />
              <div>
                <strong>Inter-state supply rule</strong>
                <p style={{color: '#92400e'}}>
                  Under Section 7(1) of the IGST Act, cross-border state transactions require Integrated GST (IGST). Incorrectly claiming CGST/SGST input tax credit may lead to ITC reversals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Agent />
      </div>
    </div>
  )
}

function Agent() {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'Why did you flag the rate on computer monitors?'
    },
    {
      sender: 'ai',
      text: 'HSN 8471 covers computer monitors. Under Notification No. 14/2019–Central Tax, the applicable GST rate is 18%, not the 28% charged on this invoice.',
      formula: 'Taxable value: ₹46,000.00\nCorrect GST (18%): ₹8,280.00\nCharged GST (28%): ₹12,880.00\nDifference: ₹4,600.00 overcharged',
      note: 'Dear Rajesh Electronics,\nRegarding Invoice #INV-2026-089 dated 28 Oct 2026: computer monitors under HSN 8471 attract 18% GST as per CBIC Notification 14/2019. Please issue a credit note for the ₹4,600 excess tax charged.'
    }
  ])
  const [input, setInput] = useState('')
  const [copiedNote, setCopiedNote] = useState(false)

  const ask = (q: string) => {
    let reply = ''
    let formula: string | undefined = undefined
    let note: string | undefined = undefined

    if (q.includes('difference') || q.includes('calculation')) {
      reply = 'Here is the exact calculation of the overcharge on Invoice #INV-2026-089:'
      formula = 'Taxable base: ₹46,000.00\nCharged rate (28%): ₹12,880.00\nStatutory rate (18%): ₹8,280.00\nNet overcharged tax: ₹4,600.00'
    } else if (q.includes('draft') || q.includes('supplier')) {
      reply = 'Here is a formal rectification request you can send via WhatsApp or email to Rajesh Electronics:'
      note = 'Dear Rajesh Electronics Team,\n\nWe audited Invoice #INV-2026-089 (Dated 28-10-2026). Kindly note that HSN 8471 (Monitors) was billed at 28% instead of the prescribed 18% GST (CBIC Notif 14/2019). Additionally, since this is an interstate supply from Gujarat to Maharashtra, IGST applies instead of CGST/SGST.\n\nPlease provide an amended credit note of ₹4,600 at your earliest convenience.'
    } else if (q.includes('IGST') || q.includes('tax head')) {
      reply = 'Because the supplier is registered in Gujarat (State Code 24) and the place of supply is Maharashtra (State Code 27), this is an inter-state supply. Under Section 5 of the IGST Act, 2017, IGST must be levied. Charging CGST + SGST creates an ineligible input tax credit under GSTR-2B.'
    } else {
      reply = `Regarding your query "${q}": The invoice #INV-2026-089 has both a rate discrepancy (18% vs 28%) and a tax head mismatch (CGST+SGST instead of IGST). We recommend contacting the vendor before filing GSTR-3B.`
    }

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: q },
      { sender: 'ai', text: reply, formula, note }
    ])
    setInput('')
  }

  const handleCopyNote = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedNote(true)
    setTimeout(() => setCopiedNote(false), 2000)
  }

  return (
    <div className="agent panel">
      <div className="agent-head">
        <div className="agent-avatar"><Bot /></div>
        <div>
          <h2>TaxLens AI Auditor</h2>
          <p>Context: Invoice #INV-2026-089 <span><i /> Online</span></p>
        </div>
        <MoreHorizontal />
      </div>

      <div className="chat" style={{maxHeight: 460, overflowY: 'auto'}}>
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-bubble ${m.sender === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
            {m.sender === 'ai' && (
              <div className="ai-label">
                <Sparkles /> TaxLens AI
              </div>
            )}
            <p style={{margin: '4px 0'}}>{m.text}</p>
            {m.formula && (
              <div className="formula" style={{whiteSpace: 'pre-line', margin: '8px 0'}}>
                {m.formula}
              </div>
            )}
            {m.note && (
              <div style={{marginTop: 8}}>
                <button 
                  className="copy-note" 
                  onClick={() => handleCopyNote(m.note!)}
                  style={{display: 'inline-flex', alignItems: 'center', gap: 4}}
                >
                  <ClipboardCheck /> {copiedNote ? 'Copied to clipboard!' : 'Copy supplier message'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="suggestions">
        <span>Suggested questions</span>
        {[
          'Calculate the exact tax difference',
          'Draft a supplier message',
          'What is the IGST rule here?',
        ].map(q => (
          <button key={q} onClick={() => ask(q)}>{q}</button>
        ))}
      </div>

      <form 
        className="chat-input"
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) ask(input.trim())
        }}
      >
        <input 
          placeholder="Ask anything about this audit..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" aria-label="Send message"><Send /></button>
      </form>
    </div>
  )
}

function Assistant() {
  const [selectedDoc, setSelectedDoc] = useState('04/2026')

  return (
    <div className="page-content assistant-page">
      <div className="assistant-hero">
        <div className="hero-icon"><Bot /></div>
        <div>
          <p className="eyebrow">COMPLIANCE ASSISTANT & CIRCULAR EXPLAINER</p>
          <h2>GST clarity, without the jargon.</h2>
          <p>Upload a circular or ask compliance questions. Get plain-language advice built for small Indian shopkeepers.</p>
        </div>
      </div>

      <div className="assistant-grid">
        <div className="panel circular-card">
          <div className="panel-head">
            <div>
              <h2><FileText /> Official GST circular explainer</h2>
              <p>Turn legal notifications into clear merchant actions.</p>
            </div>
            <button className="more-btn"><MoreHorizontal /></button>
          </div>

          <div className="circular-upload">
            <Upload />
            <strong>Drop a CBIC notification or circular PDF here</strong>
            <span>PDF or paste circular notification text</span>
            <button className="outline-btn" onClick={() => setSelectedDoc('04/2026')}>Select sample document</button>
          </div>

          <div style={{marginTop: 16}}>
            <small style={{color: '#94a3b8', fontSize: 10, display: 'block', marginBottom: 6}}>LOADED NOTIFICATION</small>
            <div className="loaded-doc">
              <FileCheck2 />
              <div>
                <strong>CBIC Notification No. 04/2026 – Central Tax</strong>
                <small>Rationalization of GST Rates on Electronic Components & Hardware</small>
              </div>
              <Check />
            </div>
          </div>
        </div>

        <div className="panel explainer">
          <div className="panel-head">
            <div>
              <h2>In plain language</h2>
              <p>What this notification means for your shop</p>
            </div>
            <span className="effective">Effective 1 Apr 2026</span>
          </div>

          <ul>
            <li>
              <Check /> GST on select computer peripherals and electrical assemblies moves from 18% to 12%.
            </li>
            <li>
              <Check /> Applies to local retailers, wholesalers, and electronics distributors.
            </li>
            <li>
              <Check /> Prevents inverted duty structure for small manufacturers and assembler shops.
            </li>
          </ul>

          <div className="action-required">
            <strong><Zap /> Action required for your business</strong>
            <p>Update your billing software / POS HSN tax slab for Chapter 84 & 85 from <b>18% to 12%</b> before the 1st April cutoff.</p>
          </div>

          <div className="tag-row">
            <span>Retailers</span>
            <span>Wholesalers</span>
            <span>Hardware dealers</span>
            <span>MSME Kirana</span>
          </div>
        </div>
      </div>

      {/* Compliance FAQ Section */}
      <div className="panel" style={{marginTop: 18}}>
        <div className="panel-head" style={{marginBottom: 14}}>
          <div>
            <h2><HelpCircle style={{width: 15, height: 15, color: '#2563eb'}} /> Frequently Asked GST Compliance Questions</h2>
            <p>Simple answers to everyday tax queries for Indian merchants.</p>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14}}>
          <div style={{background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0'}}>
            <strong style={{fontSize: 12, display: 'block', marginBottom: 5}}>What is GSTR-1 vs GSTR-3B?</strong>
            <p style={{fontSize: 10, color: '#64748b', margin: 0, lineHeight: 1.5}}>
              <strong>GSTR-1</strong> is a statement of your outward sales (who you sold to and how much GST you collected). <strong>GSTR-3B</strong> is the monthly self-declaration summary where you actually pay tax after deducting Input Tax Credit (ITC).
            </p>
          </div>

          <div style={{background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0'}}>
            <strong style={{fontSize: 12, display: 'block', marginBottom: 5}}>When is e-Invoicing mandatory?</strong>
            <p style={{fontSize: 10, color: '#64748b', margin: 0, lineHeight: 1.5}}>
              e-Invoicing applies to B2B businesses whose aggregate turnover exceeds ₹5 Crores in any preceding financial year. For retail B2C transactions of ordinary shopkeepers, standard tax invoices remain sufficient.
            </p>
          </div>

          <div style={{background: '#f8fafc', padding: 14, borderRadius: 8, border: '1px solid #e2e8f0'}}>
            <strong style={{fontSize: 12, display: 'block', marginBottom: 5}}>How to handle invoice errors?</strong>
            <p style={{fontSize: 10, color: '#64748b', margin: 0, lineHeight: 1.5}}>
              Under Section 34 of the CGST Act, if excess tax was charged or goods were returned, the seller must issue a <strong>Credit Note</strong> linked to the original invoice, which reduces both parties&apos; tax liability.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InvoiceHistoryView({ go }: { go: (x: string) => void }) {
  const [filter, setFilter] = useState<'all' | 'clean' | 'yellow' | 'red'>('all')
  const [query, setQuery] = useState('')

  const filtered = initialInvoices.filter(inv => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'clean' ? inv.status === 'green' :
      filter === 'yellow' ? inv.status === 'yellow' :
      inv.status === 'red'
    const matchesQuery = 
      inv.no.toLowerCase().includes(query.toLowerCase()) ||
      inv.supplier.toLowerCase().includes(query.toLowerCase()) ||
      inv.gstin.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  })

  return (
    <div className="page-content">
      <div className="welcome-row">
        <div>
          <h2 style={{fontSize: 17, margin: '0 0 4px'}}>Invoice History & Audit Archive</h2>
          <p>Access and review all historical invoice audits, discrepancies, and supplier records.</p>
        </div>
        <button className="primary-btn" onClick={() => go('Audit new invoice')}>
          <Upload /> Audit New Invoice
        </button>
      </div>

      <div className="panel invoice-panel">
        <div className="panel-head" style={{paddingBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10}}>
          <div style={{display: 'flex', gap: 6}}>
            <button 
              className={`select-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              style={{background: filter === 'all' ? '#eff6ff' : 'white', borderColor: filter === 'all' ? '#2563eb' : '#e2e8f0', color: filter === 'all' ? '#2563eb' : '#64748b'}}
            >
              All Invoices (5)
            </button>
            <button 
              className="select-btn"
              onClick={() => setFilter('clean')}
              style={{background: filter === 'clean' ? '#ecfdf5' : 'white', borderColor: filter === 'clean' ? '#059669' : '#e2e8f0', color: filter === 'clean' ? '#059669' : '#64748b'}}
            >
              Verified Clean (3)
            </button>
            <button 
              className="select-btn"
              onClick={() => setFilter('red')}
              style={{background: filter === 'red' ? '#fff1f2' : 'white', borderColor: filter === 'red' ? '#e11d48' : '#e2e8f0', color: filter === 'red' ? '#e11d48' : '#64748b'}}
            >
              Discrepancies (1)
            </button>
            <button 
              className="select-btn"
              onClick={() => setFilter('yellow')}
              style={{background: filter === 'yellow' ? '#fffbeb' : 'white', borderColor: filter === 'yellow' ? '#d97706' : '#e2e8f0', color: filter === 'yellow' ? '#d97706' : '#64748b'}}
            >
              Review Required (1)
            </button>
          </div>

          <div className="search" style={{width: 220}}>
            <Search />
            <input 
              placeholder="Filter by invoice, supplier..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Supplier</th>
                <th>Supplier GSTIN</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Place of Supply</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.no}>
                  <td><strong>{inv.no}</strong></td>
                  <td>{inv.supplier}</td>
                  <td className="mono">{inv.gstin}</td>
                  <td>{inv.date}</td>
                  <td><strong>{inv.total}</strong></td>
                  <td>{inv.pos || '27-Maharashtra'}</td>
                  <td><StatusBadge status={inv.status} /></td>
                  <td>
                    <button 
                      className="row-action" 
                      onClick={() => go('Audit results')}
                    >
                      View Report <ChevronRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState('Dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const content = 
    active === 'Dashboard' ? <Dashboard go={setActive} /> :
    active === 'Audit new invoice' ? <UploadView go={setActive} /> :
    active === 'Audit results' ? <AuditResults go={setActive} /> :
    active === 'GST assistant' ? <Assistant /> :
    active === 'Invoice history' ? <InvoiceHistoryView go={setActive} /> :
    <Dashboard go={setActive} />

  return (
    <div className="app-shell">
      <Sidebar 
        active={active} 
        setActive={setActive} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />
      <main className="main">
        <Header 
          active={active} 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {content}
      </main>
    </div>
  )
}
