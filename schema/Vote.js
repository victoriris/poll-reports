cube(`Vote`, {
  sql: `SELECT * FROM main."Vote"`,
  
  joins: {
    Candidate: {
      sql: `${CUBE}."candidateId" = ${Candidate}.id`,
      relationship: `belongsTo`
    }
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, candidateid, createdat, updatedat]
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    
    candidateid: {
      sql: `${CUBE}."candidateId"`,
      type: `string`
    },
    
    foreign: {
      sql: `${CUBE}."FOREIGN"`,
      type: `string`
    },
    
    primary: {
      sql: `${CUBE}."PRIMARY"`,
      type: `string`
    },
    
    createdat: {
      sql: `${CUBE}."createdAt"`,
      type: `time`
    },
    
    updatedat: {
      sql: `${CUBE}."updatedAt"`,
      type: `time`
    }
  }
});
