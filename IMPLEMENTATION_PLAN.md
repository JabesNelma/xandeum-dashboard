# Xandeum pNode Analytics Dashboard - Implementation Plan

## Current State Analysis
- ✅ Next.js project with TypeScript is already set up
- ✅ Basic dashboard structure exists with MetricCards, NodeTable, NodeCharts
- ❌ Missing typing effect in hero section
- ❌ Wrong 4th metric card (shows "Syncing" instead of "Healthy Index")
- ❌ Charts need both donut/pie and horizontal bar chart
- ❌ Missing footer component
- ❌ Data doesn't match example requirements (241 total, 65 active, 176 inactive)

## Required Updates

### 1. Hero Section Enhancement
- Add typing effect with rotating phrases:
  - "Monitor Your pNode Performance."
  - "Real-Time Network Analytics."
  - "The Storage Layer for Solana dApps."
  - "Live from the pRPC Gossip."
- Add "Last Updated: [Timestamp]" indicator
- Add "Refresh Data" button

### 2. Metric Cards Update
- Keep: Total Nodes, Active Nodes, Inactive Nodes
- Replace: Syncing Nodes → Healthy Index (calculated as percentage)

### 3. Charts Enhancement
- Chart 1: Node Status Distribution (donut/pie chart)
- Chart 2: Node Uptime Distribution (horizontal bar chart for top 5 nodes)

### 4. Footer Component
- Add footer with specified text: "Xandeum Network – pNode Analytics Dashboard. Data sourced from pRPC."

### 5. Mock Data Enhancement
- Ensure we have realistic mock data with 15-20 pNode objects
- Include all required fields: pubkey, ip, version, status, uptime, blocksProduced, latency, location
- Calculate Healthy Index correctly

## Implementation Steps
1. Create typing effect component
2. Update MetricCards to show Healthy Index
3. Enhance NodeCharts with both chart types
4. Add footer component
5. Update main page layout
6. Create mock data that matches requirements
7. Test and verify all features work correctly
