import React from 'react';
import { Col } from 'antd';
import ChartRenderer from '../components/ChartRenderer';
import Dashboard from '../components/Dashboard';
import DashboardItem from '../components/DashboardItem';
import VoteForm from '../components/VoteForm';
const DashboardItems = [
  {
    id: 0,
    name: 'Poll Overview',
    vizState: {
      query: {
        measures: ['Vote.count'],
        timeDimensions: [
          {
            dimension: 'Vote.createdat',
          },
        ],
        filters: [],
        dimensions: ['Candidate.name'],
        order: {},
      },
      chartType: 'table',
    },
  },
  {
    id: 1,
    name: 'Vote segments',
    vizState: {
      query: {
        measures: ['Vote.count'],
        timeDimensions: [
          {
            dimension: 'Vote.createdat',
          },
        ],
        dimensions: ['Candidate.name'],
        order: {},
        filters: [],
      },
      chartType: 'pie',
    },
  },
];

const DashboardPage = () => {
  const dashboardItem = (item) => (
    <Col
      span={24}
      lg={12}
      key={item.id}
      style={{
        marginBottom: '24px',
      }}
    >
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Col>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: 'center',
        padding: 12,
      }}
    >
      <h2>
        There are no charts on this dashboard. Use Playground Build to add one.
      </h2>
    </div>
  );

  return DashboardItems.length ? (
    <>
      <VoteForm />
      <Dashboard dashboardItems={DashboardItems}>
        {DashboardItems.map(dashboardItem)}
      </Dashboard>
    </>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
